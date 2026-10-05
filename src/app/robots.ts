import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/-/"],
      },
      // AI search/answer crawlers, named explicitly. A crawler that matches a named
      // group ignores the "*" group entirely (RFC 9309), so the private paths must
      // be repeated here or these bots were free to crawl /api/.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
        disallow: ["/api/", "/-/"],
      },
    ],
    sitemap: "https://arranto.com/sitemap.xml",
  };
}
