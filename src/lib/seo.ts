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

function ogImage(locale: string) {
  const l = locale === "ar" ? "ar" : "en";
  return { url: `${BASE}/${l}/opengraph-image`, width: 1200, height: 630, type: "image/png" };
}

export type Crumb = { name: string; path: string };

const HOME_LABEL = { en: "Home", ar: "الرئيسية" } as const;

/** Section names used in breadcrumbs, per locale. */
export const SECTION_LABEL = {
  about: { en: "About", ar: "عن أرانتو" },
  contact: { en: "Contact", ar: "تواصل" },
  work: { en: "Work", ar: "الأعمال" },
  blog: { en: "Blog", ar: "المدونة" },
  tools: { en: "Free tools", ar: "أدوات مجانية" },
  careers: { en: "Careers", ar: "الوظائف" },
  services: { en: "Services", ar: "الخدمات" },
} as const;

/** BreadcrumbList with localized names; "Home" is always the first item. */
export function breadcrumbJsonLd(locale: string, trail: Crumb[]) {
  const l = locale === "ar" ? "ar" : "en";
  const items = [{ name: HOME_LABEL[l], path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}/${l}${c.path}`,
    })),
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
    // Setting openGraph/twitter here replaces the layout's values wholesale, which
    // dropped the locale's generated opengraph-image on every page but the home.
    openGraph: { title, description, url: `${BASE}/${locale}${path}`, images: [ogImage(locale)] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage(locale).url] },
  };
}

export const ORG_DESCRIPTION: Record<"en" | "ar", string> = {
  // Brand layer: no region or product names (MASTER-CONTEXT §1). This description is
  // emitted on every page, home included, so naming the Gulf here would make a regional
  // shop of a global studio — the exact thing the three-layer rule exists to prevent.
  // Regions stay as areaServed country codes (coverage data, not identity prose), and
  // regulation-specific expertise stays in the proof layer, on /work.
  en: "Founder-led software studio. Websites, custom software, SaaS, AI automation and integrations.",
  ar: "استوديو برمجيات بقيادة مؤسس واحد. مواقع، برمجيات مخصصة، أنظمة SaaS، وأتمتة وتكاملات الذكاء الاصطناعي.",
};

/** The studio's public contact details — the same email and number shown on the
 * contact section and footer. Single source for JSON-LD and agent Markdown. */
export const CONTACT = {
  email: "help@arranto.com",
  phone: "+91-94538-78422",
} as const;

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
    // Stable entity id: lets search/AI systems merge every page's Organization and
    // the WebSite publisher into one "Arranto" entity tied to the apex domain.
    "@id": `${BASE}/#organization`,
    name: "Arranto",
    // Real rebrand fact, stated in visible /about copy — schema was missing this
    // entity-disambiguation signal (an AI/search system has no way to connect
    // "Arranto" and "Smile Fotilo" as the same entity without it).
    alternateName: "Smile Fotilo",
    foundingDate: "2017",
    url: BASE,
    // Raster logo: Google's logo guidelines (and Knowledge Panel) want a crawlable
    // PNG/JPG at least 112x112; the brand symbol PNG is 948x1028.
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/brand/arranto-symbol.png`,
      width: 948,
      height: 1028,
    },
    description: ORG_DESCRIPTION[l],
    founder: {
      "@id": `${BASE}/#founder`,
      "@type": "Person",
      name: "Ashraf Kamal",
      sameAs: [
        "https://github.com/ak1458",
        "https://www.linkedin.com/in/ashrafkamal14/"
      ]
    },
    // contactPoint + address let AI/search systems verify the business and answer
    // "how do I contact Arranto" directly. The studio is remote-first with no public
    // street address, so the PostalAddress states only the country (that of the
    // published +91 business line) rather than inventing a street.
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT.email,
      telephone: CONTACT.phone,
      availableLanguage: ["English", "Arabic"],
      url: `${BASE}/${l}/contact`,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: ["SA", "AE", "KW", "QA", "OM", "BH", "US", "IN", "GB"],
    knowsAbout: ORG_KNOWS_ABOUT[l],
    sameAs: [
      "https://github.com/ak1458/arranto",
      "https://www.linkedin.com/company/arranto"
    ],
  };
}

/** Sitewide JSON-LD: WebSite (with potential SearchAction) + Organization.
 * Injected once in the root layout so every page carries the entity signals. */
export function siteJsonLd(locale: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Arranto",
      url: BASE,
      inLanguage: ["en", "ar"],
      "@id": `${BASE}/#website`,
      publisher: { "@id": `${BASE}/#organization` },
    },
    orgJsonLd(locale),
  ];
}
