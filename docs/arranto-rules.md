# Arranto — Architectural Rules & Development Standards

## 1. Next.js App Router & Component Rules
- **Rule 001:** Server Components by default. Add `"use client"` only to the specific leaf component that needs interactivity (animation, form input, chatbot) — never to a layout or page file as a shortcut.
- **Rule 002:** Interactivity is isolated into small, dedicated client components (e.g., `HeroAnimation`, `WorkTileHover`, `ChatbotWidget`) so parent layouts stay server-rendered and light.
- **Rule 003:** Data mutations (contact form, chatbot) go through Server Actions or Route Handlers with Zod validation at the boundary — never trust client input directly.

## 2. GSAP Animation & Memory Safety
- **Rule 004:** Every GSAP instance initializes inside `useGSAP` (from `@gsap/react`), not a raw `useEffect` + manual `gsap.context`. `useGSAP` handles cleanup automatically:
  ```tsx
  import { useGSAP } from '@gsap/react';
  import { gsap } from 'gsap';
  import { useRef } from 'react';

  export function HeroAnimation() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      gsap.from('.hero-headline', { opacity: 0, y: 24, duration: 0.8 });
    }, { scope: container });

    return <div ref={container}>...</div>;
  }
  ```
- **Rule 005:** `will-change: transform` (or `opacity`) is applied only while an element is actively animating and removed afterward — never left on permanently.
- **Rule 006:** Every animated component reads `prefers-reduced-motion` and provides a real fallback (simple fade or static state), not a skipped/broken one.
- **Rule 007:** No two animation libraries drive the same element. GSAP is the single motion engine for this project.

## 3. Localization & RTL
- **Rule 008:** No hardcoded directional classes (`pl-`, `pr-`, `left-`, `right-`) anywhere in the codebase — logical properties only (`ps-`, `pe-`, `start-`, `end-`). Enforced by CI, not just review (see Implementation Plan TSK-105).
- **Rule 009:** Directional icons (chevrons, carets, arrows) are mirrored per locale via explicit utility classes (`rtl:rotate-180`), never assumed from automatic browser RTL handling.
- **Rule 010:** `dir` is set once, at the document root, per locale — never overridden per-component.

## 4. Content & Brand-Voice Rules (enforced as code review, not just copywriting guidance)
- **Rule 011:** No page repeats a product name, region name, or value proposition more than once. If a reviewer finds "ZATCA," "Gulf," "Saudi," or a product name appearing twice on the same rendered page (outside `/work/[slug]` detail content, where the product's own name naturally recurs in its own page), the page fails content review.
- **Rule 012:** Homepage hero, global nav labels, and the site's meta title/description contain zero region names and zero individual product names — this is a build-blocking check, not a style preference.
- **Rule 013:** No self-descriptive category claims in visible copy ("we are a premium AI software studio," "we are founder-led"). State facts once, plainly ("Founded 2017." "One engineer."); let design and motion carry the rest.
- **Rule 014:** Every claim about a product's status must match its MDX `status` field exactly (`proven` / `in-pilot` / `held`) — copy, chatbot answers, and schema.org markup all read from this single field, never a hand-typed claim that could drift out of sync.

## 5. Trust & Data Integrity
- **Rule 015:** No fabricated metrics, testimonials, or claims of production use for any in-pilot product. Every number shown (118 reviews, 10+ projects) must tie to a real, checkable source.
- **Rule 016:** The chatbot's system prompt enforces the same honesty constraint as Rule 015 at the model level — it must decline to claim "live"/"production"/"proven" status for anything marked `in-pilot` or `held`, even if a visitor phrases a leading question that invites that claim.
- **Rule 017:** TehsilOS gets no route, no content, no chatbot knowledge, and no schema.org entry until scope is explicitly confirmed. This is a hard gate, not a placeholder-and-fill-later pattern.

## 6. Code Style & Minimalism
The standard here is a lazy, senior engineer's instinct: the best code is the code that didn't need to be written. Concretely:
- **Rule 018 (YAGNI):** Before adding a component, dependency, or abstraction, ask whether the current requirement actually needs it. Speculative flexibility for a future that isn't scoped yet is not built now.
- **Rule 019 (Reuse before rewrite):** Check for an existing component, hook, or utility in the codebase before writing a new one. A second date-formatting helper or a second card component is a review-blocking duplicate, not a stylistic choice.
- **Rule 020 (Native/stdlib before dependency):** Prefer a native platform feature or a already-installed dependency over adding a new package. A new npm dependency needs a one-line justification in the PR description explaining why the existing stack can't do it.
- **Rule 021 (Shortest correct solution):** Once something needs to exist, write the smallest version that actually works and reads clearly — not the most abstracted or "future-proof" version. A 20-line component that clearly does one thing beats a 90-line one with configurable props nobody asked for.
- **Rule 022 (File size as a smell):** A component file crossing roughly 200–250 lines is a signal to extract, not a hard limit to hit — but crossing it without extracting anything is a review flag.
- **Rule 023 (Readable by an intern):** Naming, structure, and comments should make a component's purpose obvious to someone joining the project cold. Clever one-liners that save two lines at the cost of clarity are not the goal — clarity is the goal, brevity is the by-product of not over-building, not a target in itself.
- **Rule 024 (No dead code):** No commented-out blocks, no unused props, no speculative feature flags for features that don't exist yet.

## 7. Accessibility & Security
- **Rule 025:** WCAG 2.1 AA baseline — verified color contrast (Signal Gold on Ink for text use specifically, not just decorative use), full keyboard navigation, visible focus states on every interactive element including the chatbot launcher and FAQ accordion.
- **Rule 026:** Anthropic API key and Supabase service role key exist only in server-side environment variables — never referenced in a client component or exposed in a bundled file.
- **Rule 027:** Supabase RLS is enabled on every table; no public insert/read policy is left open. All writes route through server actions using the service role.
- **Rule 028:** Contact form is rate-limited and honeypot-protected without a CAPTCHA — a CAPTCHA is a worse experience for a premium brand than the small residual spam risk it prevents at this scale.

## Caveats
- Rule 022's line-count figure is a smell, not a lint-enforced hard cap — use judgment; a genuinely simple, flat component that happens to run to 260 lines isn't automatically wrong.
- Rules 011–014 apply to brand-layer and proof-layer pages; private outreach copy (emails, pitch decks) is a different surface and follows Outreach Strategy v2 instead.
