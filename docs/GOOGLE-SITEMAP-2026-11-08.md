# Google badge and sitemap repair — 8 November 2026

## Findings

- Search Console domain property `sc-domain:arranto.com` is accessible with owner permission.
- Its sitemap report has **0 errors and 0 warnings**. Google last downloaded it on 4 November and recorded 84 submitted URLs.
- The production deployment at the start of this check came from commit `4349e641dd4cd5103062613feccc3c859251e9d6`. Its sitemap contained only 82 URLs: both mobile-app service pages had disappeared and returned 404.
- A full live inventory found no indexability, canonical or hreflang defects among those 82 remaining URLs.
- URL Inspection for the 84 intended URLs returned: 27 submitted and indexed, 41 discovered but not indexed, 13 unknown to Google, and 3 crawled but not indexed. These are Google's recorded states, not fresh crawls.
- The three crawled but unindexed URLs are the English AI SaaS service and the articles `building-ai-saas-from-scratch` and `what-full-stack-development-means`. Google reports successful fetches, allowed crawling/indexing, and matching declared/Google canonicals. Their recorded crawl dates are in August. No current technical indexing block was found.
- A clean `npm ci` initially failed because the lockfile omitted two required `@emnapi` entries. The repaired lockfile passes the clean-install dry run without upgrading application dependencies.

## Changes

- Added Google's unmodified official dark Preferred Source badge to the shared footer, linked to `https://www.google.com/preferences/source?q=arranto.com`. Accessible labels are translated into English and Arabic. Google's graphic is served locally without a third-party script.
- Restored the existing owner-approved mobile-app service content in both locales, localized metadata, sitemap discovery and service links.
- Removed the seven-service footer limit so every available service can be discovered.
- Added regression checks for the badge destination/asset and the restored pages' status, canonical, locale alternates, sitemap inclusion and footer links.
- Based the release on the current production commit, preserving unrelated unfinished changes in the original development checkout. Keeping these repairs in Git prevents a later documentation-only deployment from removing them.

## Validation before publication

- Production build, TypeScript, RTL utilities and translation key checks: passed.
- SEO regressions: 23 passed; agent-response checks: 10 passed; negotiation unit checks: 7 passed.
- Full release inventory: 84 sitemap URLs, 99 total URLs checked, no sitemap indexability/canonical/hreflang issues.
- English desktop and Arabic mobile badge render checks: passed, image loaded, no horizontal overflow.

Sitemap submission is a request for Google to process the published sitemap. It cannot guarantee indexing, ranking or a crawl date. The badge destination works, but confirming domain eligibility as a Preferred Source requires a signed-in Google user; no user preference was changed during testing.

Official references:

- [Google Preferred Sources guidance, updated September 2026](https://developers.google.com/search/docs/appearance/preferred-sources)
- [Google sitemap guidance, updated July 2026](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
