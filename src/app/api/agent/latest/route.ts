import { env } from "@/lib/env";
import { db } from "@/lib/supabase";

// Owner-only: read the newest agent report without opening Supabase.
// curl -H "x-agent-key: $CRON_SECRET" https://arranto.com/api/agent/latest
export async function GET(req: Request) {
  if (req.headers.get("x-agent-key") !== env.cronSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await db()
    .from("agent_reports")
    .select("created_at, period_start, period_end, analysis, processed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("agent_reports read:", error.message);
    return Response.json({ error: "Read failed" }, { status: 500 });
  }
  return Response.json(data ?? { info: "No reports yet" });
}
