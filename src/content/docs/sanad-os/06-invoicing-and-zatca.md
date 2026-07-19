# Invoicing & ZATCA E-Invoicing

The **Invoices** tab is where you connect to ZATCA (Saudi Arabia's tax authority) and issue real, cryptographically signed, ZATCA-compliant e-invoices. Every invoice and every status shown here comes from the database or ZATCA's live gateway response — nothing on this screen is fabricated.

## Before you start: what you need

To actually clear or report an invoice with ZATCA, you need:

- A registered Saudi business with a valid 15-digit VAT number (entered during [account setup](02-creating-your-account.md))
- A **one-time passcode (OTP)** from ZATCA's own **Fatoora portal**. You get this by logging into Fatoora yourself with your business's ZATCA credentials — SANAD OS cannot obtain this on your behalf. This is a deliberate anti-automation control on ZATCA's side, not a limitation of the software.

If you don't have Fatoora access yet, you can still explore everything else on this page — you just won't be able to complete step 2 of onboarding below until you do.

## Part 1: Connecting to ZATCA (one-time setup)

At the top of the Invoices page is the **ZATCA Onboarding** panel, showing your current status (sandbox or production) and four sequential steps:

1. **Generate CSR** — click this first. SANAD OS generates a cryptographic key pair and a Certificate Signing Request on your behalf. This step needs nothing from you.
2. **Compliance CSID** — log into ZATCA's Fatoora portal in a separate tab, request a one-time passcode there, then paste it into the **"OTP from Fatoora portal"** field on this page and click this button. This exchanges your CSR for a compliance certificate.
3. **Compliance Checks** — click this to run ZATCA's required compliance-invoice checks, confirming your setup can produce valid invoices.
4. **Production CSID** — click this last to receive your production certificate, the one used to actually clear or report real invoices.

Each button only becomes clickable once the previous step has succeeded — you can't skip ahead. If a step fails, the error message appears at the top of the page in plain language.

## Part 2: Creating an invoice

1. Click **New Invoice**.
2. Select the **customer** you're invoicing.
3. Choose the invoice **type**:
   - **Simplified** — for B2C-style transactions (most common for field-service work)
   - **Standard** — for B2B tax invoices
4. Add one or more **line items**: description, quantity, and unit price (VAT is calculated at 15% automatically).
5. Click **+ Add line** for additional items, or the trash icon to remove one.
6. Click **Save as Draft**.

Your invoice now appears in the list below with a **Draft** status and its total in SAR.

## Part 3: Submitting to ZATCA

Once your ZATCA connection (Part 1) is complete and you have a draft invoice:

1. Find the invoice in the list.
2. Click **Submit to ZATCA**.

SANAD OS builds the full invoice document, signs it cryptographically (UBL 2.1 XML with XAdES signing, per ZATCA's Phase-2 specification), and submits it through ZATCA's gateway. The invoice's status updates automatically based on ZATCA's real response:

| Status | Meaning |
|---|---|
| **Draft** | Created, not yet submitted |
| **Cleared** | ZATCA approved and cleared the invoice (standard/B2B invoices) |
| **Reported** | ZATCA accepted the invoice report (simplified/B2C invoices) |
| **Rejected** | ZATCA rejected it — the rejection code and message are shown directly on the invoice so you know exactly what to fix |

A successfully submitted invoice shows its cryptographic hash (part of ZATCA's required audit chain) directly beneath its entry.

## Sandbox vs. production

Everything above works identically in both modes. Use **sandbox** to safely test your whole invoicing flow with no legal effect. Switch to **production** (chosen during account setup, or reconfigure via a support ticket) only once you're ready to issue real, legally binding invoices.

## If something goes wrong

Every error from either SANAD OS or ZATCA's own gateway is shown in plain text at the top of the page — never a generic failure. If a rejection message from ZATCA doesn't make sense, open a support ticket (see [Support & Getting Help](08-support-and-help.md)) with the invoice number and rejection code.
