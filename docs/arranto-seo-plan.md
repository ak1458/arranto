# Arranto — SEO & GEO Plan

## Principle
Target specific, outcome-named, real-buying-intent terms per product — never generic "AI agency" or "AI automation" terms, which are both highly competitive and low-intent (confirmed in Positioning Strategy). Every page's primary keyword should map to a real, current search behind an actual buyer decision, not a category label.

## Keyword map by product

**ZATCA Compliance Engine**
- Primary: "ZATCA Phase 2 compliance software," "ZATCA e-invoicing solution"
- Secondary: "CCSID onboarding," "ZATCA API integration," "real-time invoice clearance Saudi Arabia," "ZATCA compliant invoicing for SMEs"
- Long-tail/GEO (question-form, answer-engine-friendly): "does ZATCA require accreditation," "how does ZATCA Phase 2 clearance work," "ZATCA penalty for non-compliance"

**SanadOS**
- Primary: "facilities management software Gulf," "CMMS Saudi Arabia"
- Secondary: "AI operations platform GCC," "asset tracking software Gulf," "maintenance management software Saudi Arabia"
- Long-tail: "facilities management software vs spreadsheets," "best CMMS for small Gulf operators"

**TehsilOS**
- Hold all keyword work until scope is confirmed — publishing content for an undefined product either ranks for the wrong intent or has to be rewritten once scope lands, both a waste of the first-mover window.

**Studio-level (About/Home)**
- "founder-led software studio," "AI-augmented development studio," "solo software studio Gulf clients" — lower volume, but matches exactly the positioning this brand is built on, so worth owning even at modest search volume.

## GEO (generative-engine optimization) mechanics
AI answer engines (ChatGPT, Perplexity, Google AI Overviews) cite structured, specific, technical content over vague marketing copy. Practical implementation:
- `llms.txt` and `llms-full.txt` at the site root, listing the three products, their real technical components, and the honest "in build / design partner" status — so an AI summarizing "ZATCA compliance vendors" has accurate, citable structured text to draw from.
- Schema.org `Organization` and `Product`/`SoftwareApplication` markup per product page, with accurate `aggregateRating` tied to the real 118-review figure (studio-level, not per-product, until each product earns its own reviews).
- The build-in-public LinkedIn technical posts (Platform Strategy) double as GEO fuel when the same technical detail also lives as static page content — write it once, publish in both places.
- The chatbot's own FAQ answers should be mirrored as static, crawlable FAQ page content — an AI crawler can't cite a chat conversation, but it can cite a public FAQ page with the same information.

## Technical SEO baseline
- Core Web Vitals targets: FCP ≤ 1.2s, INP ≤ 200ms, CLS ≤ 0.05 — non-negotiable given GSAP/animation weight; enforce via the mobile-performance rules in the Website Blueprint (capped frame counts, `prefers-reduced-motion` fallback).
- `hreflang` tags for `/en` and `/ar` (and future locales as they launch), so Arabic content is served to Arabic-language searchers correctly rather than competing with the English page.
- Canonical tags and clean 301 mapping from smilefotilo.com per the existing redirect matrix — protects existing domain authority instead of starting from zero.

## Content cadence
- 1 technical/build-in-public piece per product per month minimum, timed with actual product progress — don't manufacture content ahead of real work.
- FAQ pages updated as real design-partner questions come in — the most authentic, highest-intent content source available, and free.

## Caveats
- Exact search volumes for the Gulf-specific terms above weren't independently pulled with a keyword tool in this pass — run them through Semrush (already connected) before finalizing content priority order.
- TehsilOS section is intentionally blank pending scope confirmation, consistent with all other documents in this set.
