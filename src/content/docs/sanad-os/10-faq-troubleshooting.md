# FAQ & Troubleshooting

## Account & sign-in

**I didn't get my confirmation email.**
Check your spam folder first. If it's genuinely missing after a few minutes, use the **"Need help? Contact support"** link on the login page.

**I forgot my password.**
On the login page, use the password reset flow to receive a time-limited reset link by email.

**I'm stuck on the two-factor code screen and don't have my authenticator app anymore.**
See [Account Security & Two-Factor Authentication](07-account-security-mfa.md#a-note-on-lost-devices) — contact support for account recovery.

**Can multiple people from my company have their own login?**
Yes — invite teammates during the setup wizard's Team Invites step, with a role (Owner, Ops, Accountant, Technician) for each. See [Creating Your Account](02-creating-your-account.md).

## Customers, sites & assets

**My CSV import failed on some rows.**
The import report shows exactly which rows failed and why (e.g. a missing required column, an invalid reference). Fix those specific rows in your spreadsheet and re-import — successfully imported rows are not duplicated if you re-run the same file, but it's safest to only re-upload the rows that failed.

**Can I delete a customer?**
Yes, from the Customers table. This is a soft delete — the customer is removed from your active list but the record isn't destroyed, preserving historical contract and invoice references.

## Contracts & visits

**I added a service line but don't see any visits yet.**
Click **Regenerate** in the Visit Plan section of that contract — visit generation runs on demand, not automatically the instant you add a line.

**Will regenerating visits duplicate ones I already have?**
No — regeneration is forward-only. It extends the plan from your latest scheduled visit; it never rewrites or duplicates past visits.

## Invoicing & ZATCA

**Why can't I click "Compliance CSID"?**
That button unlocks only after "Generate CSR" has succeeded. Complete the ZATCA onboarding steps in order — see [Invoicing & ZATCA](06-invoicing-and-zatca.md).

**Where do I get the OTP for step 2?**
From ZATCA's own Fatoora portal, using your business's ZATCA credentials — it's a one-time code only ZATCA can issue, and only a registered Saudi taxpayer can obtain it. SANAD OS cannot generate or retrieve this for you.

**My invoice was rejected — what do I do?**
The rejection code and message from ZATCA are shown directly on the invoice. If it's unclear how to fix it, open a support ticket with the invoice number and the exact rejection text.

**Is Sandbox mode legally binding?**
No. Sandbox invoices have no legal or tax effect — they exist purely to test your setup before switching to Production.

## General

**Is my data visible to other companies using SANAD OS?**
No. Every business's data is strictly isolated at the database level — this is enforced by the platform itself, not just by the interface hiding things from view.

**I found a bug or have a feature request.**
Open a support ticket from the **Support** tab (category: Technical or Feature Request). See [Support & Getting Help](08-support-and-help.md).

**Still stuck?**
Use the in-app Support tab if you're signed in, or the login page's contact link if you're not — see [Support & Getting Help](08-support-and-help.md) for both paths.
