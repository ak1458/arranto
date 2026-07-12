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

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Arranto",
  alternateName: "Smile Fotilo",
  foundingDate: "2017",
  url: BASE,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "118",
  },
  sameAs: [
    "https://smilefotilo.com",
    "https://www.linkedin.com/in/ashrafkamal14/",
  ],
};
