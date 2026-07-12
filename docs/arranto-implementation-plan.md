# Arranto — Implementation Plan

## What this supersedes
Replaces the original `gemini-code` implementation plan (which built toward the Prisma schema, live GitHub sync, Tool Engine, and four-service nav). Tracks below build toward the corrected MVP, PRD, App Flow, and Schema documents in this set.

## Track 1 — Infrastructure, i18n, Base Layout
- **1.1** Initialize Next.js App Router project with TypeScript, strict mode, ESLint + Prettier configured from the start (not added later).
- **1.2** Install and configure `next-intl`: locale routing for `en`/`ar`, middleware for first-visit `Accept-Language` detection, cookie persistence for return visits.
- **1.3** Build the root layout shell reading locale and setting `dir`:
  ```tsx
  // app/[locale]/layout.tsx
  export default function RootLayout({ children, params: { locale } }: Props) {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    return (
      <html lang={locale} dir={dir}>
        <body>{children}</body>
      </html>
    );
  }
  ```
- **1.4** Configure Tailwind theme tokens for Ink/Signal Gold/Paper/Muted, dark-only (no `dark:` variant needed since there's only one theme — the palette *is* the default).
- **1.5** Configure Tailwind to use logical-property utilities project-wide; add an ESLint rule or a simple grep-based CI check that fails the build if `pl-`, `pr-`, `left-`, or `right-` utility classes appear (enforces PRD REQ-006/REQ-008 automatically rather than relying on manual review alone).

## Track 2 — Content & Case Studies
- **2.1** Write the Zod frontmatter schema (`content/work.schema.ts`) matching the contract in `arranto-schema.md`.
- **2.2** Write the five case-study MDX files (`pulsekart`, `orderflow`, `veloria-vault`, `zatca-compliance-engine`, `sanad-os`) in both `en` and `ar`, sourcing copy from `arranto-website-content-v2.md`.
- **2.3** Build the `/work` index page: reads all validated MDX frontmatter, sorts by `order`, renders the unsegmented grid.
- **2.4** Build the `/work/[slug]` detail page: header, media block, collapsed FAQ accordion (GSAP height/opacity transition on open).
- **2.5** Write `/studio`, `/contact` (UI only, no backend yet), `/legal/privacy`, `/legal/terms` as static pages.

## Track 3 — Data Layer & Contact
- **3.1** Provision the Supabase project; run the SQL DDL from `arranto-schema.md` (`inquiries`, `content_chunks`, `vector` extension, RLS policies).
- **3.2** Build the `/contact` server action: validation, honeypot check, rate-limit check (simple IP-based counter, e.g., via a Supabase table or Vercel Edge Config — pick whichever avoids adding a new service), insert into `inquiries`, return success/error state to the client.
- **3.3** QA: submit real and honeypot-triggering test submissions; confirm rate-limit behavior and RLS (no public read/insert path works from the client directly).

## Track 4 — Chatbot / RAG
- **4.1** Write `scripts/embed-content.ts`: reads all MDX files (body + FAQ entries), chunks text, calls the embeddings endpoint, upserts into `content_chunks`.
- **4.2** Build the chatbot server route: receives a visitor message + locale, embeds the query, retrieves top-N matching chunks via cosine similarity, constructs the Claude API call (system prompt enforcing PRD REQ-011's honesty constraint), streams the response via Vercel AI SDK.
- **4.3** Build the chatbot UI component: minimal launcher, open state, streaming message rendering, bilingual input handling.
- **4.4** Write and run a QA test set (~20 real questions per in-pilot product) against the chatbot; confirm it never claims "live"/"production"/"proven" status for ZATCA Compliance Engine or SanadOS, and that it declines gracefully on out-of-scope questions.

## Track 5 — Animation & Motion Polish
- **5.1** Install GSAP + `@gsap/react`; build the hero entrance animation using `useGSAP`.
- **5.2** Build hover/reveal micro-interactions for `/work` tiles.
- **5.3** Build the FAQ accordion open/close transition.
- **5.4** Implement `prefers-reduced-motion` fallback paths for every animated component built above.
- **5.5** Mobile performance pass: profile on a throttled/real mid-tier device, confirm 60fps target on hero and hover interactions, confirm no layout shift from animation (CLS ≤ 0.05).

## Track 6 — Legacy Migration & Redirects
- **6.1** Build the smilefotilo.com bridge page (short, points to arranto.com, retains the free tools).
- **6.2** Implement the 301 redirect matrix (existing map from the original implementation plan, verified against the corrected sitemap — several old redirect targets need updating since `/products`, `/pricing`, `/locations`, and `/tools` no longer exist as Arranto routes; redirect those old URLs to their nearest equivalent, i.e. old `/pricing` → `/contact`, old `/locations/*` → `/studio`).
- **6.3** Update Google Business Profile title to "Arranto," preserving the existing 118 reviews.

## Track 7 — SEO/GEO & Launch QA
- **7.1** Implement `Organization` and per-case-study `SoftwareApplication`/`CreativeWork` schema.org markup, `hreflang` pairing for `en`/`ar`, `llms.txt`/`llms-full.txt` at the root (content per `arranto-seo-plan.md`).
- **7.2** Run Lighthouse/PageSpeed on production build (mobile profile); confirm Core Web Vitals thresholds from the PRD.
- **7.3** Full RTL manual QA pass: every page, every directional icon, in Arabic.
- **7.4** Content QA against Brand Strategy v3 and Rules: no page repeats a claim, region, or product name more than once; homepage/nav/meta contain zero region or product names.
- **7.5** Launch.

## Caveats
- Track 4's embedding-model choice (and its output dimension) needs to be locked before Step 3.1's `vector()` column width is finalized in the actual migration file.
- TehsilOS has no track — add one only after scope confirmation, following the same pattern as Tracks 2–4 for the other two in-pilot products.
