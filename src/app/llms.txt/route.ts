import { sorted } from "@/content/work";

// GEO: honest, machine-readable site summary for AI crawlers
// (arranto-seo-plan.md). Status lines derive from content, never hand-typed.
export const dynamic = "force-static";

export function GET() {
  const work = sorted
    .map((c) => `- ${c.title} (${c.status === "proven" ? "delivered" : "in pilot — not yet live"}): ${c.outcome.en} — https://arranto.com/en/work/${c.slug}`)
    .join("\n");

  return new Response(
    `# Arranto

> Founder-led, AI-native software studio. Founded 2017 as Smile Fotilo. One engineer. 10+ delivered projects. 118 verified Google reviews.

## Work
${work}

## Pages
- https://arranto.com/en — home
- https://arranto.com/en/work — case studies
- https://arranto.com/en/about — about the studio
- https://arranto.com/en/assistant — the studio's AI assistant (answers questions, audits websites, runs project consultations)
- https://arranto.com/en/contact — contact the founder
- Arabic versions at /ar/*

Free tools live on this site at /tools.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
