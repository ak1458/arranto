import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";
import { auditWebsite } from "@/lib/tools/audit-core";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(clientKey(request, "audit"), LIMITS.chat);
    if (!limit.ok) return tooMany(limit.retryAfterSec);

    const body = await request.json();
    if (!body?.url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const result = await auditWebsite(body.url);
    if ("error" in result) return NextResponse.json(result, { status: 400 });
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Audit error:", error);
    return NextResponse.json({ error: "Audit failed" }, { status: 500 });
  }
}
