# Customers, Sites & Assets

This is your registry — every customer you serve, every physical location they have, and every piece of equipment you maintain there. It's nested: **Customers** contain **Sites**, and **Sites** contain **Assets**.

## Adding a customer

1. Click **Customers** in the sidebar.
2. Click **New Customer** (top right).
3. Fill in the side panel that opens:
   - **Name (Arabic)** — required
   - **VAT number** — optional, needed later if you'll invoice this customer through ZATCA
   - **Phone / contact info**
4. Click **Save**.

Your new customer appears in the table immediately. Click any row to reopen that customer's details, edit them, or delete the customer (soft-delete — it's removed from your active list, not permanently destroyed).

## Searching customers

Use the search box above the table — it searches across customer records as you type.

## Adding a site to a customer

1. Click a customer row to open its details panel.
2. Scroll to the **Sites** section below the customer form.
3. Enter a **site name** (e.g. "Main Branch") and optionally a **zone** (e.g. "Warehouse"), then click **Add**.
4. Click a site's name to expand it and manage its assets.

## Adding an asset to a site

Inside an expanded site:

1. Enter an **asset tag** (e.g. `AST-HVAC-003`) and optionally a **category** (e.g. "HVAC").
2. Click **Add**.

Every asset you add here becomes selectable later when building AMC contract service lines — see [AMC Contracts & Visit Scheduling](05-amc-contracts-and-visits.md).

## Bulk importing via CSV

If you have an existing spreadsheet of customers or assets, skip manual entry:

1. Click **Import** on the Customers page (or the **Import** button inside a site's Assets section, for asset-only imports).
2. Choose the import type: **Customers** or **Assets**.
3. Upload a `.csv` file matching the required columns.
4. After upload, you get a report showing exactly how many rows succeeded and, for any row that failed, which field caused the problem — so you can fix your spreadsheet and re-import just the failed rows.

**Required CSV columns:**

| Import type | Columns |
|---|---|
| Customers | `name_ar, name_en, vat_number, cr_number, contact_name, contact_phone, email, billing_street, billing_building, billing_district, billing_city, billing_postal, billing_country, notes` |
| Assets | `site_id, customer_id, tag, category, make, model, serial` |

Only `name_ar` (for customers) and `tag` (for assets) are strictly required — leave other columns blank if you don't have that data yet. For assets, `site_id` and `customer_id` must match records that already exist in SANAD OS (import your customers and sites first).

## What's next

Once you have customers, sites, and assets in place, the next step is wrapping them in an AMC contract — see [AMC Contracts & Visit Scheduling](05-amc-contracts-and-visits.md).
