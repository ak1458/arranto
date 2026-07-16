// Offline QA for the AI system (npm run ai:qa). No network, no API key needed:
// exercises the proposal token round-trip, budget counters, provider tool-call
// parsing, and the agent loop against a mocked fetch. Fails loudly on any assert.
import assert from "node:assert/strict";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Resolve the app's "@/..." TS imports through a tiny loader.
register(new URL("./ai-qa-loader.mjs", import.meta.url), pathToFileURL("./"));

process.env.PROPOSAL_SECRET = "qa-secret";
process.env.OPENROUTER_API_KEY = "qa-key";
process.env.SITE_URL = "https://qa.local";

const { signProposal, verifyProposal } = await import("../src/lib/proposal.ts");
const { chatBudget } = await import("../src/lib/ai/budget.ts");
const { toolSchemas, runTool } = await import("../src/lib/ai/tools.ts");
const { getProvider } = await import("../src/lib/ai/provider.ts");

// ---- proposal token round-trip -------------------------------------------
const data = {
  name: "Test Client",
  email: "client@example.com",
  company: "TestCo",
  projectType: "saas",
  goals: ["Launch an MVP"],
  scope: ["Multi-tenant auth", "Billing integration"],
  timeline: "8-10 weeks",
  locale: "en",
  date: "2026-07-16",
};
const token = signProposal(data);
assert.deepEqual(verifyProposal(token), data, "round-trip must preserve data");
assert.equal(verifyProposal(token.slice(0, -2) + "xx"), null, "tampered sig must fail");
const [packed, sig] = token.split(".");
assert.equal(verifyProposal(`${packed.slice(2)}.${sig}`), null, "tampered payload must fail");
assert.equal(verifyProposal("garbage"), null, "garbage must fail");
console.log("ok: proposal token sign/verify/tamper");

// ---- budget counters ------------------------------------------------------
process.env.AI_DAILY_IP_CAP = "3";
for (let i = 0; i < 3; i++) assert.equal(chatBudget("1.2.3.4").ok, true);
const blocked = chatBudget("1.2.3.4");
assert.equal(blocked.ok, false);
assert.equal(blocked.reason, "ip");
assert.equal(chatBudget("5.6.7.8").ok, true, "other IPs unaffected");
console.log("ok: per-IP daily budget");

// ---- tool registry --------------------------------------------------------
const schemas = toolSchemas();
assert.equal(schemas.length, 9, "9 tools registered");
for (const s of schemas) {
  assert.ok(s.name && s.description, `tool ${s.name} has metadata`);
  assert.equal(s.parameters.type, "object", `tool ${s.name} params are an object schema`);
  assert.ok(!("$schema" in s.parameters), "no $schema key leaks to the provider");
}
const unknown = await runTool("nope", {}, { locale: "en", ip: "x" });
assert.ok(unknown.error?.includes("Unknown tool"), "unknown tool returns error object");
console.log("ok: tool registry schemas + unknown-tool handling");

// ---- provider: request shape + SSE tool-call assembly ---------------------
const realFetch = globalThis.fetch;
let capturedBody;
const sse = (events) =>
  new Response(
    events.map((e) => `data: ${JSON.stringify(e)}\n`).join("") + "data: [DONE]\n",
    { status: 200 },
  );

globalThis.fetch = async (url, init) => {
  capturedBody = JSON.parse(init.body);
  return sse([
    { choices: [{ delta: { content: "Hel" } }] },
    { choices: [{ delta: { content: "lo" } }] },
    { choices: [{ delta: { tool_calls: [{ index: 0, id: "c1", function: { name: "fetch_url", arguments: '{"url":' } }] } }] },
    { choices: [{ delta: { tool_calls: [{ index: 0, function: { arguments: '"https://x.com"}' } }] } }] },
  ]);
};

const provider = getProvider();
let streamed = "";
const res = await provider.complete(
  [{ role: "system", content: "s" }, { role: "user", content: "u" }],
  { tools: toolSchemas(), onDelta: (t) => (streamed += t) },
);
assert.equal(res.text, "Hello");
assert.equal(streamed, "Hello", "deltas surfaced live");
assert.equal(res.toolCalls.length, 1);
assert.deepEqual(res.toolCalls[0], { id: "c1", name: "fetch_url", args: { url: "https://x.com" } });
assert.equal(capturedBody.model, "openrouter/free", "free-router default model");
assert.equal(capturedBody.tools.length, 9, "tools forwarded to provider");
assert.equal(capturedBody.tools[0].type, "function");
console.log("ok: provider request shape + SSE tool-call assembly");

// ---- agent loop: tool round → final answer, NDJSON event order ------------
const { runAgent } = await import("../src/lib/ai/agent.ts");
let call = 0;
globalThis.fetch = async (url, init) => {
  const body = JSON.parse(init.body);
  call++;
  if (call === 1) {
    assert.ok(body.tools?.length, "round 1 offers tools");
    return sse([{ choices: [{ delta: { tool_calls: [{ index: 0, id: "t1", function: { name: "nope_tool", arguments: "{}" } }] } }] }]);
  }
  const toolMsg = body.messages.find((m) => m.role === "tool");
  assert.ok(toolMsg, "round 2 sees the tool result");
  assert.equal(toolMsg.tool_call_id, "t1");
  return sse([{ choices: [{ delta: { content: "Final answer" } }] }]);
};

const stream = runAgent([{ role: "user", content: "hi" }], { locale: "en", ip: "9.9.9.9" });
const events = (await new Response(stream).text()).trim().split("\n").map((l) => JSON.parse(l));
assert.deepEqual(events[0], { t: "status", tool: "nope_tool" }, "status precedes tool run");
assert.ok(events.some((e) => e.t === "delta" && e.text === "Final answer"));
assert.deepEqual(events.at(-1), { t: "done" });
console.log("ok: agent loop tool round → final answer → done");

globalThis.fetch = realFetch;
console.log("\nAI QA: all checks passed");
