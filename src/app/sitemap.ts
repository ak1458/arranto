import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/work";
import { blogPosts } from "@/content/blog";
import { serviceDetails } from "@/content/services";
import { jobPostings } from "@/content/careers";
import { routing } from "@/i18n/routing";

const BASE = "https://arranto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/assistant",
    "/work",
    ...caseStudies.map((c) => `/work/${c.slug}`),
    "/blog",
    ...blogPosts.map((b) => `/blog/${b.slug}`),
    "/services",
    ...serviceDetails.map((s) => `/services/${s.slug}`),
    "/support",
    "/tools",
    "/tools/website-audit",
    "/tools/seo-content",
    "/tools/brand-kit",
    "/tools/content-calendar",
    "/tools/document-intelligence",
    "/tools/website-factory",
    "/tools/yt-bulk-optimizer",
    "/careers",
    // Closed roles stay reachable but are not advertised for crawling.
    ...jobPostings.filter((j) => j.status === "open").map((j) => `/careers/${j.slug}`),
    "/contact",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/disclaimer",
  ];

  // No lastmod: a single hardcoded date on every URL told crawlers nothing had
  // changed since July. Omitting it is better than a wrong value; add per-page
  // dates here once content carries an `updated` field.
  const entries: MetadataRoute.Sitemap = [];

  // No apex-root entry: "/" 307-redirects to "/en" (next-intl locale routing), and
  // Google's own sitemap guidance says never list a redirecting URL — it was splitting
  // index/ranking signal between "/" and "/en" for the same page (confirmed via GSC:
  // both were separately "discovered", diluting the canonical home URL).

  // Bidirectional en & ar locale entries for every route
  for (const path of paths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
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
