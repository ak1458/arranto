# Arranto — Production Task Tracker

Mirrors the tracks in `arranto-implementation-plan.md`. Status values: `BACKLOG`, `IN PROGRESS`, `BLOCKED`, `DONE`. Update in place as work proceeds — this file is the single source of truth for build status, not the implementation plan (which stays static as the spec).

## Track 1 — Infrastructure, i18n, Base Layout

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-101 | Project init | Next.js App Router + TypeScript strict mode, ESLint + Prettier from day one | Low | None | `BACKLOG` |
| TSK-102 | i18n setup | `next-intl` config, `en`/`ar` locale routing, `Accept-Language` middleware, cookie persistence | Medium | TSK-101 | `BACKLOG` |
| TSK-103 | Root layout | Locale-aware `<html lang dir>` shell | Low | TSK-102 | `BACKLOG` |
| TSK-104 | Theme tokens | Tailwind config: Ink/Signal Gold/Paper/Muted, dark-only | Low | TSK-101 | `BACKLOG` |
| TSK-105 | Logical-properties enforcement | Tailwind logical utilities + CI check blocking `left-`/`right-`/`pl-`/`pr-` | Medium | TSK-104 | `BACKLOG` |

## Track 2 — Content & Case Studies

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-201 | Content schema | Zod frontmatter validator for case-study MDX | Medium | TSK-101 | `BACKLOG` |
| TSK-202 | Case study content | 5 MDX files × 2 locales (pulsekart, orderflow, veloria-vault, zatca-compliance-engine, sanad-os) | High | TSK-201 | `BACKLOG` |
| TSK-203 | Work index page | `/work` grid, sorted by `order`, unsegmented | Medium | TSK-202 | `BACKLOG` |
| TSK-204 | Work detail page | `/work/[slug]` header + media + FAQ accordion | High | TSK-202 | `BACKLOG` |
| TSK-205 | Static pages | `/studio`, `/legal/privacy`, `/legal/terms` | Low | TSK-103 | `BACKLOG` |
| TSK-206 | Contact page UI | `/contact` form UI (no backend yet) | Low | TSK-103 | `BACKLOG` |

## Track 3 — Data Layer & Contact

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-301 | Supabase setup | Provision project, run `inquiries` + `content_chunks` DDL, enable RLS | Medium | None | `BACKLOG` |
| TSK-302 | Contact server action | Validation, honeypot, rate-limit, insert to `inquiries` | Medium | TSK-206, TSK-301 | `BACKLOG` |
| TSK-303 | Contact QA | Real + honeypot test submissions, confirm RLS blocks direct client writes | Low | TSK-302 | `BACKLOG` |

## Track 4 — Chatbot / RAG

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-401 | Embedding script | `scripts/embed-content.ts`, chunk + embed MDX content into `content_chunks` | High | TSK-202, TSK-301 | `BACKLOG` |
| TSK-402 | Chatbot server route | Retrieval + Claude call via Vercel AI SDK, honesty-constrained system prompt | High | TSK-401 | `BACKLOG` |
| TSK-403 | Chatbot UI | Minimal launcher, streaming response, bilingual input | Medium | TSK-402 | `BACKLOG` |
| TSK-404 | Chatbot QA | 20-question test set per in-pilot product, verify honesty constraint holds | Medium | TSK-403 | `BACKLOG` |

## Track 5 — Animation & Motion Polish

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-501 | GSAP setup | Install GSAP + `@gsap/react`, `useGSAP` pattern established | Low | TSK-101 | `BACKLOG` |
| TSK-502 | Hero animation | Entrance motion, headline reveal | Medium | TSK-501 | `BACKLOG` |
| TSK-503 | Work tile hover | Scale/opacity reveal on hover/tap | Low | TSK-203, TSK-501 | `BACKLOG` |
| TSK-504 | FAQ accordion motion | Height/opacity open-close transition | Low | TSK-204, TSK-501 | `BACKLOG` |
| TSK-505 | Reduced-motion fallback | `prefers-reduced-motion` path for every animated component | Medium | TSK-502–504 | `BACKLOG` |
| TSK-506 | Mobile perf pass | 60fps target, CLS ≤ 0.05, throttled/real-device profiling | High | TSK-502–505 | `BACKLOG` |

## Track 6 — Legacy Migration & Redirects

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-601 | Bridge page | smilefotilo.com root → short bridge page + tools access | Low | None | `BACKLOG` |
| TSK-602 | Redirect matrix | Updated 301 map (old `/pricing`→`/contact`, old `/locations/*`→`/studio`, etc.) | Medium | Sitemap final (done — see App Flow) | `BACKLOG` |
| TSK-603 | GBP update | Rename Google Business Profile to "Arranto," preserve 118 reviews | Low | None | `BACKLOG` |

## Track 7 — SEO/GEO & Launch QA

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-701 | Schema.org markup | `Organization` + per-case-study markup | Medium | TSK-202 | `BACKLOG` |
| TSK-702 | hreflang + llms.txt | `hreflang` pairing, `llms.txt`/`llms-full.txt` at root | Low | TSK-202 | `BACKLOG` |
| TSK-703 | Performance QA | Lighthouse/PageSpeed mobile pass against PRD thresholds | Medium | TSK-506 | `BACKLOG` |
| TSK-704 | RTL manual QA | Full-site Arabic pass, every directional icon checked | Medium | TSK-105, TSK-202 | `BACKLOG` |
| TSK-705 | Content/brand QA | No repeated claims, zero region/product names on brand-layer pages | Medium | TSK-202–206 | `BACKLOG` |
| TSK-706 | Launch | Production deploy | Low | All above | `BACKLOG` |

## Track 8 — Free AI Tools Suite (added 2026-07-12)

| Task ID | Module | Requirement Detail | Complexity | Dependency | Status |
|---|---|---|---|---|---|
| TSK-801 | Tools index | `/[locale]/tools` grid, 7 tools, en/ar | Low | TSK-103 | `DONE` |
| TSK-802 | Website Audit | `/api/audit` non-AI heuristic (SEO/Perf/Mobile/Security/Structure → A–F), SSRF block | Medium | None | `DONE` |
| TSK-803 | SEO Content Engine | `/api/seo-content` OpenRouter AI (titles/meta/keywords/outline) | Medium | I1 | `DONE` |
| TSK-804 | AI Brand Kit | `/api/brand-kit` OpenRouter AI + local palette presets | Medium | I1 | `DONE` |
| TSK-805 | Content Calendar | `/api/content-calendar` OpenRouter AI 7-day plan | Medium | I1 | `DONE` |
| TSK-806 | Document Intelligence | `/api/documents` OpenRouter AI summary/extract/actions | Medium | I1 | `DONE` |
| TSK-807 | Website Factory | `/api/website-factory` OpenRouter AI + fallback blueprint | Medium | I1 | `DONE` |
| TSK-808 | GitHub portfolio sync | `src/lib/github.ts` fetch ak1458 repos → `/work`; wired | Medium | None | `DONE` |
| TSK-809 | YT Bulk Optimizer | OAuth + channel/video READ real; publish/playlist-sync mock (no `videos.update` server call) | High | I1, YouTube OAuth creds | `IN PROGRESS` |

## Held (not scheduled — scope-blocked)

| Task ID | Module | Requirement Detail | Blocked On |
|---|---|---|---|
| TSK-H01 | TehsilOS page | `/work/tehsil-os` MDX + route + chatbot content | Scope confirmation |
| TSK-H02 | Future tools | Any item from `arranto-future-tools.md` | At least one live design partner pilot |
