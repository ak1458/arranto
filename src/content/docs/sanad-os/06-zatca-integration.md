# ZATCA Integration

ZATCA Phase-2 e-invoicing is SANAD OS's core differentiator — and, today, its biggest gap between what the product promises and what it actually does. This page is deliberately blunt about exactly where that stands.

## What exists

A real, tested ZATCA Phase-2 compliance engine lives at `packages/zatca-engine/`, ported from **FatooraLite**, a separate e-invoicing product built by the same team. It is not a stub or a mockup — it implements:

- UBL 2.1 XML invoice generation
- XAdES-EPES signing (secp256k1, correct C14N-11 canonicalization)
- The ICV/PIH cryptographic hash chain ZATCA requires between consecutive invoices
- QR-TLV code encoding (all 9 mandatory tags)
- ASN.1 CSR generation carrying ZATCA's required custom certificate extensions
- A gateway client for both the sandbox and production ZATCA endpoints (compliance/production CSID onboarding, clearance submission for standard invoices, reporting submission for simplified invoices)

19 of its own unit tests pass inside this repository (39 in its source project, including a signature-verification round trip and byte-level QR encoding checks).

## What does not exist yet

**The engine is not connected to anything.** No edge function calls it. The Invoices tab in the app — in both Demo Mode and real mode — shows a fabricated "cryptographically signed" invoice with a fake SHA-256 hash generated instantly on click, with no real XML, no real signature, and no submission to ZATCA of any kind. This has been true since before this documentation was written and remains true now.

## What connecting it actually requires

This is not a small follow-up — it's a scoped, well-understood piece of work with a clear plan, not yet started:

1. **Two new edge functions**, `zatca-onboard` and `zatca-submit`, porting the *orchestration pattern* (not the code — different database) from the engine's source project: request a CSR + OTP → compliance CSID → run the four mandatory compliance-check documents → production CSID, then sign-and-submit for each real invoice going forward.
2. **A runtime compatibility check.** The engine currently runs under Node.js. Supabase Edge Functions run on Deno, which has its own Node-compatibility layer — `node-forge` (used for CSR generation) and `xml-crypto` (used for canonicalization, the single most correctness-sensitive part of ZATCA compliance) need to be confirmed working correctly under that specific runtime before committing to the full port. The plan is a small throwaway edge function that signs one invoice and re-verifies its own signature, mirroring a self-check script already proven to work in the source project.
3. **Wiring the output into the existing schema.** This part is already straightforward — the engine's output object maps directly onto columns that already exist in the `invoices` table (a `zatca` jsonb column) and the `invoice_counters`/`zatca_credentials` tables, including a happy coincidence: the engine's "genesis hash" default and this schema's default PIH value are already identical, because both were built independently against the same ZATCA specification.
4. **Replacing the fake invoice UI** with a real call into `zatca-submit`.

## One more honest caveat

Even the engine itself, in its source project, has never been round-tripped against a live ZATCA sandbox account with a real one-time-passcode from the Fatoora portal. The cryptography and XML are self-verified offline against ZATCA's published specification and pass their own tests — but the exact request/response shapes of ZATCA's real gateway, and the exact byte format their certificate authority expects in the CSR extensions, have not been confirmed against a live account. Budget time for a first real sandbox onboarding run, and for debugging whatever surprises it turns up, regardless of who does this work or when.

## Bottom line

If you're evaluating SANAD OS for a business that needs ZATCA compliance today: **do not rely on the current Invoices tab for anything real.** The hard part — the actual cryptography and compliance logic — is done and tested. The integration work connecting it to the rest of the product has not started.
