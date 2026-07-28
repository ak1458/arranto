import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/work";
import { blogPosts } from "@/content/blog";
import { routing } from "@/i18n/routing";

const BASE = "https://arranto.com";

const servicesSlugs = [
  "ai-automation",
  "ai-saas-development",
  "crm-development",
  "custom-ai-solutions",
  "digital-marketing",
  "website-development",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/assistant",
    "/work",
    ...caseStudies.map((c) => `/work/${c.slug}`),
    "/blog",
    ...blogPosts.map((b) => `/blog/${b.slug}`),
    ...servicesSlugs.map((s) => `/services/${s}`),
    "/support",
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

  // Fix build date for a stable lastmod
  const now = new Date("2026-07-27T00:00:00Z");
  const entries: MetadataRoute.Sitemap = [];

  // Apex root entry
  entries.push({
    url: BASE,
    lastModified: now,
    alternates: {
      languages: {
        en: `${BASE}/en`,
        ar: `${BASE}/ar`,
        "x-default": `${BASE}/en`,
      },
    },
  });

  // Bidirectional en & ar locale entries for every route
  for (const path of paths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        alternates: {
          languages: {
            en: `${BASE}/en${path}`,
            ar: `${BASE}/ar${path}`,
            "x-default": `${BASE}/en${path}`,
          },
        },
      });
    }
  }

  return entries;
}
