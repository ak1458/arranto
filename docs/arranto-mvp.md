# Arranto — MVP Specification

## 1. Scope Boundaries
The MVP is a global, minimal, premium software-studio website: five real case studies, a founder-facing studio page, a contact path, a bilingual (EN/AR) RAG chatbot, and the animation/motion system that carries the brand's "show, don't argue" voice. It explicitly excludes a rebuilt tools suite, a public pricing page, region-marketing pages, and TehsilOS.

## Mandatory Infrastructure Stack
- **Core framework:** Next.js App Router, TypeScript, strict mode on.
- **Localization:** `next-intl`, locales `en` (default) and `ar`, instant client-side locale switch (no full reload), locale persisted in a cookie.
- **Layout engine:** Tailwind CSS, CSS logical properties only (`ps-`, `pe-`, `start-`, `end-`, `ms-`, `me-`) — zero hardcoded `left`/`right`/`pl-`/`pr-` utility classes anywhere in the codebase.
- **Animation core:** GSAP + ScrollTrigger, wired through `@gsap/react`'s `useGSAP` hook for automatic context cleanup.
- **Content:** MDX for case studies (frontmatter: title, slug, one-line outcome, status [`proven` | `in-pilot` | `held`], stack tags, FAQ array), plain JSON/TS objects for short UI strings.
- **Data:** Supabase Postgres — one `inquiries` table (contact form), one `content_chunks` table with a `pgvector` column (chatbot retrieval index, populated by a build-time embedding script over the MDX content).
- **Chatbot runtime:** Vercel AI SDK, Anthropic API (Claude), server-side route only — the API key never reaches the client.
- **Hosting:** Vercel, edge middleware for locale detection/redirect on first visit only (cookie overrides after that).

## 2. Key Layouts & Interactive Components

### A. Hero (Home)
Full-viewport, dark, minimal. Headline ("Start to running. Nothing left undone.") entrance-animates via GSAP on load — a subtle motion signature, not a multi-second cinematic sequence. No product names, no region names, no marquee of client logos or tech stack in the hero itself (that detail, if shown at all, lives lower on the page or on `/studio`, per Brand Strategy v3's "one idea per page" rule).

### B. Navigation
Desktop: three items — `Work`, `Studio`, `Contact` — plus the locale switcher (`EN`/`AR`) and a subtle external link icon for "Tools" pointing to smilefotilo.com. No hamburger overlay, no numbered chapter nav carried over from the old blueprint (that structure implied a much larger site than this one actually is; a three-item nav is itself a premium signal — it says the studio doesn't need to pad its own menu).
Mobile: same three items plus locale switcher, collapsed into a minimal top bar (not a persistent bottom app-style tab bar — that pattern reads as a consumer app, not a software studio; a simple top nav that hides on scroll-down and reveals on scroll-up is closer to the Apple/Rolex reference standard).

### C. Work Grid (`/work`)
A single, unsegmented grid of five tiles (image/motion thumbnail, project name, one-line outcome). No filter pills, no category grouping by region or product type — sorting is by recency only, or manually curated order. Hover state: subtle scale + reveal of the outcome line via GSAP, not a full card flip or heavy transition.

### D. Case Study Detail (`/work/[slug]`)
Header (name, one-line outcome, status badge only for the two in-pilot items), a short visual/media block, and — the one piece of progressive disclosure on the whole site — a collapsed **"Details"** accordion containing the FAQ array from the MDX frontmatter (e.g., for ZATCA: "does this require ZATCA accreditation," "what does CCSID onboarding involve"). Collapsed by default. This is where the technical depth Positioning Strategy v3 wants "one click deep" actually lives, without adding visible page weight for a visitor who doesn't open it.

### E. Chatbot
A minimal launcher (bottom corner, low-contrast until hovered — not a bright, attention-grabbing bubble). Opens to a short, open-ended prompt ("What are you working on?" / "على ماذا تعمل؟"), not a product-branching menu. Answers are retrieval-grounded in the case-study MDX and FAQ content; the system prompt explicitly forbids claiming any in-pilot product as finished or production-proven.

### F. Contact
Three fields only: name, email, what you're building. A honeypot field for spam protection. No product-selection dropdown, no budget field, no qualifying script — that branching logic belongs to the private outreach flow (Outreach Strategy), not the public form.

## 3. Localization & RTL Specifications
- `dir="rtl"` set at the `<html>` level for the `ar` locale, not on individual elements.
- All directional icons (nav chevrons, accordion carets, hover arrows) mirrored via `rtl:rotate-180` or equivalent, never left to automatic CSS mirroring alone.
- Arabic typography swaps Fraunces for Noto Serif Arabic at the theme level to prevent clipping.
- Locale switch re-renders the current route in the new locale with no full page reload; the switch itself animates as a simple crossfade, not a page transition.

## 4. Explicitly Out of Scope for MVP
- Live GitHub API sync for case-study metadata (static MDX is sufficient and more reliable).
- A CMS admin UI — content edits happen by editing MDX files directly, appropriate for a solo-maintained site.
- Public pricing page, `/products` top-level route, `/locations` marketing pages, `/tools` rebuild — see `arranto-app-flow.md`.
- TehsilOS in any form.
