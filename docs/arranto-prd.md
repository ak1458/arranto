# Arranto — Product Requirements Document (PRD)

## 1. Business Objectives
Move market perception from "local web-development shop" to "premium, global, founder-led AI software studio." Success is judged by whether a visitor from any region — India, Gulf, Europe, US, UK — reads the site as belonging to a global-caliber studio, not a regional one, and whether the two in-pilot products (ZATCA Compliance Engine, SanadOS) convert at least one design-partner pilot each in Saudi Arabia within the outreach window defined in Outreach Strategy v2.

## 2. Target Personas (internal targeting — never surfaced as region-specific site copy)
| Segment | Persona | What they need from the site | Where they enter |
|---|---|---|---|
| Saudi SME (ZATCA) | Finance/ops lead facing a wave deadline | Proof the engineering is real and specific, reachable fast | Direct outreach email → `/work/zatca-compliance-engine` |
| Gulf operator (SanadOS) | Facilities/ops manager | Proof the system replaces their spreadsheet chaos | Direct outreach email → `/work/sanad-os` |
| Global founder/SMB | Founder needing a working system, not a slide deck | General credibility, fast proof of range | Organic/LinkedIn → `/` → `/work` |
| Existing India base | Referral or repeat client | Continuity from Smile Fotilo, confidence in the rebrand | Direct/referral → `/` → `/studio` |

The site itself never labels these personas or regions in visible copy — this table exists to guide content and QA, not to appear as page content, consistent with Positioning Strategy v3's brand/proof/outreach split.

## 3. Functional Requirements

### Animation & Motion (REQ-001 to REQ-004)
- **REQ-001:** GSAP ScrollTrigger drives all scroll-tied motion; no motion library duplication (no Framer Motion running alongside GSAP for the same elements — pick one per interaction to avoid conflicting animation engines).
- **REQ-002:** All GSAP instances initialize inside `useGSAP` with automatic cleanup on unmount — no raw `useEffect` + manual `gsap.context` boilerplate.
- **REQ-003:** Every animated element respects `prefers-reduced-motion`; the reduced-motion path is a real fallback (simple opacity fade), not a broken/skipped state.
- **REQ-004:** Hero entrance and hover/reveal micro-interactions run at a target 60fps on a mid-tier mobile device (verify against a real device or throttled DevTools profile, not desktop-only).

### Internationalization (REQ-005 to REQ-008)
- **REQ-005:** `next-intl` routing serves `/en/*` and `/ar/*`; default locale is `en`, detected once on first visit via `Accept-Language`, then cookie-persisted.
- **REQ-006:** Arabic locale sets `dir="rtl"` at the document root; all spacing/positioning uses CSS logical properties exclusively.
- **REQ-007:** Locale switch is instant (client-side re-render), with no full-page reload and no layout flash.
- **REQ-008:** All directional UI (chevrons, carets, hover arrows) is programmatically mirrored per locale, verified by manual RTL QA pass, not assumed from automatic CSS mirroring.

### Chatbot (REQ-009 to REQ-013)
- **REQ-009:** Chatbot responses are retrieval-grounded in the site's own MDX case-study and FAQ content only — no open-ended general knowledge answers about unrelated topics.
- **REQ-010:** Chatbot operates bilingually; it detects or asks the visitor's preferred language and responds in kind, independent of the page's current locale setting.
- **REQ-011:** System prompt explicitly forbids describing ZATCA Compliance Engine or SanadOS as "live," "in production," or "proven" — the honest status (`in pilot`) is enforced at the prompt level, not left to the model's judgment alone.
- **REQ-012:** Chatbot offers a handoff to the `/contact` form only after the visitor shows explicit buying intent (asks about their own timeline, business, or a pilot) — it does not push contact capture on the opening turn.
- **REQ-013:** The Anthropic API key is never exposed client-side; all chatbot calls route through a server action or API route.

### Contact & Data (REQ-014 to REQ-016)
- **REQ-014:** Contact form captures name, email, message, locale, and timestamp into the Supabase `inquiries` table; a honeypot field silently discards bot submissions without erroring visibly to the user.
- **REQ-015:** Form submission is rate-limited per IP (e.g., 5 submissions/hour) to prevent abuse without requiring a CAPTCHA that would hurt the premium feel.
- **REQ-016:** No personal data is logged to third-party analytics beyond what's strictly needed for aggregate traffic reporting; no data broker or ad-pixel integrations.

### Content & Case Studies (REQ-017 to REQ-019)
- **REQ-017:** Each case study is a single MDX file with a defined frontmatter schema (see `arranto-schema.md`) — title, slug, one-line outcome, status, stack tags, optional FAQ array.
- **REQ-018:** TehsilOS has no route, no MDX file, and no chatbot content until scope is confirmed — attempting to build any of these before confirmation is a spec violation, not a judgment call left to the implementer.
- **REQ-019:** No page repeats a product name, region name, or value proposition more than once — enforced as a content-review checklist item before any page ships (full list in `arranto-rules.md`).

## 4. Non-Functional Requirements

### Performance
- Core Web Vitals: FCP ≤ 1.2s, INP ≤ 200ms, CLS ≤ 0.05, measured on a throttled mobile profile, not desktop-only.
- Hero frame sequences (if used instead of/alongside CSS-driven motion) capped at 60 frames on mobile viewports, WebP format, lazy-decoded.
- Total JS payload for the homepage under a reasonable budget for a marketing site (target: under 250KB gzipped excluding the chatbot chunk, which loads on interaction, not on initial page load).

### Accessibility
- WCAG 2.1 AA baseline: sufficient color contrast against the dark theme (verify Signal Gold on Ink meets AA for text use, not just decorative use), full keyboard navigation for nav/accordion/chatbot/contact form, visible focus states.
- All motion respects `prefers-reduced-motion` (see REQ-003).

### SEO/GEO
- Full keyword and GEO mechanics live in `arranto-seo-plan.md` — this PRD requires only that the technical scaffolding (schema.org markup, `hreflang`, `llms.txt`, semantic HTML) is present at launch, not retrofitted later.
- `hreflang` tags correctly pair `/en/*` and `/ar/*` equivalents.

### Security
- All environment secrets (Anthropic API key, Supabase service role key) live server-side only, never in client bundles.
- Supabase row-level security enabled on the `inquiries` table; only server-side service role can write, no public insert policy left open.

## 5. Success Metrics
- Zero region/product names in homepage hero, nav labels, or meta title/description (binary QA check).
- Chatbot answers at least 90% of a test set of real ZATCA/SanadOS questions correctly and honestly (manual QA against `arranto-rules.md`'s honesty rules before launch).
- Core Web Vitals thresholds met on production, verified via Lighthouse/PageSpeed Insights on mobile.
- At least one design-partner pilot per in-pilot product, per Outreach Strategy v2's own success criteria (tracked outside this document, referenced here for completeness).
