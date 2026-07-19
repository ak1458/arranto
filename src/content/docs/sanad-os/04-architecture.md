# Architecture

## Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite + TypeScript (strict mode, `any` banned by lint rule) |
| Styling | Tailwind v4, design tokens via `@theme` |
| Data fetching | TanStack Query |
| Client state | Zustand (Demo Mode data store only — real mode reads/writes Supabase directly) |
| Backend | Supabase — Postgres with row-level security, Auth, Storage, Edge Functions (Deno runtime), Realtime, scheduled jobs |
| i18n | i18next / react-i18next, Arabic default with RTL, English |
| Validation | zod — every edge function input is parsed, every client mutation is parsed before it leaves the browser |
| ZATCA engine | TypeScript, `packages/zatca-engine` (npm workspace) — see [ZATCA Integration](06-zatca-integration.md) |
| Hosting | Vercel (frontend, static build) + Supabase (backend, managed) |

No Next.js, no Redux, no CSS-in-JS, no ORM inside edge functions — SQL and the Supabase client library directly.

## Multi-tenancy model

One shared Supabase project serves every business. Every business-data table carries a `company_id` column, and row-level security policies enforce that a signed-in user can only ever see rows belonging to their own company — enforced at the database layer, not the application layer, so there's no code path that can accidentally leak another tenant's data. Two helper functions, `auth_company_id()` and `auth_role()`, resolve the caller's tenant and role from their JWT on every query.

Onboarding is self-service: `company-bootstrap`, an edge function, creates a new company row, an owner profile, a 14-day trial subscription, and a sandbox invoice counter — all in one atomic operation, with automatic rollback if any step fails partway.

## Database

Migrations `001`–`011` in `supabase/migrations/`, applied in order, define the full schema — 29 tables covering companies, profiles, the customer/site/asset registry, contracts and visit scheduling, jobs and work orders, quotes, invoices and ZATCA credentials, payments, notifications, AI logs, an audit trail, subscriptions, CSV import jobs, and a support ticketing system. Not every table has a UI built against it yet — the schema was designed against the full product plan up front, so the tables for not-yet-built features (jobs, quotes, dispatch, invoicing) already exist with correct RLS policies and are ready for a UI whenever that work happens.

State-machine integrity is enforced in the database itself, not just application code: a job can't transition to `completed` without a confirmed work order attached; an invoice becomes immutable the moment it's cleared by ZATCA, with only payment-status fields still writable; issued invoices can never be deleted (10-year retention requirement); every insert/update/delete on the sensitive tables (invoices, contracts, ZATCA credentials, profiles) writes an audit-log entry automatically via a database trigger.

## Edge functions

Deno-runtime Supabase Edge Functions, each independently deployed:

| Function | Purpose |
|---|---|
| `company-bootstrap` | First-login: creates company + owner profile + trial subscription |
| `invite-user` | Owner/ops invites a teammate; role is re-verified server-side, never trusted from the client |
| `claim-invite` | New teammate claims their invite on first login |
| `import-csv` | Staged CSV import (customers/assets) with per-row validation and error reporting, 5 MB / 10,000-row caps |
| `generate-visits` | Expands contract lines into scheduled visit rows, idempotent |
| `contract-auto-status` | Nightly job: transitions contracts through draft → active → expiring → expired |

Every function validates its input with a shared zod schema (kept in sync between the client and Deno runtime via `scripts/sync-shared.sh`), requires a valid JWT, and re-derives the caller's tenant and role from the database rather than trusting anything the client claims.

## Repository layout

```text
src/app          desktop app shell (sidebar, topbar, real/demo routing)
src/features/*   one folder per domain (customers, contracts, support, auth, dashboard, …)
src/lib          Supabase client, i18n, money formatting, external links config
shared/          zod DTOs shared between the SPA and edge functions
packages/
  zatca-engine/  ZATCA Phase-2 e-invoicing engine (ported, not yet wired — see doc 06)
supabase/
  migrations/    001–011, applied in order, source of truth for the schema
  functions/     edge functions (Deno)
  tests/         RLS denial test harness
docs/
  guide/         this documentation set
  planning/      original PRD/TRD/schema/rules/tracker documents
  site/          a point-in-time code audit (HTML), kept for historical reference
```

## Deployment

Frontend: `vercel deploy --prod` from the repo, or push to `main` on the connected GitHub repository for automatic deployment. Backend: `scripts/setup-supabase.sh` (or its PowerShell equivalent) for a scripted one-command setup against any Supabase project — see [Getting Started](02-getting-started.md) for the full sequence.
