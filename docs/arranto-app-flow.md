# Arranto — App Flow & Routing Matrix

## What this supersedes
The original `gemini-code` App Flow kept the old Smile Fotilo structure almost exactly (Services/Work/Tools/Pricing/About, a rebuilt Tool Engine, Gonda/Noida/Lucknow location pages). Website Blueprint v2 partially corrected this but still carried a `/products` top-level route and a `/pricing` page. This document is the final, current sitemap — it supersedes both prior versions.

## 1. Sitemap

```
/{locale}                          en | ar
│
├── /                              Home — hero, work teaser, studio teaser, contact band
│
├── /work                          Portfolio index — unsegmented grid, 5 tiles
│     ├── /work/pulsekart
│     ├── /work/orderflow
│     ├── /work/veloria-vault
│     ├── /work/zatca-compliance-engine
│     └── /work/sanad-os
│                                  (tehsil-os excluded — no route until scope confirmed)
│
├── /studio                        Founder/studio page — three-line About block
│
├── /contact                       Minimal form (name, email, what you're building)
│
├── /legal/privacy
├── /legal/terms
│
└── Footer-only, no nav entry:
      External link → smilefotilo.com (free tools, labeled "Tools ↗")
      Legacy bridge → smilefotilo.com root (301-redirected old URL structure)
```

**Explicitly removed from the sitemap, with reasons:**
- `/products` (top-level) — products are proof, not brand identity; folded into `/work` per Positioning Strategy v3.
- `/tools` — not rebuilt this phase; external link only, per Platform Strategy v2.
- `/pricing` (public) — pricing is a private-conversation detail, not public brand-layer content, per Brand Strategy v3.
- `/locations` (Gonda/Noida/Lucknow marketing pages) — regional marketing pages contradict the global brand-layer rule; local SEO signal (NAP, GBP) is preserved via `Organization`/`LocalBusiness` schema.org markup and the footer address, not a dedicated nav-visible page.

## 2. Global Navigation
**Desktop:** `Work` · `Studio` · `Contact` — plus locale switcher (`EN`/`AR`) and a small external-link icon to Tools. No numbered chapter navigation, no hamburger overlay.
**Mobile:** identical three items in a top bar that hides on scroll-down, reveals on scroll-up — not a persistent bottom tab bar (that pattern was carried over from the old blueprint and reads as a consumer app rather than a studio site; dropped here).

## 3. Core Interactive Task Sequences

### A. Contact Submission
1. Visitor reaches `/contact` directly or via the homepage contact band CTA.
2. Form renders three fields (name, email, message) plus a hidden honeypot field.
3. On submit: client-side validation (required fields, email format) → server action writes to Supabase `inquiries` table → rate-limit check (max 5/hour/IP) → success state replaces the form with a short confirmation, no redirect.
4. Bot/honeypot submissions are silently discarded server-side; the visitor sees a normal success state either way (never reveal spam-detection logic to the submitter).

### B. Chatbot Conversation
1. Visitor opens the chatbot launcher (available on all pages, low-contrast until hovered).
2. Opening message is short and open-ended, language-matched to the current site locale but able to switch if the visitor types in the other language.
3. Each visitor message → server route → retrieval step (query the `content_chunks` pgvector table for relevant MDX/FAQ content) → Claude call via Vercel AI SDK with retrieved context injected into the system/user turn → streamed response back to the client.
4. If the visitor's message signals buying intent (mentions their own business, a deadline, "pilot," "price," etc.), the bot's response includes a soft handoff: a link to `/contact`, not a form embedded in the chat itself.
5. If a question falls outside the retrieval content (e.g., unrelated general knowledge), the bot declines briefly and redirects to what it can help with — it never fabricates an answer about Arranto's products.

### C. Case Study Navigation
1. Visitor lands on `/work`, sees five tiles in an unsegmented grid.
2. Hover (desktop) or tap (mobile) reveals the one-line outcome via a subtle GSAP scale/opacity transition.
3. Click navigates to `/work/[slug]`. Page renders header, media, and a collapsed "Details" accordion.
4. Opening the accordion (client-side, GSAP height/opacity transition) reveals the FAQ content sourced from that case study's MDX frontmatter — the only place deeper technical/regulatory detail appears.

### D. Language Switch
1. Visitor clicks `EN`/`AR` in the nav.
2. Client-side locale change via `next-intl` — current route re-resolves to its `/ar/*` or `/en/*` equivalent (e.g., `/en/work/sanad-os` ↔ `/ar/work/sanad-os`), no full reload.
3. Document `dir` attribute updates in the same transition; a short crossfade (not a page-transition animation) softens the swap.
4. Locale choice is written to a cookie so a returning visit skips the `Accept-Language` detection step.

### E. Tools Link-Out
1. Visitor clicks the footer/nav "Tools ↗" link.
2. Opens smilefotilo.com in a new tab (external link, `rel="noopener noreferrer"`) — no in-site iframe embedding, no attempt to reskin the legacy tools inside the Arranto shell.

## 4. Legacy Bridge (unchanged from Implementation Plan)
smilefotilo.com stays live. All old Smile Fotilo URLs 301-redirect to their nearest Arranto equivalent per the existing redirect matrix (see `arranto-implementation-plan.md`, Track 4). The legacy domain's root becomes a short bridge page pointing to arranto.com, and continues to host the free tools referenced above.

## Caveats
- The `/work/tehsil-os` route and its nav/footer references are intentionally absent from every diagram in this document — adding it before scope confirmation would require re-touching this file, the schema, and the tracker simultaneously; better to add once, correctly, when ready.
