// Submit URLs to Bing Webmaster Tools' URL Submission API (feeds Bing, ChatGPT search, Copilot).
// Complements IndexNow. Quota: 100 URLs/day, 1500/month for arranto.com.
//
//   node scripts/bing-submit.mjs                # all sitemap URLs (first 100)
//   node scripts/bing-submit.mjs /en /en/about  # only these paths
//
// Needs BING_WEBMASTER_API_KEY in .env.local (gitignored) or the environment.
import { readFileSync } from "node:fs";

const SITE = "https://arranto.com/";
let key = process.env.BING_WEBMASTER_API_KEY;
if (!key) {
  try {
    key = readFileSync(".env.local", "utf8").match(/^BING_WEBMASTER_API_KEY=(.+)$/m)?.[1]?.trim();
  } catch {}
}
if (!key) {
  console.error("Set BING_WEBMASTER_API_KEY in .env.local");
  process.exit(1);
}
const api = (m) => `https://ssl.bing.com/webmaster/api.svc/json/${m}?apikey=${key}`;

const quota = (await (await fetch(`${api("GetUrlSubmissionQuota")}&siteUrl=${encodeURIComponent(SITE)}`)).json()).d;
const args = process.argv.slice(2);
let urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `https://arranto.com${p}`))
  : [...(await (await fetch(`${SITE}sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
urlList = urlList.slice(0, quota.DailyQuota);
if (!urlList.length) {
  console.error(`No daily quota left (monthly remaining: ${quota.MonthlyQuota}).`);
  process.exit(1);
}

const res = await fetch(api("SubmitUrlBatch"), {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ siteUrl: SITE, urlList }),
});
console.log(`Bing: HTTP ${res.status} for ${urlList.length} URLs (quota before: ${quota.DailyQuota}/day)`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
