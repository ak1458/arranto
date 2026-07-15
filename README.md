# Arranto

Founder-led software studio site — Next.js 16 App Router, bilingual EN/AR
(full RTL), dark-only monochrome design, deployed on Vercel. Built solo,
end to end: architecture, backend, AI integrations, i18n, SEO, and the
self-improving growth agent described below.

> **Source-available, not open source.** Public for portfolio review — see [`LICENSE`](LICENSE).

## What this is

Arranto (rebrand of Smile Fotilo, est. 2017) is a premium, inquiry-only
software studio. The site itself doubles as a working demo of the studio's
engineering standard: real bilingual i18n (not machine-translated stubs),
real structured data, a real backend (not a static brochure), and a set of
free AI tools running live on the studio's own APIs.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components by default) |
| Language | TypeScript, strict mode |
| i18n | `next-intl` — English + Arabic, full RTL via CSS logical properties (no `left-`/`right-` anywhere) |
| Styling | Tailwind CSS 4 |
| Motion | GSAP (`useGSAP`) + Lenis smooth scroll, scroll-triggered sequences, `prefers-reduced-motion`-safe |
| Database | Supabase (Postgres), RLS enabled, no public policies, no ORM |
| AI | OpenRouter (raw `fetch`, no SDK) — routes to Claude and other models per task |
| Hosting | Vercel — serverless functions + Cron |

No framework-shaped dependencies beyond what's justified: `zod` for
mutation-boundary validation, `@supabase/supabase-js` as the DB client.
Google API access (GA4, Search Console) is raw REST + stdlib `crypto` JWT
signing — not the ~100MB `googleapis` package, for two endpoints.

## Features

**Bilingual, RTL-correct.** Every page, every string, real Arabic
translations (not literal machine output) — including JSON-LD, Open Graph,
sitemap hreflang, and structured FAQ data per locale.

**A real backend, not a contact-form afterthought.**
- `POST /api/contact` — Zod-validated, honeypot spam trap, 5/hr/IP rate
  limit, Supabase insert.
- `POST /api/chat` — streaming AI assistant grounded in the site's own
  content (full-context, no vector DB at this content size), with an
  explicit honesty constraint: in-pilot products are never described as
  live or production-proven, even under leading questions.
- Zod at every mutation boundary; rate limiting on every public POST;
  generic client-facing errors with detailed server-side logs only.

**Seven free AI/dev tools**, live on the studio's own API — website audit
(non-AI heuristic grading), SEO content generator, AI brand kit, content
calendar, document intelligence, website blueprint generator, and a
YouTube bulk SEO optimizer. No signup, no email gate.

**A self-improving growth loop.** A daily Vercel Cron job pulls GA4 +
Search Console data, has an AI model analyze it, and stores the findings.
A weekly local command turns unprocessed findings into reviewable
markdown diffs — proposals a human applies, never a serverless function
editing its own production code.

**SEO/AEO/GEO, done properly, not bolted on.**
- Per-locale `Organization` and per-case-study JSON-LD, `FAQPage` schema
  on both the studio's about page and individual case studies.
- Full hreflang + sitemap + `robots.txt`, every route accounted for.
- Per-page Open Graph/Twitter metadata (not silently inherited from the
  homepage — a common Next.js metadata-merging gap, fixed here) and a
  dynamic on-brand OG image generated natively via `next/og`.
- `llms.txt`/`llms-full.txt` for AI-crawler discovery.

**Security by default.** CSP + HSTS + standard security headers, no
secrets ever shipped client-side (audited — only `NEXT_PUBLIC_*` values
that are public by design: analytics IDs, verification tokens), no
CAPTCHA (honeypot instead), no ad pixels or data brokers.

**Content-honesty as a hard rule, not a suggestion.** Every "proven" vs.
"in pilot" status label is read from a single content source, never
hand-typed per page. No fabricated metrics, ever — the two citable
numbers on this site (118 reviews, 10+ projects) are real and sourced
from the studio's actual history.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in your own keys — see docs/SETUP.md
npm run dev
```

`.env.example` documents every variable this project reads and where to
get it. No real keys exist anywhere in this repository or its history.

## Project structure

| Area | Where |
|---|---|
| Pages (en/ar) | `src/app/[locale]/{about,work,contact,tools,legal}` |
| Case-study content (single source of truth for status/stack/outcomes) | `src/content/work.ts` |
| Contact API | `src/app/api/contact/route.ts` |
| Chat API | `src/app/api/chat/route.ts` |
| Growth agent (cron + local apply step) | `src/app/api/cron/agent/route.ts`, `scripts/agent-improve.mjs` |
| AI tool APIs | `src/app/api/{audit,seo-content,brand-kit,content-calendar,documents,website-factory}` |
| SEO helpers (hreflang, per-page metadata, JSON-LD) | `src/lib/seo.ts` |
| Security headers + CSP | `next.config.ts` |
| DB schema | `supabase/migrations/001_init.sql` |
| Build state / decision log | `docs/MASTER-CONTEXT.md` |

## License

All rights reserved — see [`LICENSE`](LICENSE). This code is published for
review, not reuse.

---

Built and maintained solo by [Ashraf Kamal](https://github.com/ak1458) · [LinkedIn](https://www.linkedin.com/in/ashrafkamal14/)
