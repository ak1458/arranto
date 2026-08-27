import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local
for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const b64url = (s) =>
  Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function getToken(scope) {
  const sa = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  const iat = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url(JSON.stringify({ alg: "RS256", typ: "JWT" })) +
    "." +
    b64url(JSON.stringify({ iss: sa.client_email, scope, aud: sa.token_uri, iat, exp: iat + 3600 }));
  const signature = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key);
  const jwt = `${unsigned}.${b64url(signature)}`;
  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  if (!res.ok) throw new Error(`Auth: ${await res.text()}`);
  return (await res.json()).access_token;
}

// ─── 1. RESUBMIT SITEMAP VIA GSC API ───
async function resubmitSitemap() {
  console.log("\n=== 1. RESUBMITTING SITEMAP ===");
  const token = await getToken("https://www.googleapis.com/auth/webmasters");
  const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL;
  const sitemapUrl = "https://arranto.com/sitemap.xml";

  // DELETE old sitemap entry first (clears stale warnings)
  const delRes = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`  [DELETE old sitemap] Status: ${delRes.status}`);

  // PUT to resubmit fresh
  const putRes = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`,
    { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(`  [PUT resubmit sitemap] Status: ${putRes.status}`);
  if (!putRes.ok) console.error(`  Error: ${await putRes.text()}`);
  else console.log("  ✅ Sitemap resubmitted successfully!");
}

// ─── 2. INDEXING API FOR JOB PAGES (JobPosting schema) ───
async function requestIndexing() {
  console.log("\n=== 2. INDEXING API — JOB POSTING PAGES ===");
  // The Indexing API only works for pages with JobPosting or BroadcastEvent schema.
  // Our careers pages have JobPosting structured data → eligible.
  const token = await getToken("https://www.googleapis.com/auth/indexing");

  const jobUrls = [
    "https://arranto.com/en/careers/ai-ml-engineer",
    "https://arranto.com/en/careers/business-development-executive",
    "https://arranto.com/ar/careers/ai-ml-engineer",
    "https://arranto.com/ar/careers/business-development-executive",
  ];

  for (const url of jobUrls) {
    try {
      const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type: "URL_UPDATED" }),
      });
      const text = await res.text();
      if (res.ok) {
        console.log(`  ✅ ${url} → Indexing request sent`);
      } else {
        console.error(`  ❌ ${url} → ${res.status}: ${text.slice(0, 200)}`);
      }
    } catch (e) {
      console.error(`  ❌ ${url} → Exception: ${e.message}`);
    }
  }
}

async function main() {
  console.log("=== AUTOMATED GOOGLE API ACTIONS ===");
  console.log(`Time: ${new Date().toISOString()}\n`);

  await resubmitSitemap();
  await requestIndexing();

  console.log("\n=== ALL AUTOMATED ACTIONS COMPLETE ===");
}

main().catch((e) => console.error("FATAL:", e));
