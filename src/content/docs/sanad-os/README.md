# SANAD OS User Guide — by arranto

سند (SANAD OS) is a field-service and maintenance operations platform built for Saudi contractors, with ZATCA Phase-2 e-invoicing built in. This guide walks through every real, working feature — from creating your account to submitting your first ZATCA invoice — in the order you'll actually use them.

This is the **customer-facing user manual**: task-by-task, "click this, then this happens." If you're looking for the technical/security audit or developer setup instead, that lives in the project's `docs/guide/` folder — different audience, different purpose.

## Contents

1. [Welcome to SANAD OS](01-welcome.md) — what it does, who it's for, Arabic/English support
2. [Creating Your Account](02-creating-your-account.md) — sign up, confirm your email, the 6-step setup wizard
3. [Navigating the Dashboard](03-navigating-the-dashboard.md) — sidebar, search, notifications, dark mode, language switch
4. [Customers, Sites & Assets](04-customers-sites-assets.md) — building your customer registry, CSV bulk import
5. [AMC Contracts & Visit Scheduling](05-amc-contracts-and-visits.md) — maintenance contracts, service lines, auto-generated visit plans
6. [Invoicing & ZATCA E-Invoicing](06-invoicing-and-zatca.md) — connecting to ZATCA, creating and submitting invoices
7. [Account Security & Two-Factor Authentication](07-account-security-mfa.md) — enabling 2FA on your account
8. [Support & Getting Help](08-support-and-help.md) — FAQ, support tickets, contacting arranto
9. [Demo Mode & What's Coming Next](09-demo-mode-and-whats-next.md) — the sales preview vs. your real data, honestly, what's still being built
10. [FAQ & Troubleshooting](10-faq-troubleshooting.md) — common questions and fixes

## Quick facts

- **Live product**: <https://sanad-os.vercel.app>
- **Languages**: Arabic (default, right-to-left) and English — switch anytime from the header
- **Who it's for**: Saudi maintenance/field-service contractors running Annual Maintenance Contracts (AMC) — HVAC, electrical, plumbing, elevators, fire safety, security, IT, cleaning, and similar trades
- **Core workflow**: Customer → Site → Asset → Contract → Scheduled Visits → ZATCA-cleared Invoice

## Publishing this guide on arranto.com

This whole folder is plain, self-contained Markdown with only relative links between its own pages — copy `docs/manual/` as-is to wherever it'll actually live on the arranto website. Once it has a real URL, point the app at it:

```sh
VITE_DOCS_URL=https://arranto.com/docs/sanad-os
```

Set that in Vercel's project settings and redeploy — the "Documentation" links on the SANAD OS login page and Support tab pick it up automatically, no code change required. (This is the same mechanism used by the technical documentation in `docs/guide/`.)

---

*Published by arranto. To browse this guide, start with [Welcome to SANAD OS](01-welcome.md).*
