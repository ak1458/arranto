# Security

## Tenant isolation

Every business-data table has row-level security enabled, with policies that scope every read and write to the caller's own `company_id` — resolved server-side from their authenticated session, never trusted from client input. This has been verified with an automated denial test harness (`supabase/tests/rls_denial.sql`) that creates two separate tenants and confirms, across every table: a user from company B reads zero rows belonging to company A; a spoofed insert claiming company A's ID from a company B session is rejected; a technician role sees only their own assigned jobs, not the full company's contracts or invoices.

## Authentication

Supabase Auth (email/password) with email confirmation required before first sign-in. Sessions are JWTs; edge functions resolve the caller's identity from that JWT via a scoped Supabase client, never from a header the client could forge. A failed sign-in shows a proper error — it does not silently fall back to any kind of preview or demo state, so there's never ambiguity about whether you're looking at your real account or a sample.

## Authorization

Role is re-derived server-side on every privileged action. The client's own belief about its role is never trusted: `invite-user`, for example, looks up the caller's role fresh from the `profiles` table before allowing an invite to be sent, regardless of what the client sends in the request body.

## Secrets

- The Supabase **publishable** (anon) key is safe to ship in the frontend bundle by design — it has no privileges beyond what RLS policies explicitly grant to the `authenticated` role.
- The **service-role** key, which bypasses RLS, exists only as an edge-function secret and is never sent to the browser.
- `.env` (containing the publishable key and project URL) is git-ignored; `.env.example` documents the shape without real values.
- ZATCA credentials (once wired — see [ZATCA Integration](06-zatca-integration.md)) are designed to be stored encrypted at rest, decrypted only inside edge functions.

## What's deliberately restricted

- `zatca_credentials` and `invoice_counters` have **no client-facing RLS policy at all** — only service-role edge functions can touch them directly. A separate database view exposes non-secret status fields (e.g. "compliance check passed") to owners/operations without ever exposing the underlying credential material.
- Issued invoices become immutable in the database the moment they're cleared — even a compromised client session cannot edit a cleared invoice's line items after the fact, only its payment status.
- Uploaded files (photos, documents) live in per-company storage paths with matching RLS — one tenant's storage bucket path is never readable by another tenant's session.

## Known gaps

This has not undergone an independent third-party security audit or penetration test. Treat the above as "what the architecture is designed to guarantee, verified by an internal test harness," not as a substitute for professional review before handling sensitive production data at scale. See `docs/site/security.html` in the repository for a point-in-time code-level audit with specific findings, if a deeper technical review is useful.
