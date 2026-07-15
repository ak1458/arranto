import type { Metadata } from "next";

const BASE = "https://arranto.com";

/** hreflang pairing for a route, per PRD REQ + SEO plan. */
export function alternatesFor(path: string, locale: string) {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      en: `${BASE}/en${path}`,
      ar: `${BASE}/ar${path}`,
      "x-default": `${BASE}/en${path}`,
    },
  };
}

/** Per-page metadata: title/description + hreflang + OpenGraph/Twitter overrides.
 * Every page previously set title/description/alternates but never its own
 * openGraph/twitter — those silently inherited the root layout's home-page values,
 * so sharing e.g. /about on LinkedIn/WhatsApp showed the homepage's card, not About's. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  locale: string;
}): Metadata {
  const { title, description, path, locale } = opts;
  return {
    title,
    description,
    alternates: alternatesFor(path, locale),
    openGraph: { title, description, url: `${BASE}/${locale}${path}` },
    twitter: { title, description },
  };
}

const ORG_DESCRIPTION: Record<"en" | "ar", string> = {
  // Brand layer: no region or product names (MASTER-CONTEXT §1). This description is
  // emitted on every page, home included, so naming the Gulf here would make a regional
  // shop of a global studio — the exact thing the three-layer rule exists to prevent.
  // Regions stay as areaServed country codes (coverage data, not identity prose), and
  // regulation-specific expertise stays in the proof layer, on /work.
  en: "Founder-led software studio. Websites, custom software, SaaS, AI automation and integrations.",
  ar: "استوديو برمجيات بقيادة مؤسس واحد. مواقع، برمجيات مخصصة، أنظمة SaaS، وأتمتة وتكاملات الذكاء الاصطناعي.",
};

const ORG_KNOWS_ABOUT: Record<"en" | "ar", string[]> = {
  en: [
    "web development",
    "custom software development",
    "SaaS development",
    "AI automation",
    "AI integration",
    "business systems",
  ],
  ar: [
    "تطوير الويب",
    "تطوير البرمجيات المخصصة",
    "تطوير أنظمة SaaS",
    "أتمتة الذكاء الاصطناعي",
    "تكامل الذكاء الاصطناعي",
    "أنظمة الأعمال",
  ],
};

/** Organization JSON-LD, localized per the requesting page's locale (`inLanguage` +
 * an Arabic `description`/`knowsAbout`) — search engines were only ever served the
 * English variant before, even on `/ar` pages. */
export function orgJsonLd(locale: string) {
  const l = locale === "ar" ? "ar" : "en";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arranto",
    alternateName: "Smile Fotilo",
    foundingDate: "2017",
    url: BASE,
    inLanguage: l,
    description: ORG_DESCRIPTION[l],
    founder: { "@type": "Person", name: "Ashraf Kamal", sameAs: "https://github.com/ak1458" },
    areaServed: ["SA", "AE", "OM", "US", "GB", "DE", "FR", "IN"],
    knowsAbout: ORG_KNOWS_ABOUT[l],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "118",
    },
    sameAs: [
      "https://www.linkedin.com/in/ashrafkamal14/",
      "https://github.com/ak1458",
    ],
  };
}
