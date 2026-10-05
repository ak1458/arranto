// End-to-end checks for agent-facing behavior against a running server.
// Run: npm run build && npm start, then `npm run test:agent`
// (or BASE_URL=https://arranto.com npm run test:agent after deploy).
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const md = { Accept: "text/markdown" };
const html = { Accept: "text/html" };

const varyHasAccept = (res) =>
  (res.headers.get("vary") || "").split(",").map((s) => s.trim().toLowerCase()).includes("accept");

test("homepage serves Markdown to agents with Vary: Accept", async () => {
  const res = await fetch(`${BASE}/`, { headers: md });
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /^text\/markdown/);
  assert.ok(varyHasAccept(res), `Vary was ${res.headers.get("vary")}`);
  const body = await res.text();
  assert.match(body, /^# /);
  assert.match(body, /llms\.txt/);
  assert.ok(body.length > 500);
});

test("localized homepage and content pages serve Markdown", async () => {
  for (const path of ["/en", "/ar", "/en/work", "/en/services", "/en/blog", "/en/work/pulsekart"]) {
    const res = await fetch(`${BASE}${path}`, { headers: md });
    assert.equal(res.status, 200, path);
    assert.match(res.headers.get("content-type"), /^text\/markdown/, path);
    assert.ok(varyHasAccept(res), path);
  }
});

test("homepage still serves HTML to browsers", async () => {
  const res = await fetch(`${BASE}/`, { headers: html });
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type"), /^text\/html/);
  assert.ok(res.url.endsWith("/en"), `final URL ${res.url}`);
  const body = await res.text();
  assert.match(body, /<h1[\s>]/);
});

test("homepage HTML has one H1 and no skipped heading levels", async () => {
  const body = await (await fetch(`${BASE}/en`, { headers: html })).text();
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  assert.equal(levels.filter((l) => l === 1).length, 1, `levels: ${levels}`);
  assert.equal(levels[0], 1);
  for (let i = 1; i < levels.length; i++) {
    assert.ok(levels[i] <= levels[i - 1] + 1, `skip h${levels[i - 1]} -> h${levels[i]}`);
  }
});

test("unknown path returns 404 with a Markdown body for agents", async () => {
  const res = await fetch(`${BASE}/__agent-404-probe-x1`, { headers: md });
  assert.equal(res.status, 404);
  assert.match(res.headers.get("content-type"), /^text\/markdown/);
  const body = await res.text();
  assert.ok(body.length >= 20);
  assert.match(body, /llms\.txt/);
  assert.match(body, /sitemap\.xml/);
});

test("unknown path still returns an HTML 404 for browsers", async () => {
  const res = await fetch(`${BASE}/__agent-404-probe-x1`, { headers: html });
  assert.equal(res.status, 404);
  assert.match(res.headers.get("content-type"), /^text\/html/);
});

test("pages without a Markdown variant fall through to HTML, not 404", async () => {
  const res = await fetch(`${BASE}/en/contact`, { headers: md });
  assert.equal(res.status, 200);
});

test("non-HTML/Markdown Accept headers still get the normal page, never 406", async () => {
  for (const accept of ["application/json", "text/x-component", "application/pdf"]) {
    const res = await fetch(`${BASE}/en`, { headers: { Accept: accept } });
    assert.equal(res.status, 200, accept);
  }
});

test("llms.txt follows llmstxt.org shape and has when-to-use guidance", async () => {
  const res = await fetch(`${BASE}/llms.txt`);
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /^# Arranto\n\n> .+/);
  assert.match(body, /^## When to use Arranto$/m);
  assert.match(body, /^## How an agent should engage$/m);
  assert.match(body, /^- \[[^\]]+\]\(https:\/\/arranto\.com\/[^)]*\): .+/m);
});

test("Organization JSON-LD has contactPoint and address", async () => {
  const body = await (await fetch(`${BASE}/en`, { headers: html })).text();
  const blocks = [...body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((m) => [JSON.parse(m[1])].flat());
  const org = blocks.find((b) => b["@type"] === "Organization");
  assert.ok(org, "Organization JSON-LD present");
  assert.equal(org.contactPoint["@type"], "ContactPoint");
  assert.ok(org.contactPoint.email && org.contactPoint.contactType);
  assert.equal(org.address["@type"], "PostalAddress");
  assert.equal(org["@id"], "https://arranto.com/#organization");
  const site = blocks.find((b) => b["@type"] === "WebSite");
  assert.equal(site.publisher["@id"], org["@id"]);
});
