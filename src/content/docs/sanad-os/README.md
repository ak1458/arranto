# SANAD OS Documentation

Arabic-first field-service and maintenance operations platform for Saudi contractors, with built-in ZATCA Phase-2 e-invoicing.

This is the product documentation — how to set it up, what actually works today, how it's built, and how to get help. For an independent, code-verified audit of the codebase (findings, security review, feature-reality matrix), see `docs/site/` in the repository instead; this guide is the maintained, current source of truth.

## Contents

1. [Overview](01-overview.md) — what SANAD OS is, who it's for, what makes it different
2. [Getting Started](02-getting-started.md) — set up a new instance, sign up, onboard your company
3. [Features](03-features.md) — what's real, what's a placeholder, honestly, tab by tab
4. [Architecture](04-architecture.md) — stack, data model, edge functions, deployment
5. [Security](05-security.md) — tenant isolation, RLS, auth, secrets handling
6. [ZATCA Integration](06-zatca-integration.md) — e-invoicing engine status and roadmap
7. [Support](07-support.md) — getting help, the ticket system, contact channels

## Current status at a glance

- **Live**: <https://sanad-os.vercel.app>
- **Backend**: Supabase Postgres + Auth + Edge Functions, single shared project with row-level security enforcing tenant isolation
- **Languages**: Arabic (default, RTL) and English
- **Real, working today**: sign-up/sign-in, company onboarding wizard, Customers/Sites/Assets registry, CSV import, Contracts + AMC visit scheduling, Support ticketing
- **Not yet real**: ZATCA e-invoicing (engine ported from a sister product, not wired in — see [ZATCA Integration](06-zatca-integration.md)), Dispatch board, Jobs, Reports, technician mobile app, AI voice-to-work-order

---

*Documentation home: this page. To publish elsewhere (e.g. on the arranto website), copy this `docs/guide/` folder as-is — every internal link is relative and self-contained.*
