import { sorted, type Status } from "@/content/work";
import { serviceDetails } from "@/content/services";
import { blogPosts } from "@/content/blog";

// The chatbot's entire knowledge base, built from the same content the pages
// render — status claims always come from the `status` field, never hand-typed.
// Full-context injection instead of RAG: see docs/MASTER-CONTEXT.md D2.
// A `held` product is hard-gated (MASTER-CONTEXT §1: "no route/MDX/chat knowledge/schema
// until scope confirmed"). It is excluded from the prompt entirely rather than described
// as held — telling the assistant it exists is chat knowledge, and an assistant that knows
// can be led into confirming it.
type Publishable = Exclude<Status, "held">;

const STATUS_LINE: Record<Publishable, string> = {
  proven: "Status: delivered and proven in production.",
  "in-pilot": "Status: in pilot — NOT live, NOT in production, NOT proven yet.",
};

const isPublishable = <T extends { status: Status }>(
  c: T,
): c is T & { status: Publishable } => c.status !== "held";

export function siteContext(): string {
  const work = sorted
    .filter(isPublishable)
    .map((c) => {
      const faq = c.faq.map((f) => `Q: ${f.q.en}\nA: ${f.a.en}`).join("\n");
      return `### ${c.title}\n${STATUS_LINE[c.status]}\nOutcome: ${c.outcome.en}\n${c.body.en}\nStack: ${c.stack.join(", ")}\n${faq}`;
    })
    .join("\n\n");

  const services = serviceDetails
    .map((service) => {
      const faq = service.faq.map((f) => `Q: ${f.q.en}\nA: ${f.a.en}`).join("\n");
      return `### ${service.title.en}\n${service.subtitle.en}\n${service.citablePassage.en}\n${service.overview.en.join(" ")}\nCapabilities: ${service.features.en.map((f) => f.title).join(", ")}\n${faq}`;
    })
    .join("\n\n");

  const blog = blogPosts
    .map((post) => `### ${post.title.en}\nCategory: ${post.category}\n${post.excerpt.en}\nURL: /blog/${post.slug}`)
    .join("\n\n");

  return `## Studio
Arranto is an AI software company building enterprise AI platforms, custom software solutions, localized compliance technology (ZATCA / PDPL), and developer tools.
Pages: / (home), /work (case studies), /about (the studio and founder), /services, /blog, /contact.
Free tools live on this site at /tools.

## Services
${services}

## Work
${work}

## Blog
${blog}`;
}

// The chat system prompt moved to src/lib/ai/prompt.ts (agentic rewrite, 2026-07-16).
