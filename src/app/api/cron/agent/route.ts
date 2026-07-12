import { env } from "@/lib/env";
import { db } from "@/lib/supabase";
import { chat } from "@/lib/openrouter";
import { ga4Snapshot } from "@/lib/ga4";
import { gscSnapshot } from "@/lib/gsc";

// Self-improvement agent, collection + analysis half. Runs daily on Vercel
// Cron (vercel.json) — works with the owner's PC off. The apply-fixes half is
// local + reviewed: `npm run agent:improve`. See docs/AGENT.md.
export const maxDuration = 60;

const ANALYST_PROMPT = `You are the growth engineer for arranto.com — a founder-led software studio site targeting premium clients (Gulf, US, Europe). You receive a JSON snapshot of Google Analytics 4 and Search Console data (or nulls where a source is not configured).

Write a markdown report with exactly these sections:
## Summary — 3 sentences max.
## Problems — concrete issues in the data (pages losing traffic, queries with impressions but poor CTR, positions slipping, markets underperforming). Cite numbers.
## Opportunities — specific queries/pages worth targeting, with why.
## Recommendations — prioritized, concrete actions (which page, what change). Mark each [auto-fixable] if a code/content change could do it, or [owner] if it needs a human decision.
If a data source is null, note it once under Problems and move on. No fluff, no generic advice.`;

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${env.cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Tolerate unconfigured sources — the agent reports on whatever exists.
  const [ga4, gsc] = await Promise.allSettled([ga4Snapshot(), gscSnapshot()]);
  const data = {
    ga4: ga4.status === "fulfilled" ? ga4.value : null,
    gsc: gsc.status === "fulfilled" ? gsc.value : null,
    collectedAt: new Date().toISOString(),
  };
  if (!data.ga4 && !data.gsc) {
    return Response.json({ error: "No data sources configured (see docs/SETUP.md)" }, { status: 503 });
  }

  const analysis = await chat(
    [
      { role: "system", content: ANALYST_PROMPT },
      { role: "user", content: JSON.stringify(data) },
    ],
    { maxTokens: 2000, timeoutMs: 45_000 },
  );

  const end = new Date();
  const start = new Date(end.getTime() - 28 * 86_400_000);
  const { error } = await db().from("agent_reports").insert({
    period_start: start.toISOString().slice(0, 10),
    period_end: end.toISOString().slice(0, 10),
    data,
    analysis,
  });
  if (error) {
    console.error("agent_reports insert:", error.message);
    return Response.json({ error: "Report storage failed" }, { status: 500 });
  }
  return Response.json({ ok: true, sources: { ga4: !!data.ga4, gsc: !!data.gsc } });
}
