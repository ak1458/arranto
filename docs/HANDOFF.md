# Arranto — Project Handoff Document

> **Last Updated**: 2026-07-27  
> **Purpose**: Context document for any AI assistant or developer continuing work on this project.

---

## Project Overview

| Field | Value |
|-------|-------|
| **Domain** | arranto.com |
| **Stack** | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, GSAP 3.15 |
| **Rendering** | SSR via Next.js App Router (no static export) |
| **i18n** | next-intl (en + ar), RTL support via `dir` attribute |
| **Deployment** | Vercel (auto-deploy from git) |
| **Domain Registrar** | (check DNS settings — previously Hostinger) |
| **Package Manager** | npm |

## Architecture

```
src/
├── app/
│   ├── [locale]/           # All user-facing pages (en/ar routing)
│   │   ├── layout.tsx      # Root layout: Nav, Footer, Analytics, Chat, JSON-LD
│   │   ├── page.tsx        # Homepage
│   │   ├── about/          # About page with FAQ schema
│   │   ├── blog/           # Blog with dynamic [slug] routes
│   │   ├── contact/        # Contact form
│   │   ├── services/       # Service pages with dynamic [slug] routes
│   │   ├── work/           # Portfolio with dynamic [slug] case studies
│   │   ├── tools/          # Free AI tools (7 tools)
│   │   ├── legal/          # Privacy, Terms, Cookies, Disclaimer
│   │   ├── assistant/      # AI assistant page
│   │   ├── pricing/        # Redirects to /contact (no public pricing)
│   │   └── support/        # Support page
│   ├── api/                # Server API routes
│   │   ├── chat/           # AI chatbot (OpenRouter streaming)
│   │   ├── contact/        # Contact form handler
│   │   ├── audit/          # Website audit tool
│   │   ├── health/         # Health check endpoint
│   │   ├── seo-content/    # SEO content generator
│   │   ├── brand-kit/      # AI brand kit generator
│   │   ├── content-calendar/ # AI content calendar
│   │   ├── documents/      # Document AI processor
│   │   ├── website-factory/ # Website blueprint generator
│   │   └── proposal/       # Proposal PDF generator
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # robots.txt configuration
│   ├── llms.txt/           # llms.txt for AI crawlers
│   └── llms-full.txt/      # Full llms.txt for AI crawlers
├── components/             # React components
├── content/                # Static content data (services, work, blog)
├── lib/                    # Utilities (seo, fonts, ai, analytics, auth)
├── i18n/                   # Internationalization config
└── messages/               # Translation files (en.json, ar.json)
```

## Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config: CSP headers, legacy redirects, security headers |
| `vercel.json` | Cron job configuration |
| `.env.example` | Template for all environment variables |
| `.env.local` | Actual secrets (gitignored) |
| `credentials/` | Google Cloud service account keys (gitignored) |
| `src/lib/seo.ts` | SEO utilities: metadata, hreflang, JSON-LD schemas |
| `src/lib/env.ts` | Environment variable validation |
| `src/lib/ga4.ts` | GA4 Data API integration |
| `src/lib/gsc.ts` | Google Search Console API integration |
| `src/lib/google-auth.ts` | Google service account JWT authentication |
| `src/components/Analytics.tsx` | Client-side GA4 + GTM loading |

## Environment Variables

### Required for Production

| Variable | Format | Where to Get |
|----------|--------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | GA4 → Admin → Data Streams |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | GTM → Container → Container ID |
| `NEXT_PUBLIC_GSC_VERIFICATION` | string | GSC → Settings → Ownership verification |
| `GA4_PROPERTY_ID` | numeric | GA4 → Admin → Property Settings |
| `SEARCH_CONSOLE_SITE_URL` | `https://arranto.com` | GSC → Properties |
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | JSON string | Google Cloud Console → IAM → Service Accounts |
| `OPENROUTER_API_KEY` | `sk-or-...` | openrouter.ai → API Keys |
| `OPENROUTER_MODEL` | model name | OpenRouter model ID |
| `WEB3FORMS_KEY` | string | web3forms.com |
| `SITE_URL` | `https://arranto.com` | Your domain |
| `PROPOSAL_SECRET` | random string | Self-generated |
| `CRON_SECRET` | random string | Self-generated |

### Current Status
⚠️ `.env.local` currently only has: `WEB3FORMS_KEY`, `SITE_URL`, `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `PROPOSAL_SECRET`. **All Google-related variables are MISSING** and must be configured.

## SEO Status

### What's Implemented ✅
- Metadata (title, description) via `generateMetadata` per page
- Canonical URLs + hreflang (en, ar, x-default)
- Open Graph + Twitter Cards
- Dynamic OG image generation
- `robots.txt` with AI crawler allowance
- `sitemap.xml` with all locale variants
- Organization JSON-LD (sitewide via layout)
- WebSite JSON-LD (sitewide via layout)
- FAQPage JSON-LD (about page, case studies)
- Legacy 301 redirects
- `llms.txt` for AI discoverability

### What Needs Work 🔴
- BreadcrumbList schema on all pages
- Article/BlogPosting schema on blog posts
- Service schema on service pages
- WebApplication schema on tools pages
- Custom event tracking (GA4/GTM)
- Conversion tracking for forms and CTAs
- Arabic translations for 6 tool pages
- Case study content expansion (currently 113-170 words each)
- Geo-specific landing pages
- Blog content (only 3 posts)

## Analytics Architecture

- **GA4**: Client-side via `next/script afterInteractive` in `Analytics.tsx`
- **GTM**: Same component, conditional on `NEXT_PUBLIC_GTM_ID`
- **GSC API**: Server-side via `gsc.ts` using service account JWT
- **GA4 Data API**: Server-side via `ga4.ts` using same service account
- **Consent**: Ad signals permanently denied (privacy policy), analytics granted

## Content Structure

### Services (6 pages)
Defined in `src/content/services.ts`. Each has: slug, title, subtitle, features, body, FAQ, process, compliance, CTA — all bilingual (en/ar).

### Case Studies (5 projects)
Defined in `src/content/work.ts`: PulseKart, Veloria Vault, FATOORA Lite, SanadOS, OrderFlow.

### Blog Posts (3)
Defined in `src/content/blog.ts`. Topics: AI automation future, building AI SaaS, customer service chatbots.

## Running Locally

```bash
cd site
npm install
cp .env.example .env.local  # Then fill in actual values
npm run dev                  # Starts on http://localhost:3000
```

## Deploying

Push to the main branch — Vercel auto-deploys. Ensure all environment variables are set in Vercel Dashboard → Settings → Environment Variables.

## Known Issues
- Some case studies use a "Buy this project" CTA that's misleading for bespoke B2B work
- `/work` page pulls GitHub repos including hobby projects alongside enterprise case studies
- 6 of 7 `/ar/tools/*` pages serve English content despite `lang="ar"` attribute
- Heavy GSAP + Lenis animation stack blocks main thread on slow mobile connections
- Font payload (244.9KB) loads Arabic weights on English pages unnecessarily
