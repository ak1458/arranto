# Arranto — Schema

## What this supersedes
The original `gemini-code` schema was a full Prisma model covering `OperationalLead`, `GitHubRepositoryCache`, and `ToolUsageMetric`. Website Blueprint v2 already rejected the Prisma layer and the live GitHub sync as unnecessary for a single-studio, static-content site. This document is the actual, minimal schema that replaces it — content lives in the repo as MDX, and the database holds only what genuinely needs to be dynamic: inquiries and the chatbot's retrieval index.

## 1. Content Model (MDX, not database)
Each case study is one MDX file at `content/work/{locale}/{slug}.mdx` with the following frontmatter contract:

```yaml
---
slug: "zatca-compliance-engine"
title: "ZATCA Compliance Engine"
outcome: "Real-time e-invoice clearance."          # one line, used on /work tiles
status: "in-pilot"                                  # "proven" | "in-pilot" | "held"
stack: ["Next.js", "Node", "XML/Crypto"]
order: 4                                            # manual curation order for /work grid
faq:
  - q: "Does this require ZATCA accreditation?"
    a: "No — ZATCA does not require accreditation to use a compliant solution. The choice is who builds and maintains it."
  - q: "What does CCSID onboarding involve?"
    a: "Cryptographic certificate onboarding that authenticates the business to ZATCA's clearance network before invoices can be stamped and cleared in real time."
---

Body content (short, one paragraph max, rendered on the detail page above the accordion).
```

**Validation:** a Zod schema validates this frontmatter at build time (`content/work.schema.ts`) — a build fails loudly if a required field is missing or `status` isn't one of the three allowed values, rather than shipping a broken or dishonest status label.

**Why MDX and not a database:** five to six case studies, edited by one person, changing infrequently, is exactly the case where a CMS or DB-backed content model adds a layer of operational complexity (migrations, admin UI, another system to keep running) without a real corresponding benefit. Editing a file directly is faster and harder to get wrong.

## 2. Supabase Postgres Schema (SQL DDL, no ORM)

```sql
-- Contact form submissions
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  locale text not null default 'en' check (locale in ('en', 'ar')),
  status text not null default 'new' check (status in ('new', 'read', 'archived'))
);

create index inquiries_created_at_idx on inquiries (created_at desc);

-- Row-level security: no public read/insert policy.
-- Writes happen only via the server-side service role from the contact server action.
alter table inquiries enable row level security;

-- Chatbot retrieval index
create extension if not exists vector;

create table content_chunks (
  id uuid primary key default gen_random_uuid(),
  source_slug text not null,          -- e.g. "zatca-compliance-engine" or "faq"
  locale text not null check (locale in ('en', 'ar')),
  content text not null,              -- the chunked text itself
  embedding vector(1536) not null,    -- populated by the build-time embedding script
  updated_at timestamptz not null default now()
);

create index content_chunks_embedding_idx
  on content_chunks using ivfflat (embedding vector_cosine_ops);

alter table content_chunks enable row level security;
-- Read-only via server route with service role; no public policy.
```

**Why no ORM:** two tables, both simple, both accessed through a handful of server actions/routes. The Supabase JS client covers this directly. Adding Prisma (or Drizzle) on top means a second schema-definition system to keep in sync with the SQL above, for no real gain at this scale — exactly the kind of unnecessary layer the project's own code-minimalism standard (see `arranto-rules.md`) rules out.

## 3. Chatbot Retrieval Pipeline (build-time, not runtime-heavy)
1. A build script (`scripts/embed-content.ts`) reads every MDX file's body and FAQ entries, chunks them into short passages, and calls an embeddings endpoint for each chunk.
2. Chunks + embeddings + `source_slug` + `locale` are upserted into `content_chunks`.
3. At runtime, a visitor's chatbot message is embedded once, then matched against `content_chunks` via cosine similarity (`ivfflat` index above) to retrieve the top few relevant passages, which are injected into the Claude call as context.
4. Re-running the embed script is part of the deploy pipeline whenever MDX content changes — no separate CMS webhook or background job needed.

## 4. What is deliberately not modeled
- No `GitHubRepositoryCache` table — case studies are static, not live-synced from GitHub.
- No `ToolUsageMetric` table — there are no in-house tools to instrument this phase; revisit only if/when a Future Tools item (see `arranto-future-tools.md`) actually ships.
- No `ProjectVector` enum / lead-routing table tied to a product-selection dropdown — the public contact form has no product branching, per Positioning Strategy v3 and PRD REQ-014.
- No user accounts, auth, or session tables — the public site has no login surface.

## Caveats
- `vector(1536)` assumes an embedding model with 1536-dimension output; adjust the column dimension to match whichever embeddings endpoint is actually used before running the migration.
- TehsilOS has no MDX file, no frontmatter entry, and no `content_chunks` rows until scope is confirmed — do not pre-create a placeholder row or file.
