# Arranto — SEO Architecture Reference

> **Last Updated**: 2026-07-27

---

## Metadata System

### Root Layout Metadata
Located in `src/app/[locale]/layout.tsx`:
- `title` and `description` from translation keys (`meta.title`, `meta.description`)
- `metadataBase`: `https://arranto.com`
- `openGraph`: Full OG tags with locale-aware `og:locale`
- `twitter`: `summary_large_image` card type
- `verification.google`: From `NEXT_PUBLIC_GSC_VERIFICATION` env var

### Per-Page Metadata
Use `pageMetadata()` from `src/lib/seo.ts`:
```typescript
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: "Page Title | Arranto",
    description: "Description under 160 chars...",
    path: "/page-path",
    locale,
  });
}
```

### Hreflang
Handled by `alternatesFor()` in `src/lib/seo.ts`:
- Generates `canonical`, `en`, `ar`, `x-default` alternates
- Applied to both `<head>` and `sitemap.xml`

---

## JSON-LD Schemas

### Sitewide (Root Layout)
`siteJsonLd(locale)` from `src/lib/seo.ts` injects:
1. **WebSite** schema — establishes arranto.com as a recognized website entity
2. **Organization** schema — establishes Arranto as an organization with founder, areas served, expertise

### Per-Page Schemas

| Page | Schema | Implementation |
|------|--------|---------------|
| `/about` | FAQPage | Inline JSON-LD in `about/page.tsx` |
| `/work/[slug]` | FAQPage + SoftwareApplication | In case study template |
| `/blog/[slug]` | Article/BlogPosting | ⚠️ **TODO**: Not yet implemented |
| `/services/[slug]` | Service | ⚠️ **TODO**: Not yet implemented |
| `/tools/[slug]` | WebApplication | ⚠️ **TODO**: Not yet implemented |
| All pages | BreadcrumbList | ⚠️ **TODO**: Not yet implemented |

---

## Sitemap

Located at `src/app/sitemap.ts`:
- Generates all routes with bidirectional en/ar variants
- Includes hreflang alternates per URL
- Uses fixed `lastModified` date (update when content changes)
- Excludes redirect targets (e.g., `/pricing`)

## robots.txt

Located at `src/app/robots.ts`:
- Allows all crawlers on `/`
- Blocks `/api/` and `/-/`
- Explicitly allows AI crawlers (ChatGPT-User, PerplexityBot, ClaudeBot)
- References `sitemap.xml`

## llms.txt

Located at `src/app/llms.txt/route.ts`:
- Provides structured site summary for AI crawlers
- Lists all pages, services, and case studies
- Updated dynamically from content data

---

## Adding New Pages (SEO Checklist)

When adding a new page:

1. ✅ Add `generateMetadata` with `pageMetadata()` call
2. ✅ Add the path to `sitemap.ts` paths array
3. ✅ Use a single `<h1>` for the main heading
4. ✅ Add relevant JSON-LD schema (`<script type="application/ld+json">`)
5. ✅ Add internal links from related pages
6. ✅ Ensure translations exist in both `en.json` and `ar.json`
7. ✅ Test both `/en/page` and `/ar/page` render correctly
