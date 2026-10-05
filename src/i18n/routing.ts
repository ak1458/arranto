import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Every page already emits correct hreflang <link> tags (lib/seo.ts alternatesFor).
  // next-intl's extra `Link:` response header pointed x-default at the unprefixed URL,
  // which only 307-redirects — a conflicting signal for crawlers.
  alternateLinks: false,
  // Owner decision (2026-10-05): unprefixed URLs always go to English rather than
  // guessing from Accept-Language/cookies; Arabic is one click away (/ar).
  localeDetection: false,
});
