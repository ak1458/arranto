-- Arranto initial schema (docs/arranto-schema.md, adapted per MASTER-CONTEXT D2/D3).
-- Run in Supabase SQL editor: https://supabase.com/dashboard → project → SQL Editor.

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
alter table inquiries enable row level security;
-- No policies on purpose: only the service-role key (server routes) can touch it.

-- Self-improvement agent reports (MASTER-CONTEXT task C4/C6).
create table agent_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  period_start date not null,
  period_end date not null,
  data jsonb not null,          -- raw GA4/GSC/health snapshot
  analysis text not null,       -- AI findings + recommendations (markdown)
  processed boolean not null default false  -- flipped by `npm run agent:improve`
);
create index agent_reports_created_at_idx on agent_reports (created_at desc);
alter table agent_reports enable row level security;

-- DEFERRED (MASTER-CONTEXT D2): pgvector RAG. Enable only if site content
-- outgrows full-context injection (~50KB+). Lock embedding model/dimension first.
-- create extension if not exists vector;
-- create table content_chunks (
--   id uuid primary key default gen_random_uuid(),
--   source_slug text not null,
--   locale text not null check (locale in ('en', 'ar')),
--   content text not null,
--   embedding vector(1536),
--   updated_at timestamptz not null default now()
-- );
-- create index on content_chunks using ivfflat (embedding vector_cosine_ops);
-- alter table content_chunks enable row level security;
