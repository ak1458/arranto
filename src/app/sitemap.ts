import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/work";
import { routing } from "@/i18n/routing";

const BASE = "https://arranto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    ...caseStudies.map((c) => `/work/${c.slug}`),
    "/studio",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
  ];

  return paths.map((path) => ({
    url: `${BASE}/en${path}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
      ),
    },
  }));
}
