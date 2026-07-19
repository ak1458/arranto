# Overview

## What SANAD OS is

**سند (SANAD OS)** is a field-service and maintenance operations platform built for Saudi contractors who run Annual Maintenance Contracts (AMC) — HVAC, electrical, plumbing, elevators, fire safety, security, IT, cleaning, and similar trades. The core workflow it's designed around:

**Customer → Site → Asset → Contract → Scheduled Visits → Dispatch → Job Completion → ZATCA-cleared Invoice**

It's Arabic-first (RTL by default) with full English support, and built specifically around Saudi business requirements — ZATCA VAT number validation, Commercial Registration numbers, and ZATCA Phase-2 e-invoicing compliance as a first-class feature (not a bolt-on).

## Who it's for

Small-to-mid-size Saudi maintenance and field-service contractors (roughly 10–50 technicians) who currently manage AMC contracts, scheduling, and invoicing across spreadsheets, WhatsApp, and manual ZATCA submission. Any business type works — the onboarding wizard's business-type field covers field service, HVAC, electrical/plumbing, cleaning/facility management, security, elevators, fire safety, IT support, construction, landscaping, pest control, and a free-text "Other" option for anything not listed.

## What makes it different

- **Multi-tenant by design, not retrofitted.** Every table enforces row-level security keyed to `company_id` — one shared database, cryptographically isolated per business, not a "add a WHERE clause and hope" model.
- **ZATCA compliance built in, not exported to an accountant.** The product's differentiator is a real ZATCA Phase-2 e-invoicing engine (UBL 2.1 XML, cryptographic signing, QR codes, the ICV/PIH audit chain) — see [ZATCA Integration](06-zatca-integration.md) for where that stands today.
- **A real backend under an honest UI.** SANAD OS ships with an interactive **Demo Mode** (sample data, clearly watermarked) so a prospect can explore the whole product without creating an account — and a separate, fully real mode once you sign up, where every screen reflects your actual data. The two are never mixed.

## The 21-day MVP scope

The original product plan defines an initial feature set:

1. Auth + company onboarding
2. Customers → Sites → Assets registry (with CSV import and QR asset labels)
3. AMC Contracts with SLA terms and visit frequency
4. Recurring visit scheduling (PPM — Planned Preventive Maintenance)
5. Dispatch board (drag-assign technicians, conflict detection)
6. Technician mobile app (offline-capable, voice-note-to-work-order via AI, photo + signature proof)
7. Quotes (line items, PDF, convert to job/invoice)
8. ZATCA Phase-2 invoicing (standard clearance + simplified reporting)
9. Owner dashboard (KPIs, daily digest email)
10. Renewal alerts (60/30/7-day AMC expiry warnings)
11. Settings (users/roles, VAT config, ZATCA credentials, billing)

See [Features](03-features.md) for exactly which of these are real today versus still on the roadmap.

## Where this documentation set lives

`docs/guide/` in the project repository. See [Support](07-support.md) for how this gets published externally.
