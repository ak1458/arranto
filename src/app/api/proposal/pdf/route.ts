import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { verifyProposal } from "@/lib/proposal";
import { ProposalPdf } from "@/lib/proposal-pdf";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const rl = rateLimit(clientKey(req, "proposal-pdf"), LIMITS.chat);
  if (!rl.ok) return tooMany(rl.retryAfterSec);

  const token = req.nextUrl.searchParams.get("t") ?? "";
  const data = verifyProposal(token);
  if (!data) return new Response("Not found", { status: 404 });

  try {
    // Called as a plain function: returns the <Document> element directly,
    // which carries the DocumentProps type renderToBuffer expects.
    const buf = await renderToBuffer(ProposalPdf({ data }));
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="arranto-proposal.pdf"`,
        "Cache-Control": "private, max-age=3600",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (e) {
    console.error("Proposal PDF render failed:", e instanceof Error ? e.message : e);
    return new Response("PDF generation failed", { status: 500 });
  }
}
