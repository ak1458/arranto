import { sorted, type CaseStudy } from "@/content/work";
import { serviceDetails } from "@/content/services";
import { blogPosts } from "@/content/blog";
import { ORG_DESCRIPTION, CONTACT } from "@/lib/seo";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

// Markdown representations served to agents that send `Accept: text/markdown`
// (see src/proxy.ts). Built from the same content modules the HTML pages render,
// so the two representations can never disagree.

type Locale = "en" | "ar";
const BASE = "https://arranto.com";
const MESSAGES = { en, ar } as const;

const LABELS = {
  en: {
    work: "Selected work",
    allWork: "All case studies",
    services: "Services",
    blog: "Blog",
    contact: "Contact",
    status: "Status",
    stack: "Stack",
    faq: "FAQ",
    agents: "For AI agents",
    statusValue: { proven: "delivered, live in production", "in-pilot": "in pilot — not yet live", "active-development": "active development — not yet deployed" },
  },
  ar: {
    work: "أعمال مختارة",
    allWork: "كل دراسات الحالة",
    services: "الخدمات",
    blog: "المدونة",
    contact: "التواصل",
    status: "الحالة",
    stack: "التقنيات",
    faq: "الأسئلة الشائعة",
    agents: "لوكلاء الذكاء الاصطناعي",
    statusValue: { proven: "مُسلَّم ويعمل في الإنتاج", "in-pilot": "قيد التجربة — غير منشور بعد", "active-development": "قيد التطوير — غير منشور بعد" },
  },
} as const;

type Publishable = CaseStudy & { status: "proven" | "in-pilot" | "active-development" };
const publishable = sorted.filter((c): c is Publishable => c.status !== "held");

const url = (locale: Locale, path: string) => `${BASE}/${locale}${path}`;

function agentFooter(locale: Locale): string {
  return `## ${LABELS[locale].agents}

- Site guide and when to use Arranto: ${BASE}/llms.txt
- Full detail: ${BASE}/llms-full.txt
- Sitemap: ${BASE}/sitemap.xml
- HTML version of this page: request it with \`Accept: text/html\``;
}

function contactBlock(locale: Locale): string {
  return `## ${LABELS[locale].contact}

- Email: ${CONTACT.email}
- Phone / WhatsApp: ${CONTACT.phone}
- Contact form: ${url(locale, "/contact")}`;
}

function workLine(locale: Locale, c: Publishable): string {
  return `- **${c.title}** (${LABELS[locale].statusValue[c.status]}): ${c.outcome[locale]} — ${url(locale, `/work/${c.slug}`)}`;
}

function home(locale: Locale): string {
  const m = MESSAGES[locale];
  const L = LABELS[locale];
  return `# ${m.meta.title}

> ${m.meta.description}

${ORG_DESCRIPTION[locale]}

${m.hero.col1Text}

${m.hero.col2Text}

## ${L.work}

${publishable.slice(0, 4).map((c) => workLine(locale, c)).join("\n")}

${L.allWork}: ${url(locale, "/work")}

## ${L.services}

${serviceDetails.map((s) => `- **${s.title[locale]}**: ${s.subtitle[locale]} — ${url(locale, `/services/${s.slug}`)}`).join("\n")}

${contactBlock(locale)}

${agentFooter(locale)}
`;
}

function workIndex(locale: Locale): string {
  const m = MESSAGES[locale];
  return `# ${m.work.indexHeading}

${m.work.indexIntro}

${publishable.map((c) => workLine(locale, c)).join("\n")}

${agentFooter(locale)}
`;
}

function workDetail(locale: Locale, c: Publishable): string {
  const L = LABELS[locale];
  const article = c.article ? `\n\n${c.article[locale].replace(/\\n/g, "\n")}` : "";
  const faq = c.faq.length
    ? `\n\n## ${L.faq}\n\n${c.faq.map((f) => `**${f.q[locale]}**\n\n${f.a[locale]}`).join("\n\n")}`
    : "";
  return `# ${c.title}

> ${c.outcome[locale]}

- ${L.status}: ${L.statusValue[c.status]}
- ${L.stack}: ${c.stack.join(", ")}

${c.body[locale]}${article}${faq}

${agentFooter(locale)}
`;
}

function servicesIndex(locale: Locale): string {
  const L = LABELS[locale];
  return `# ${L.services}

${serviceDetails.map((s) => `- **${s.title[locale]}**: ${s.citablePassage[locale]} — ${url(locale, `/services/${s.slug}`)}`).join("\n")}

${contactBlock(locale)}

${agentFooter(locale)}
`;
}

function serviceDetail(locale: Locale, s: (typeof serviceDetails)[number]): string {
  const L = LABELS[locale];
  const features = s.features[locale].map((f) => `- **${f.title}**: ${f.desc}`).join("\n");
  const faq = s.faq.map((f) => `**${f.q[locale]}**\n\n${f.a[locale]}`).join("\n\n");
  return `# ${s.title[locale]}

> ${s.subtitle[locale]}

${s.citablePassage[locale]}

${s.overview[locale].join("\n\n")}

${features}${s.body ? `\n\n${s.body[locale]}` : ""}

## ${L.faq}

${faq}

${contactBlock(locale)}

${agentFooter(locale)}
`;
}

function blogIndex(locale: Locale): string {
  const m = MESSAGES[locale];
  return `# ${m.blog.heading}

${m.blog.subline}

${blogPosts.map((p) => `- **${p.title[locale]}** (${p.date}): ${p.excerpt[locale]} — ${url(locale, `/blog/${p.slug}`)}`).join("\n")}

${agentFooter(locale)}
`;
}

function blogDetail(locale: Locale, p: (typeof blogPosts)[number]): string {
  const L = LABELS[locale];
  const faq = p.faq?.length
    ? `\n\n## ${L.faq}\n\n${p.faq.map((f) => `**${f.q[locale]}**\n\n${f.a[locale]}`).join("\n\n")}`
    : "";
  return `# ${p.title[locale]}

> ${p.excerpt[locale]}

${p.date} · ${p.readTime}

${p.article[locale].replace(/\\n/g, "\n")}${faq}

${agentFooter(locale)}
`;
}

export function notFoundMarkdown(pathname: string): string {
  const shown = pathname.replace(/[`\r\n]/g, "");
  return `# 404 — Page not found

There is no page at \`${shown}\` on arranto.com. The link may be outdated or mistyped.

Where to go instead:

- Home: ${BASE}/en
- Site guide for AI agents (pages, services, when to use Arranto): ${BASE}/llms.txt
- Sitemap of every public page: ${BASE}/sitemap.xml
- Contact: ${CONTACT.email}
`;
}

// Real routes with no Markdown representation yet (interactive tools, forms, docs,
// tokenised proposals, GitHub-backed /work pages): fall through to the HTML page
// rather than mislabel them as missing.
const PASSTHROUGH = [
  /^\/(about|assistant|contact|support|tools|careers|pricing|opengraph-image)(\/.*)?$/,
  /^\/legal\/(privacy|terms|cookies|disclaimer)$/,
  /^\/proposal\/[^/]+$/,
  /^\/work\/[^/]+$/,
];

export type MarkdownResolution =
  | { kind: "markdown"; status: 200; body: string }
  | { kind: "not-found"; status: 404; body: string }
  | { kind: "passthrough" };

/** Maps a request path (with or without the /en|/ar prefix) to its Markdown. */
export function resolveMarkdown(pathname: string): MarkdownResolution {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const match = clean.match(/^\/(en|ar)(\/.*)?$/);
  const locale: Locale = match ? (match[1] as Locale) : "en";
  const rest = match ? match[2] ?? "" : clean === "/" ? "" : clean;
  const ok = (body: string) => ({ kind: "markdown", status: 200, body }) as const;

  if (rest === "") return ok(home(locale));
  if (rest === "/work") return ok(workIndex(locale));
  if (rest === "/services") return ok(servicesIndex(locale));
  if (rest === "/blog") return ok(blogIndex(locale));

  const [, section, slug, extra] = rest.split("/");
  if (slug && extra === undefined) {
    if (section === "work") {
      const c = publishable.find((x) => x.slug === slug);
      if (c) return ok(workDetail(locale, c));
    }
    if (section === "services") {
      const s = serviceDetails.find((x) => x.slug === slug);
      if (s) return ok(serviceDetail(locale, s));
    }
    if (section === "blog") {
      const p = blogPosts.find((x) => x.slug === slug);
      if (p) return ok(blogDetail(locale, p));
    }
  }

  if (PASSTHROUGH.some((re) => re.test(rest))) return { kind: "passthrough" };
  return { kind: "not-found", status: 404, body: notFoundMarkdown(pathname) };
}
