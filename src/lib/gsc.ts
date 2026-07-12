import { googleFetch } from "./google-auth";
import { env } from "./env";

const SCOPE = "https://www.googleapis.com/auth/webmasters";
const base = () => `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(env.searchConsoleSiteUrl)}`;

async function query(dimension: "query" | "page", days: number) {
  const end = new Date();
  const start = new Date(end.getTime() - days * 86_400_000);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const json = await googleFetch(`${base()}/searchAnalytics/query`, SCOPE, {
    method: "POST",
    body: JSON.stringify({
      startDate: iso(start),
      endDate: iso(end),
      dimensions: [dimension],
      rowLimit: 25,
    }),
  });
  return (json.rows ?? []).map((r: { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }) => ({
    [dimension]: r.keys[0],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: Number(r.ctr.toFixed(3)),
    position: Number(r.position.toFixed(1)),
  }));
}

// 28-day search snapshot: which queries and pages earn clicks/impressions.
export async function gscSnapshot(days = 28) {
  const [queries, pages] = await Promise.all([query("query", days), query("page", days)]);
  return { days, queries, pages };
}

export async function submitSitemap(sitemapUrl: string) {
  await googleFetch(`${base()}/sitemaps/${encodeURIComponent(sitemapUrl)}`, SCOPE, { method: "PUT" });
}
