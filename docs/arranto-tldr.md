# Arranto — Project TLDR

## What this document supersedes
This replaces the original `gemini-code-*` TLDR. That version described Arranto as a Gulf-focused compliance studio with a four-service nav (Autopilot / Product Builds / Web Development / Growth SEO), a rebuilt Tools Engine, and India-specific location pages. All of that has been corrected across the strategy documents (Positioning v3, Brand v3, Website Blueprint v2, Website Content v2) and this file, along with the seven documents below it, is the engineering-facing translation of those corrections into something buildable.

## Context & Vision
Arranto is the rebrand of Smile Fotilo, founded 2017 in Gonda, Uttar Pradesh. The studio is founder-led, AI-augmented, and moving from local web-development work into building software as a global, premium AI software studio — not a regional one.

Three real products are currently in build, aimed initially at Gulf buyers:
1. **ZATCA Compliance Engine** — e-invoicing, CCSID onboarding, cryptographic stamping, real-time clearance, for Saudi VAT-registered SMEs.
2. **SanadOS** — facilities/operations management for Gulf operators.
3. **TehsilOS** — scope not yet confirmed; excluded from all public-facing build work until confirmed.

**The critical distinction driving this entire document set:** these three products are *proof of capability*, not the brand's identity. The public website never leads with "Gulf" or "ZATCA" — those live one click deep, on `/work`, as evidence. The brand-facing surface (homepage, nav, meta, chatbot's opening line) reads as a global, minimal, premium software studio, full stop. Outreach emails to Saudi prospects can and should reference ZATCA directly — that's a private, targeted surface with a different, correct standard. The public site is judged by a different, universal standard: could an Apple or Rolex-caliber visitor from any region respect this page.

## Brand & Design Direction
- Palette: Ink (`#1C1B2E`), Signal Gold (`#C9862E`), Paper (`#F5F2ED`), Muted (`#6B6875`) — already finalized, unchanged.
- Typography: Fraunces (display, LTR locales) / Noto Serif Arabic (display, Arabic locale).
- Theme: dark-only. No light mode, no `prefers-color-scheme` override.
- Tagline: "Start to running. Nothing left undone."
- Voice: minimal, show-don't-argue, one idea per page, no repeated claims within a page (full rules in `arranto-rules.md`).

## Technical Core
- **Framework:** Next.js App Router + TypeScript.
- **i18n:** `next-intl`, locales `en` and `ar`, `dir="rtl"` at the document root for Arabic, CSS logical properties throughout (no hardcoded `left`/`right`).
- **Animation:** GSAP + ScrollTrigger via `@gsap/react`'s `useGSAP` hook, mobile-capped frame sequences, `prefers-reduced-motion` respected.
- **Content:** static-first — case studies and copy live as MDX/JSON in the repo, not a live database or a live GitHub API sync.
- **Data layer:** Supabase (Postgres) for the contact/lead table and a `pgvector` table powering the chatbot's retrieval index. No Prisma, no separate ORM — plain SQL/Supabase client, chosen deliberately to avoid an unnecessary layer for a single-studio site's data needs.
- **Chatbot:** Claude via the Anthropic API, called through the Vercel AI SDK from a server route, retrieval-augmented over the site's own case-study and FAQ content, bilingual (EN/AR).
- **Hosting:** Vercel.

## Deliverables Matrix
- **5 real case studies on `/work`:** PulseKart, OrderFlow, Veloria Vault (proven), ZATCA Compliance Engine, SanadOS (in pilot). TehsilOS added once scoped.
- **Core pages:** Home, Work (index + 5 detail pages), Studio, Contact, Legal (Privacy/Terms).
- **Chatbot:** bilingual, RAG-scoped to site content only, honest about pilot status.
- **Legacy bridge:** smilefotilo.com stays live, 301-redirects the old URL structure, and hosts the free tools — Arranto links out to them rather than rebuilding them this phase.
- **No `/products` top-level nav, no `/tools` rebuild, no public `/pricing` page, no `/locations` marketing pages** — all explicitly excluded from this phase; see `arranto-app-flow.md` for the full sitemap and rationale per exclusion.

## Explicitly Out of Scope (This Phase)
- TehsilOS (any page, copy, or backend work) — blocked on scope confirmation.
- Rebuilding the old Smile Fotilo tools (Website Audit, SEO Engine, Brand Kit, Calendar, Doc Intel, Factory) — see `arranto-future-tools.md`.
- European or US market pages/content — blocked on the phase gates in Positioning Strategy v3.
- A live database-driven CMS for case studies — static content is sufficient at this scale and avoids unnecessary infrastructure.
