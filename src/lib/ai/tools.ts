// Tool registry for the site agent (design §3). Each entry drives both the
// provider's tool schema and server-side execution. Gen tools are compact
// one-shot prompts — the full structured versions live on /tools/* pages,
// which the assistant links visitors to for the rich UI output.
import { z } from "zod";
import { chat } from "@/lib/openrouter";
import { auditWebsite, fetchPageText } from "@/lib/tools/audit-core";
import { sendAdminEmail } from "@/lib/tools/contact-core";
import { signProposal, Proposal, PROJECT_TYPES } from "@/lib/proposal";
import { consultBudget } from "@/lib/ai/budget";
import { env } from "@/lib/env";
import type { AiTool } from "@/lib/ai/provider";

export type ToolCtx = { locale: "en" | "ar"; ip: string };

type Tool = {
  name: string;
  description: string;
  schema: z.ZodObject<z.ZodRawShape>;
  run: (args: unknown, ctx: ToolCtx) => Promise<unknown>;
};

const gen = (prompt: string, maxTokens = 600) =>
  chat([{ role: "user", content: prompt }], { maxTokens, timeoutMs: 45_000 });

const ConsultationInput = Proposal.omit({ locale: true, date: true });

const TOOLS: Tool[] = [
  {
    name: "audit_website",
    description:
      "Run a real technical audit of any public website (SEO, performance, mobile, security, structure). Use when a visitor shares their site or asks how good it is. Full version: /tools/website-audit",
    schema: z.object({ url: z.string().max(500).describe("The website URL to audit") }),
    run: async (args) => {
      const { url } = z.object({ url: z.string().max(500) }).parse(args);
      const r = await auditWebsite(url);
      if ("error" in r) return r;
      return {
        score: r.score,
        grade: r.grade,
        summary: r.summary,
        categories: r.categories.map((c) => `${c.name}: ${c.score}/100`),
        topIssues: r.issues.slice(0, 8).map((i) => `[${i.severity}] ${i.message}`),
        recommendations: r.recommendations.slice(0, 5),
      };
    },
  },
  {
    name: "fetch_url",
    description:
      "Fetch the text content of any public web page for up-to-date information (a visitor's site, a product page, a regulation page). Returns a plain-text excerpt.",
    schema: z.object({ url: z.string().max(500).describe("Public http(s) URL to read") }),
    run: async (args) => {
      const { url } = z.object({ url: z.string().max(500) }).parse(args);
      return fetchPageText(url);
    },
  },
  {
    name: "seo_content",
    description:
      "Generate SEO content ideas for a visitor's business: blog titles, meta descriptions, keywords. Full version: /tools/seo-content",
    schema: z.object({
      business: z.string().max(120),
      industry: z.string().max(120),
      location: z.string().max(120).optional(),
      language: z.string().max(40).optional(),
    }),
    run: async (args) => {
      const a = z.object({ business: z.string().max(120), industry: z.string().max(120), location: z.string().max(120).optional(), language: z.string().max(40).optional() }).parse(args);
      return gen(`For "${a.business}", a ${a.industry} business${a.location ? ` in ${a.location}` : ""}, produce: 5 SEO blog post titles, 3 meta descriptions (<160 chars), 8 keywords with intent.${a.language ? ` Write in ${a.language}.` : ""} Be concise.`);
    },
  },
  {
    name: "brand_kit",
    description:
      "Draft a quick brand starter for a visitor's business: taglines and brand voice. Full version with palette and typography: /tools/brand-kit",
    schema: z.object({
      businessName: z.string().max(120),
      industry: z.string().max(120),
      personality: z.string().max(60).optional(),
    }),
    run: async (args) => {
      const a = z.object({ businessName: z.string().max(120), industry: z.string().max(120), personality: z.string().max(60).optional() }).parse(args);
      return gen(`For "${a.businessName}" (${a.industry}, tone: ${a.personality ?? "Professional"}): 5 taglines, then a 3-sentence brand voice description with 3 do-say and 3 don't-say phrases. Be concise.`);
    },
  },
  {
    name: "content_calendar",
    description:
      "Draft a one-week social media content plan for a visitor's business. Full version: /tools/content-calendar",
    schema: z.object({
      businessName: z.string().max(120),
      industry: z.string().max(120),
      platforms: z.string().max(120).optional(),
    }),
    run: async (args) => {
      const a = z.object({ businessName: z.string().max(120), industry: z.string().max(120), platforms: z.string().max(120).optional() }).parse(args);
      return gen(`One-week social content plan for "${a.businessName}" (${a.industry}) on ${a.platforms ?? "Instagram"}: weekly theme, 4 content pillars, and for each day one post idea with format and best time. Be concise.`, 800);
    },
  },
  {
    name: "document_intelligence",
    description:
      "Summarize a document a visitor pastes and extract its key fields and action items. Full version: /tools/document-intelligence",
    schema: z.object({
      text: z.string().max(4000).describe("The document text"),
      documentType: z.string().max(40).optional(),
    }),
    run: async (args) => {
      const a = z.object({ text: z.string().max(4000), documentType: z.string().max(40).optional() }).parse(args);
      return gen(`Summarize this ${a.documentType ?? "document"} in 2-3 sentences, list its key fields (key: value), and 3 action items.\n\n${a.text}`);
    },
  },
  {
    name: "website_factory",
    description:
      "Draft a website blueprint for a visitor's business: sitemap, design direction, homepage copy. Full version: /tools/website-factory",
    schema: z.object({
      businessName: z.string().max(120),
      industry: z.string().max(120),
      style: z.string().max(60).optional(),
    }),
    run: async (args) => {
      const a = z.object({ businessName: z.string().max(120), industry: z.string().max(120), style: z.string().max(60).optional() }).parse(args);
      return gen(`Website blueprint for "${a.businessName}" (${a.industry}, style: ${a.style ?? "Professional"}): 5-page sitemap with one-line purpose each, design mood in one sentence, homepage headline + subheadline + CTA, 6 SEO keywords. Be concise.`, 700);
    },
  },
  {
    name: "submit_inquiry",
    description:
      "Send a visitor's message to the founder. Use ONLY after the visitor explicitly agreed to send it and provided their name and email.",
    schema: z.object({
      name: z.string().min(1).max(200),
      email: z.string().max(320).describe("The visitor's email address"),
      message: z.string().min(1).max(5000),
    }),
    run: async (args, ctx) => {
      const a = z.object({ name: z.string().trim().min(1).max(200), email: z.email().max(320), message: z.string().trim().min(1).max(5000) }).parse(args);
      const sent = await sendAdminEmail(`Arranto Studio — New Inquiry from ${a.name} (via AI assistant)`, { ...a, locale: ctx.locale });
      return "error" in sent ? sent : { ok: true, note: "Inquiry sent to the founder. He reads every message personally." };
    },
  },
  {
    name: "submit_consultation",
    description:
      "Create the project proposal after a consultation and notify the founder. Use ONLY after: the visitor confirmed a summary of name, email, project type, goals; and you drafted 3-6 concrete scope bullets from the conversation. Write goals/scope in the visitor's language; for Arabic, prefer fully Arabic wording (avoid Latin words — the PDF renders pure Arabic best). Returns links to the proposal page and PDF for the visitor.",
    schema: ConsultationInput,
    run: async (args, ctx) => {
      const cb = consultBudget(ctx.ip);
      if (!cb.ok) return { error: "Consultation limit reached for today. Please use the /contact page." };
      const parsed = ConsultationInput.safeParse(args);
      if (!parsed.success) return { error: `Invalid consultation data: ${parsed.error.issues.map((i) => i.path.join(".")).join(", ")}` };
      const data = { ...parsed.data, locale: ctx.locale, date: new Date().toISOString().slice(0, 10) };
      const token = signProposal(data);
      const proposalUrl = `${env.siteUrl}/${ctx.locale}/proposal/${token}`;
      const pdfUrl = `${env.siteUrl}/api/proposal/pdf?t=${encodeURIComponent(token)}`;
      const sent = await sendAdminEmail(`AI Consultation — ${data.name}`, {
        name: data.name,
        email: data.email,
        company: data.company,
        project_type: data.projectType,
        goals: data.goals.join(" | "),
        scope: data.scope.join(" | "),
        timeline: data.timeline,
        budget_band: data.budgetBand,
        locale: ctx.locale,
        proposal_url: proposalUrl,
      });
      if ("error" in sent) return sent;
      return { ok: true, proposalUrl, pdfUrl, note: "Proposal generated and the founder was notified. Share both links with the visitor." };
    },
  },
];

export function toolSchemas(): AiTool[] {
  return TOOLS.map((t) => {
    const params = z.toJSONSchema(t.schema) as Record<string, unknown>;
    delete params.$schema;
    return { name: t.name, description: t.description, parameters: params };
  });
}

export async function runTool(name: string, args: unknown, ctx: ToolCtx): Promise<unknown> {
  const tool = TOOLS.find((t) => t.name === name);
  if (!tool) return { error: `Unknown tool: ${name}` };
  try {
    return await tool.run(args, ctx);
  } catch (e) {
    console.error(`Tool ${name} failed:`, e instanceof Error ? e.message : e);
    return { error: "The tool failed to run. Answer from what you know and suggest the /contact page if relevant." };
  }
}

export { PROJECT_TYPES };
