import { sorted } from "@/content/work";
import { serviceDetails } from "@/content/services";
import { blogPosts } from "@/content/blog";

// GEO: honest, machine-readable site summary for AI crawlers
// (arranto-seo-plan.md). Status lines derive from content, never hand-typed.
export const dynamic = "force-static";

export function GET() {
  const work = sorted
    .filter((c) => c.status !== "held")
    .map((c) => `- ${c.title} (${c.status === "proven" ? "delivered" : "in pilot — not yet live"}): ${c.outcome.en} — https://arranto.com/en/work/${c.slug}`)
    .join("\n");
  const services = serviceDetails
    .map((service) => `- ${service.title.en}: ${service.subtitle.en} — https://arranto.com/en/services/${service.slug}`)
    .join("\n");
  const blog = blogPosts
    .map((post) => `- ${post.title.en}: ${post.excerpt.en} — https://arranto.com/en/blog/${post.slug}`)
    .join("\n");

  return new Response(
    `# Arranto

> Enterprise AI applications, high-performance software systems, and localized compliance technology (ZATCA / PDPL).

## Work
${work}

## Pages
- https://arranto.com/en — home
- https://arranto.com/en/work — case studies
- https://arranto.com/en/about — about the studio
- https://arranto.com/en/assistant — the studio's AI assistant (answers questions, audits websites, runs project consultations)
- https://arranto.com/en/contact — contact the founder
- https://arranto.com/en/services — service overview
- https://arranto.com/en/blog — engineering and growth articles
- Arabic versions at /ar/*

## Services
${services}

## Blog
${blog}

## Free tools
- https://arranto.com/en/tools/website-audit
- https://arranto.com/en/tools/seo-content
- https://arranto.com/en/tools/brand-kit
- https://arranto.com/en/tools/content-calendar
- https://arranto.com/en/tools/document-intelligence
- https://arranto.com/en/tools/website-factory
- https://arranto.com/en/tools/yt-bulk-optimizer
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
