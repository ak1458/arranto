import { siteContext } from "@/lib/site-context";

// GEO: full-detail companion to /llms.txt — same content the chatbot uses,
// so crawlers and the assistant can never disagree.
export const dynamic = "force-static";

export function GET() {
  return new Response(siteContext(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
