# ARRANTO — MASTER CONTEXT

> **Single source of truth for build state.** Any AI agent continuing this work: read this file FIRST, then only the docs you need. Update task checkboxes as you complete work. Do not re-read the whole doc tree.

Last updated: 2026-07-12 (checkboxes updated after build verification)

---

## 1. What this project is

**Arranto** = rebrand of Smile Fotilo (est. 2017, Gonda, India). Premium, founder-led, AI-native software studio. Global brand — Gulf products are *proof*, never identity. Premium clients only; menu-of-services model, inquiry-only (no e-commerce, no public pricing).

Target markets (priority): Gulf → US → Europe → India.

**Three-layer rule (build-blocking):**
- Brand layer (home/nav/meta/chat opener): ZERO region or product names.
- Proof layer (`/work/*`): ZATCA/SanadOS/Gulf named here only, one line each.
- Outreach layer (private emails): may say ZATCA. Not on the site.

**Case studies (5):** pulsekart, orderflow, veloria-vault (proven) + zatca-compliance-engine, sanad-os (in-pilot). **TehsilOS HARD-GATED** — no route/MDX/chat knowledge/schema until scope confirmed.

## 2. Authoritative docs (precedence order)

1. **This file** (build state + decisions)
2. `site/docs/` — final spec set: arranto-prd.md, arranto-tracker.md, arranto-schema.md, arranto-rules.md, arranto-app-flow.md, arranto-website-content-v2.md, arranto-positioning-strategy-v3.md, arranto-seo-plan.md
3. `archive/Files and docs/_unzipped/files/` — v2 strategy (background only; its sitemap with /products, /pricing, /locations is **superseded**)
4. Everything else (v1 blueprints, gemini-code plans) — historical, archived in `archive/`.

Reference implementation to copy patterns from: `D:\gravity\smilefotilo live on varcel\smile-fotilo\` (live on Vercel). Reusable: `app/lib/security/rate-limit.ts`, `app/lib/ai/smart-router.ts`, `next.config.ts` (security headers + CSP), `vercel.json` (crons), `app/api/cron/*`, `app/components/{GoogleAnalytics,CookieConsent,ConversionTracking}.tsx`, `scripts/seo/unified-seo-agent.mjs`, `scripts/seo/auto-fixer.mjs`.

## 3. Decisions log (deviations from docs — with reasons)

| # | Decision | Why |
|---|----------|-----|
| D1 | **OpenRouter API** for all AI (chat + agent), not Anthropic-direct | Owner instruction 2026-07-12. OpenRouter serves Claude models; one key, model flexibility. |
| D2 | **No pgvector RAG for chatbot v1** — inject full site content into system prompt instead | Total site content ≈ few KB (5 case studies + FAQ). Full-context beats RAG at this scale: simpler, cheaper, no embedding-model lock-in (schema caveat unresolved). pgvector migration kept in `supabase/migrations/` as deferred option, commented. |
| D3 | **Supabase = the one database** (inquiries + agent_reports). No other DB. | Docs mandate it; agent needs persistent reports; lightweight. |
| D4 | Contact = server API route with Zod validation + honeypot + 5/hr/IP rate limit → Supabase insert. Web3Forms kept ONLY as optional email-notify side channel if key present. | Docs flow; existing client-side Web3Forms call was insecure/placeholder. |
| D5 | Google APIs via **raw REST + stdlib crypto JWT** (service account), not `googleapis` npm package | Minimalism rules 018–024; googleapis is ~100MB of dep for 2 endpoints. |
| D6 | Self-improvement agent = Vercel Cron (runs with owner PC off) + weekly local `npm run agent:improve` for apply-fixes step | Serverless cron can analyze/report but must not self-edit deployed code; local command applies AI-proposed fixes under git review. |
| D7 | UI/design work **deferred entirely** — designer delivering later. Do not touch visual components except where logic requires (form submit wiring). | Owner instruction 2026-07-12. |
| D8 | Chatbot widget UI deferred (D7); `/api/chat` built and testable via curl now | UI phase will add launcher per app-flow spec. |

## 4. Stack (locked)

Next.js 16.2.10 App Router + TS strict · next-intl (en/ar, RTL, middleware at `src/proxy.ts`) · Tailwind 4 · GSAP via useGSAP · Supabase JS (no ORM) · OpenRouter (raw fetch, no SDK) · Vercel hosting. Deps added beyond existing: `zod`, `@supabase/supabase-js` (justified: mutation validation mandated by rules; DB client). **No other new deps without one-line justification.**

Note for agents: Next 16 has breaking changes — read `site/node_modules/next/dist/docs/01-app/02-guides/*.md` before using unfamiliar APIs. Middleware file is `src/proxy.ts` (Next 16 convention).

## 5. App location + commands

- App: `d:\gravity\Arranto\site\`
- `npm run dev` · `npm run build` · `npm run lint`
- `npm run agent:improve` — weekly local self-improvement apply step (TASK C6)
- Deploy: Vercel (project to be created — TASK D2); source → GitHub (TASK D1)

## 6. Environment variables (names; values in `.env.local`, never committed)

```
# AI
OPENROUTER_API_KEY            # https://openrouter.ai/settings/keys
OPENROUTER_MODEL              # default anthropic/claude-sonnet-4.5
# Database
NEXT_PUBLIC_SUPABASE_URL      # https://supabase.com/dashboard → project → Settings → API
SUPABASE_SERVICE_ROLE_KEY     # same page (server-only, never NEXT_PUBLIC)
# Cron auth
CRON_SECRET                   # any long random string; set in Vercel env
# Google (agent data sources)
GOOGLE_APPLICATION_CREDENTIALS_JSON   # service-account JSON, one line
GA4_PROPERTY_ID
SEARCH_CONSOLE_SITE_URL       # e.g. sc-domain:arranto.com
# Analytics (client)
NEXT_PUBLIC_GA_MEASUREMENT_ID # G-XXXX
NEXT_PUBLIC_GTM_ID            # GTM-XXXX
NEXT_PUBLIC_GSC_VERIFICATION  # Search Console HTML-tag verification token
# Optional email notify for inquiries
WEB3FORMS_KEY                 # https://web3forms.com (server-side now, not NEXT_PUBLIC)
SITE_URL                      # https://arranto.com
```

## 7. TASKS

Legend: `[ ]` todo · `[x]` done · `[~]` partial · `[HELD]` gated. Track IDs align with `arranto-tracker.md` where they overlap.

### A. Foundation
- [x] A1 `src/lib/env.ts` — typed server env access, fail-fast with clear message, no secret leakage in errors
- [x] A2 `src/lib/rate-limit.ts` — in-memory limiter (adapt smilefotilo), presets: contact 5/hr, chat 10/min, health 5/min
- [x] A3 `src/lib/openrouter.ts` — raw-fetch client: chat + streaming, timeout, error mapping (no key/details leaked to client)
- [x] A4 `src/lib/supabase.ts` — service-role server client (lazy, server-only)
- [x] A5 `next.config.ts` — security headers (CSP, HSTS, X-Frame-Options, etc., adapt smilefotilo), poweredByHeader off
- [x] A6 `.env.example` — all vars above with comment links
- [x] A7 `supabase/migrations/001_init.sql` — inquiries + agent_reports tables, RLS enabled, no public policies; pgvector content_chunks kept commented (D2)

### B. Business logic (core flows)
- [x] B1 `POST /api/contact` — Zod (name/email/message/locale), honeypot silent-discard, rate limit, Supabase insert, optional Web3Forms notify, inline JSON result
- [x] B2 Rewire `TerminalForm.tsx` submit → `/api/contact` (logic only, zero visual change)
- [x] B3 `POST /api/chat` — streaming OpenRouter; system prompt = honesty rules + full site content from `src/content/work.ts` + studio/contact facts; bilingual en/ar; buying-intent → soft `/contact` mention (never first turn); rate limit; never claims in-pilot = live
- [x] B4 `GET /api/health` — cheap health check (rate-limited)
- [x] B5 Fix content gaps blocking logic: WorkGrid fictional-fallback removal (home must show real case studies) — *logic bug, not UI*

### C. Self-improvement agent (backend)
- [x] C1 `src/lib/google-auth.ts` — service-account JWT (RS256, stdlib crypto) → access token
- [x] C2 `src/lib/ga4.ts` — GA4 Data API runReport (sessions, pages, sources, by country)
- [x] C3 `src/lib/gsc.ts` — Search Console query (clicks/impressions/position by query+page), sitemap submit
- [x] C4 `GET /api/cron/agent` — Bearer CRON_SECRET; collect GA4+GSC+health → OpenRouter analysis (problems, opportunities, concrete recommendations) → insert `agent_reports` row; hard timeout, never throws unhandled
- [x] C5 `vercel.json` — cron schedule (daily agent run) — **runs with PC off ✅**
- [x] C6 `scripts/agent-improve.mjs` (`npm run agent:improve`) — weekly local: fetch unprocessed reports → OpenRouter proposes concrete fixes → writes proposals to `reports/agent/` as markdown w/ diffs → owner reviews/applies; marks reports processed
- [x] C7 `GET /api/agent/latest` — owner-only (secret header) view of latest report

### D. Ship
- [~] D1 git init at `site/` done; GitHub repo + push is owner action (run `gh auth` then `git remote add origin … && git push`)
- [ ] D2 Vercel project + env vars + crons live
- [x] D3 GA4 property, GSC verify, GTM container — setup guide with direct links (docs/SETUP.md)
- [ ] D4 smilefotilo.com 301 map + bridge page (change lives in the OTHER repo — documented, not done here)
- [ ] D5 GBP rename to Arranto preserving 118 reviews (manual, documented)

### E. SEO/GEO
- [x] E1 `app/llms.txt/route.ts` + llms-full.txt — honest status content
- [x] E2 JSON-LD verify: Organization (exists in `src/lib/seo.ts`) + per-case-study SoftwareApplication reads `status` from content (never hand-typed)
- [x] E3 FAQ content crawlable (already static via work.ts accordion — verified SSR via build)
- [x] E4 sitemap/robots verify + hreflang (verified — sitemap.xml + robots.txt + alternates with x-default)

### F. Security (cross-cutting; verify at end)
- [x] F1 No secrets client-side (`NEXT_PUBLIC_` audit: only URL/GA/GTM/GSC verification — all public by design)
- [x] F2 Zod at every mutation boundary (contact + chat)
- [x] F3 Rate limiting on every public POST (contact 5/hr, chat 10/min) + cron auth-gated by Bearer token
- [x] F4 Error responses: generic client message, detailed server log only (verified in openrouter, contact, chat, cron, agent)
- [x] F5 `npm audit` — documented exception: postcss advisories in Next.js itself (build-time only, see docs/SETUP.md)
- [~] F6 Security headers in next.config.ts (CSP, HSTS, X-Frame-Options, etc.) — verify on deploy
- [x] F7 No file uploads exist → safe-upload N/A

### G. Docs
- [x] G1 `docs/SETUP.md` — every external setup step with direct copy-paste links (OpenRouter key, Supabase project+SQL, Google Cloud service account + enable GA4 Data API + Search Console API, grant SA access in GA4/GSC, GTM container, Vercel env+cron, GitHub)
- [x] G2 `docs/AGENT.md` — how self-improvement agent works, weekly routine
- [x] G3 Update `site/README.md` + `site/CLAUDE.md` → point here
- [ ] G4 Update `site/docs/arranto-tracker.md` when tracks complete

### HELD (do not build)
- [HELD] TehsilOS anything (scope unconfirmed)
- [HELD] New tools (ZATCA Readiness Checker etc.) — gate: ≥1 live design partner
- [HELD] pgvector RAG (D2 — revisit if content grows past ~50KB)
- [HELD] All visual/UI work (D7 — designer delivering)

## 8. Feasibility answers (owner questions, answered honestly)

1. **"Agent runs while my PC is off?"** YES — Vercel Cron executes `/api/cron/agent` serverless daily. Analysis + reports fully automatic. Only the *apply-code-fixes* step is local+weekly (`npm run agent:improve`) because letting a serverless function edit its own production code is unsafe; proposals land as reviewable markdown/diffs instead.
2. **"Claude Code auto-switches Sonnet→OpenAI→Fable?"** NOT POSSIBLE as described. Claude Code cannot switch itself to OpenAI models mid-task (different vendor; no such routing exists). What exists: `/model` to pick per session; per-subagent `model:` overrides (haiku/sonnet/opus/fable); the *website's* agent uses OpenRouter and can route to any vendor's model per task — that part IS automatic (cheap model for summaries, strong model for analysis).
3. **Analytics stack was unspecified in all strategy docs** — decided: GA4 + GTM + GSC with Consent Mode v2 (default denied), no ad pixels/data brokers (privacy rule).

## 9. Hard rules for any agent working here (from arranto-rules.md)

- Server Components default; `"use client"` only on leaf interactive components.
- CSS logical properties ONLY (`ps-/pe-/ms-/me-/start-/end-`) — never `pl-/pr-/left-/right-`.
- YAGNI · reuse-before-rewrite · native-before-dependency · shortest correct solution · no dead code.
- No fabricated metrics. Citable numbers: 118 reviews, 10+ projects, est. 2017. Status claims read from content `status` field.
- No page repeats product/region/value-prop more than once. Hero/nav/meta: zero region+product names.
- Chatbot must never call in-pilot products "live/production/proven", even under leading questions.
- No CAPTCHA. Honeypot only. No ad pixels.
- Perf gates: FCP ≤1.2s, INP ≤200ms, CLS ≤0.05 mobile; WCAG 2.1 AA.
