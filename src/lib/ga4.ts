import { googleFetch } from "./google-auth";
import { env } from "./env";

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

type Row = Record<string, string | number>;

async function runReport(dimension: string, metrics: string[], days: number): Promise<Row[]> {
  const body = {
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: dimension }],
    metrics: metrics.map((name) => ({ name })),
    limit: 25,
  };
  const json = await googleFetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${env.ga4PropertyId}:runReport`,
    SCOPE,
    { method: "POST", body: JSON.stringify(body) },
  );
  return (json.rows ?? []).map((r: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
    [dimension]: r.dimensionValues[0].value,
    ...Object.fromEntries(metrics.map((m, i) => [m, Number(r.metricValues[i].value)])),
  }));
}

// 28-day traffic snapshot for the agent: what's visited, from where, by whom.
export async function ga4Snapshot(days = 28) {
  const [pages, countries, sources] = await Promise.all([
    runReport("pagePath", ["screenPageViews", "sessions"], days),
    runReport("country", ["sessions"], days),
    runReport("sessionSource", ["sessions"], days),
  ]);
  return { days, pages, countries, sources };
}
