// Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver...).
// Bing's index powers ChatGPT search and Copilot, so this is the fastest legitimate way
// to get new or changed pages in front of those answer engines.
//
//   node scripts/indexnow-submit.mjs              # all sitemap URLs
//   node scripts/indexnow-submit.mjs /en /en/about # only these paths
//
// The key file public/<KEY>.txt must be live on https://arranto.com before submitting
// (IndexNow fetches it to verify ownership). No account or API key is needed.
const HOST = "arranto.com";
const KEY = "d7fd2f0189bda4fda6b264075bf25584";
const BASE = `https://${HOST}`;

async function sitemapUrls() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => (p.startsWith("http") ? p : `${BASE}${p}`)) : await sitemapUrls();

const keyCheck = await fetch(`${BASE}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${BASE}/${KEY}.txt is not live yet — deploy first.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList }),
});
// 200 = accepted, 202 = accepted (key validation pending), 422 = URLs don't match host.
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
