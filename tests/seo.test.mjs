// SEO regression checks against a running server (fixes from the 2026-10-05 audit).
// Run: npm run build && npm start, then `npm run test:seo`
// (or BASE_URL=https://arranto.com npm run test:seo after deploy).
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const html = { Accept: "text/html" };
const get = (path, init = {}) => fetch(`${BASE}${path}`, { headers: html, ...init });
const jsonLd = (body) =>
  [...body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const d = JSON.parse(m[1]);
    return [d, ...(d["@graph"] ?? [])].flat();
  });

test("every footer service link resolves (no 404s sitewide)", async () => {
  const body = await (await get("/en")).text();
  const links = [...new Set([...body.matchAll(/href="(\/en\/services\/[^"#?]+)"/g)].map((m) => m[1]))];
  assert.ok(links.length > 0, "footer has service links");
  for (const link of links) {
    const res = await get(link, { redirect: "manual" });
    assert.equal(res.status, 200, link);
  }
});

test("repo pages that back a case study redirect to it", async () => {
  const res = await get("/en/work/pulsekart-web-nextjs", { redirect: "manual" });
  assert.ok([301, 308].includes(res.status), `status ${res.status}`);
  assert.match(res.headers.get("location"), /\/en\/work\/pulsekart$/);
});

test("retired service slug 301s to its replacement", async () => {
  const res = await get("/en/services/saas-mvp-development", { redirect: "manual" });
  assert.equal(res.status, 301);
  assert.match(res.headers.get("location"), /\/en\/services\/ai-saas-development$/);
});

test("closed roles and the careers listing emit no JobPosting", async () => {
  for (const path of ["/en/careers/ai-ml-engineer", "/ar/careers/business-development-executive", "/en/careers"]) {
    const types = jsonLd(await (await get(path)).text()).map((b) => b["@type"]);
    assert.ok(!types.includes("JobPosting"), `${path}: ${types}`);
  }
  const listing = jsonLd(await (await get("/en/careers")).text());
  assert.ok(listing.some((b) => b["@type"] === "ItemList"));
});

test("no hiring: no role page emits JobPosting and the listing says so", async () => {
  for (const slug of ["full-stack-engineer", "performance-marketer", "graphic-designer"]) {
    const types = jsonLd(await (await get(`/en/careers/${slug}`)).text()).map((b) => b["@type"]);
    assert.ok(!types.includes("JobPosting"), slug);
  }
  assert.match(await (await get("/en/careers")).text(), /Not hiring right now/);
  assert.doesNotMatch(await (await get("/sitemap.xml")).text(), /\/careers\/[a-z]/);
});

test("sitemap lists the services hub, skips closed roles, has no fake lastmod", async () => {
  const xml = await (await get("/sitemap.xml")).text();
  assert.match(xml, /<loc>https:\/\/arranto\.com\/en\/services<\/loc>/);
  assert.doesNotMatch(xml, /careers\/ai-ml-engineer/);
  assert.doesNotMatch(xml, /<lastmod>/);
});

test("inner pages carry a social preview image", async () => {
  const body = await (await get("/en/about")).text();
  assert.match(body, /<meta property="og:image" content="https:\/\/arranto\.com\/en\/opengraph-image"/);
  assert.match(body, /<meta name="twitter:card" content="summary_large_image"/);
});

test("robots.txt keeps /api/ disallowed for named AI crawlers", async () => {
  const txt = await (await get("/robots.txt")).text();
  const group = txt.split(/\n\s*\n/).find((g) => /User-Agent: GPTBot/i.test(g));
  assert.ok(group, "GPTBot group present");
  assert.match(group, /Disallow: \/api\//);
});

test("homepage title names the services and Organization uses a raster logo", async () => {
  const body = await (await get("/en")).text();
  assert.match(body, /<title>Arranto \| Custom Software, SaaS &amp; AI Automation Studio<\/title>/);
  const org = jsonLd(body).find((b) => b["@type"] === "Organization");
  assert.match(org.logo.url, /\.png$/);
  assert.equal(org.inLanguage, undefined);
});

// ── Round 2 (2026-10-05): facts, Arabic, performance, structure ──

test("project and review facts are consistent (3 active, reviews credited to Smile Fotilo)", async () => {
  for (const path of ["/en", "/ar", "/en/work", "/en/about"]) {
    const body = await (await get(path)).text();
    assert.doesNotMatch(body, /7 active|٧ مشاريع/, path);
  }
  const about = await (await get("/en/about")).text();
  assert.match(about, /Smile Fotilo/);
  const llmsFull = await (await get("/llms-full.txt")).text();
  assert.doesNotMatch(llmsFull, /AI software company/);
});

test("Arabic pages use one brand spelling", async () => {
  for (const path of ["/ar", "/ar/services", "/ar/blog"]) {
    assert.doesNotMatch(await (await get(path)).text(), /أرانطو/, path);
  }
});

test("About FAQ has no duplicate timeline question", async () => {
  const types = jsonLd(await (await get("/en/about")).text());
  const faq = types.find((b) => b["@type"] === "FAQPage");
  const qs = faq.mainEntity.map((q) => q.name);
  assert.equal(qs.filter((q) => /how long/i.test(q)).length, 1, qs.join(" | "));
});

test("unknown locale prefix 404s directly instead of redirecting", async () => {
  const res = await get("/fr/about", { redirect: "manual" });
  assert.equal(res.status, 404);
});

test("no next-intl Link header with a redirecting x-default", async () => {
  const res = await get("/en/about");
  assert.doesNotMatch(res.headers.get("link") ?? "", /x-default/);
});

test("ZATCA service page exists, is in the sitemap and linked from the footer", async () => {
  const res = await get("/en/services/zatca-e-invoicing");
  assert.equal(res.status, 200);
  const body = await res.text();
  assert.match(body, /<title>ZATCA E-Invoicing Integration/);
  assert.match(body, /in pilot/i);
  assert.match(await (await get("/sitemap.xml")).text(), /\/ar\/services\/zatca-e-invoicing/);
  assert.match(await (await get("/en")).text(), /href="\/en\/services\/zatca-e-invoicing"/);
});

test("contact page carries the service from ?service= into the chat input", async () => {
  const body = await (await get("/en/contact?service=crm-development")).text();
  assert.match(body, /discuss a project for: Custom CRM/);
});

test("Arabic breadcrumbs are localized and key pages have breadcrumbs", async () => {
  const svc = jsonLd(await (await get("/ar/services/crm-development")).text()).find((b) => b["@type"] === "BreadcrumbList");
  assert.equal(svc.itemListElement[1].name, "الخدمات");
  for (const path of ["/en/about", "/en/contact", "/en/work", "/en/blog", "/en/tools", "/en/careers/full-stack-engineer"]) {
    const types = jsonLd(await (await get(path)).text()).map((b) => b["@type"]);
    assert.ok(types.includes("BreadcrumbList"), path);
  }
});

test("BlogPosting has an image", async () => {
  const blog = await (await get("/en/blog")).text();
  const post = blog.match(/href="(\/en\/blog\/[^"]+)"/)[1];
  const bp = jsonLd(await (await get(post)).text()).find((b) => b["@type"] === "BlogPosting");
  assert.match(bp.image, /opengraph-image/);
});

test("favicon is small and Google scripts are not in the initial HTML", async () => {
  const res = await get("/en");
  const body = await res.text();
  const icon = body.match(/<link rel="icon" href="([^"]+\.svg[^"]*)"/);
  assert.ok(icon, "svg icon link");
  const svg = await (await get(icon[1].replace(/^https?:\/\/[^/]+/, ""))).arrayBuffer();
  assert.ok(svg.byteLength < 50_000, `icon.svg is ${svg.byteLength} bytes`);
  assert.doesNotMatch(body, /<script[^>]+src="https:\/\/www\.googletagmanager\.com/);
});

// ── Round 3 (2026-10-05): owner requests ──

test("root always redirects permanently to /en, with no language guessing", async () => {
  const root = await get("/", { redirect: "manual" });
  assert.equal(root.status, 301);
  assert.match(root.headers.get("location"), /\/en$/);
  const about = await fetch(`${BASE}/about`, { redirect: "manual", headers: { "Accept-Language": "ar-SA,ar;q=0.9" } });
  assert.match(about.headers.get("location"), /\/en\/about$/);
});

test("mobile dock is gone and the chat launcher no longer uses the sparkle", async () => {
  const body = await (await get("/en")).text();
  assert.doesNotMatch(body, /fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none md:hidden/);
  assert.doesNotMatch(body, /✦/);
});
