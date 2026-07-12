// Weekly local half of the self-improvement agent (see docs/AGENT.md).
// Reads unprocessed agent_reports from Supabase, asks the AI for concrete,
// file-level fix proposals, writes them to reports/agent/<date>.md for review,
// then marks the reports processed. Never edits code itself — you review.
// Run: npm run agent:improve
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env.local parser — avoids a dotenv dependency.
for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const need = (n) => process.env[n] ?? (() => { throw new Error(`Missing ${n} in .env.local`); })();
const SUPABASE = need("NEXT_PUBLIC_SUPABASE_URL");
const SERVICE_KEY = need("SUPABASE_SERVICE_ROLE_KEY");
const OPENROUTER_KEY = need("OPENROUTER_API_KEY");
const MODEL = process.env.OPENROUTER_MODEL ?? "anthropic/claude-sonnet-4.5";

const sb = (path, init = {}) =>
  fetch(`${SUPABASE}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

const res = await sb("agent_reports?processed=eq.false&order=created_at.asc&select=id,created_at,analysis");
if (!res.ok) throw new Error(`Supabase read failed: ${res.status} ${await res.text()}`);
const reports = await res.json();
if (!reports.length) {
  console.log("No unprocessed reports. Nothing to do.");
  process.exit(0);
}
console.log(`Found ${reports.length} unprocessed report(s). Asking AI for fix proposals…`);

const prompt = `You are the maintenance engineer for the Next.js site in this repo (src/app/[locale]/* pages, src/content/work.ts content, src/messages/{en,ar}.json copy, src/lib/seo.ts SEO helpers).

Below are analysis reports from the site's automated growth agent. Turn every [auto-fixable] recommendation into a concrete proposal: which file, what change, and the exact new content or a unified diff where possible. Group [owner] items separately as a checklist. Skip anything vague. Honesty rule: never propose copy that overstates product status.

${reports.map((r) => `--- Report ${r.created_at} ---\n${r.analysis}`).join("\n\n")}`;

const ai = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${OPENROUTER_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 4000,
  }),
});
if (!ai.ok) throw new Error(`OpenRouter failed: ${ai.status} ${await ai.text()}`);
const proposals = (await ai.json()).choices?.[0]?.message?.content ?? "";

const outDir = join(root, "reports", "agent");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `${new Date().toISOString().slice(0, 10)}.md`);
writeFileSync(outFile, `# Agent fix proposals — ${new Date().toISOString().slice(0, 10)}\n\n${proposals}\n`);

const ids = reports.map((r) => r.id);
const upd = await sb(`agent_reports?id=in.(${ids.join(",")})`, {
  method: "PATCH",
  body: JSON.stringify({ processed: true }),
});
if (!upd.ok) throw new Error(`Supabase update failed: ${upd.status} ${await upd.text()}`);

console.log(`Proposals written to ${outFile}`);
console.log("Review them, apply what you approve, commit, deploy.");
