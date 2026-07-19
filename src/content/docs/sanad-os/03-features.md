# Features

An honest, current status for every capability in the product plan. Three states:

- ✅ **Real** — works against the live database, no fabricated data
- 🚧 **Partial** — backend exists, UI is incomplete, or it's placeholder-only
- ⛔ **Not built** — no working implementation yet

| # | Feature | Status | Notes |
|---|---|---|---|
| 1 | Auth & company onboarding | ✅ Real | Sign-up/sign-in, email confirmation, 6-step onboarding wizard. Company, owner profile, and (optionally) first customer/site/asset/contract created for real on submission. |
| 2 | Customers → Sites → Assets registry | ✅ Real | Full CRUD, nested (customer → sites → assets), tsvector search, CSV bulk import with per-row error reporting. Reachable from the sidebar once signed in. |
| 3 | AMC Contracts | ✅ Real | Contract + contract-line CRUD, visit-plan generation, forward-only regeneration, nightly auto-status transitions (draft → active → expiring → expired). |
| 4 | Recurring visit scheduling (PPM) | ✅ Real (backend) | `generate-visits` edge function computes visit due-dates for weekly/biweekly/monthly/quarterly/semiannual/annual frequencies, idempotent (safe to re-run). No dedicated calendar UI yet — visits are visible under each contract. |
| 5 | Dispatch board | 🚧 Placeholder | Real in **Demo Mode** only (interactive Kanban over sample data). In real mode, the tab shows an honest "in development" placeholder — no fabricated board. |
| 6 | Technician mobile app | ⛔ Not built | No offline PWA, no voice-to-work-order, no photo/signature capture against real data. Demo Mode simulates the experience for sales/preview purposes only. |
| 7 | Quotes | ⛔ Not built | No real or demo surface area at all yet. |
| 8 | ZATCA Phase-2 invoicing | 🚧 Ported, not wired | A real, tested ZATCA engine has been ported into the codebase (`packages/zatca-engine`) but is not yet called by any edge function or connected to the Invoices UI. See [ZATCA Integration](06-zatca-integration.md) for the full story — this is the single biggest gap between "what the product promises" and "what it does today." |
| 9 | Owner dashboard | ✅ Real (core) | Live KPI counts (customers/sites/assets/contracts) pulled from the database on load, not sample numbers. Revenue/SLA/invoice KPIs from the full plan aren't wired yet — those remain Demo-Mode-only. |
| 10 | Renewal alerts | ⛔ Not built | No alert generation, no acknowledge/snooze flow, in either mode beyond a single static demo KPI label. |
| 11 | Support / help | ✅ Real | FAQ + full ticketing system (create, thread, mark resolved) once signed in. A pre-auth contact link is available on the login page for people who can't reach the in-app system yet. |
| — | Settings (users/roles, billing, ZATCA credentials) | 🚧 Partial | Dark mode and locale switch work. User/role management, invoice-series config, and a ZATCA credential wizard aren't built — Settings shows the honest placeholder in real mode. |

## Demo Mode vs real mode

SANAD OS has two distinct experiences, and the product is careful never to blur them:

- **Demo Mode**: reachable from the login page without an account. Every tab is populated with realistic Saudi sample data (Aramco, Al Rajhi Bank, etc.) and is fully interactive for exploration. A persistent amber banner marks every screen as sample data — invoices shown here are explicitly labeled as simulated and **not** ZATCA-certified.
- **Real mode**: reachable only after signing up and confirming an account. Every screen reflects your actual database records. Features not yet built show an honest "in development" placeholder instead of fake data — the product never shows a real user fabricated numbers.

## Languages

Arabic (default, right-to-left) and English. Earlier iterations of the product also shipped Urdu and Hindi locale shells for a technician-facing mobile app that was never built; those were removed to keep the maintained language surface honest — Arabic and English are the only fully supported, tested locales.
