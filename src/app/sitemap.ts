import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/work";
import { routing } from "@/i18n/routing";

const BASE = "https://arranto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/work",
    ...caseStudies.map((c) => `/work/${c.slug}`),
    "/tools",
    "/tools/website-audit",
    "/tools/seo-content",
    "/tools/brand-kit",
    "/tools/content-calendar",
    "/tools/document-intelligence",
    "/tools/website-factory",
    "/tools/yt-bulk-optimizer",
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/disclaimer",
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
