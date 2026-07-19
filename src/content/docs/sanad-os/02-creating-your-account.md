# Creating Your Account

## Step 1: Sign up

1. Go to <https://sanad-os.vercel.app>.
2. Click **"Don't have an account? Create one"** below the sign-in form.
3. Enter your email address and a password (minimum 8 characters), then confirm the password.
4. Click **Sign Up**.
5. Check your email for a confirmation link. Click it — you'll be signed in automatically and land in the setup wizard.

If you already have an account, just enter your email and password on the login screen and click **Sign In**.

> Want to look around first without creating an account? Click **"Enter SANAD OS Demo Now"** instead — see [Demo Mode & What's Coming Next](09-demo-mode-and-whats-next.md).

## Step 2: The company setup wizard

The first time you sign in, a 6-step wizard walks you through setting up your company. **Steps 2–4 and 6 are optional** — you can skip any of them and finish them later. Steps 1 and 5 are where you'll spend the most time.

### Step 1 of 6 — Company Profile (required)

| Field | Required? | Notes |
|---|---|---|
| Company name | Yes | Minimum 2 characters |
| Your name | Yes | Minimum 2 characters |
| Phone number | No | Format: `+9665XXXXXXXX` |
| Business type | No | Choose from a list (Field Service, HVAC, Electrical & Plumbing, Cleaning & Facility Management, Security, Elevator Maintenance, Fire & Safety, IT Support, Construction, Landscaping, Pest Control) or select **Other — specify** to type your own |
| City | No | e.g. Riyadh |
| Interface language | No | Arabic or English — changes the wizard itself immediately |
| **ZATCA VAT number** | **Yes** | 15 digits, must start and end with `3` — e.g. `300000000000003`. This is your business's real ZATCA-registered VAT number. |
| Commercial Registration (CR) number | No | Can be added later |

Click **Next** to create your company. This step happens for real immediately — your company record is created the moment you click Next, even if you skip everything after this.

### Step 2 of 6 — Invite Your Team (optional)

Add colleagues one at a time:

1. Enter their **name** and **email**.
2. Choose their **role**: Owner, Ops (operations/admin), Accountant, or Technician.
3. Click **Add Invite**.

Each person you add receives an invite email to set up their own login. You can add as many as you like, or skip this entirely and invite people later — see [Navigating the Dashboard](03-navigating-the-dashboard.md) for where team invites live afterward.

### Step 3 of 6 — Import Existing Data (optional)

If you already have a spreadsheet of customers or assets, import it now:

1. Choose what you're importing: **Customers** or **Assets**.
2. Click the upload area and select your `.csv` file.
3. Skip this step if you'd rather add records manually or import later from the Customers page.

See [Customers, Sites & Assets](04-customers-sites-assets.md) for the exact CSV column format required.

### Step 4 of 6 — Your First Contract (optional)

This step creates a complete real chain in one pass: a customer, a site, an asset, and an AMC contract with its first service line. Fill in as much or as little as you like — required fields are marked with `*`:

**Customer & site**
- Customer name (Arabic) `*`
- Customer VAT number, phone, email, city (all optional)
- Site name `*` (e.g. "Main Site")
- Zone/area (Main Building, Branch, Warehouse, Rooftop, Parking, or Other)
- Access notes (gate codes, security info, etc.)

**Asset**
- Asset tag `*` (e.g. `AST-HVAC-001`)
- Asset category (HVAC, Elevator, Fire Safety, Electrical, Plumbing, Generator, Security Camera, IT/Network, or Other)
- Make and model (optional)

**Contract terms**
- Contract number `*` (e.g. `CTR-2026-001`)
- Contract value `*` (SAR)
- Billing cadence (Monthly, Quarterly, Annual, or Milestone)
- Visit frequency (Weekly, Biweekly, Monthly, Quarterly, Semiannual, Annual)
- Start date / end date
- Service code (e.g. `MAINT-GEN`)

Skip this step and you'll start with an empty, real dashboard — add your first customer and contract manually afterward from the Customers and Contracts tabs.

### Step 5 of 6 — ZATCA Connection Mode

Choose how you'll connect to ZATCA's e-invoicing system:

- **Sandbox** — a testing environment with no legal implications. Good for trying out the invoicing flow before going live.
- **Production** — the real, legally-binding connection to ZATCA's taxpayer portal. Selecting this asks for your production certificate file (`.crt`, `.pem`, or `.cer`) and its password, if you already have one from ZATCA.

This step just records your preference — the actual technical connection (generating your certificate, verifying with ZATCA) happens afterward from the **Invoices** tab. See [Invoicing & ZATCA](06-invoicing-and-zatca.md) for that full process.

### Step 6 of 6 — Explore With Sample Data

Choose whether to also load sample demo data alongside your real records, so you can explore the interface with realistic-looking data while your real business is still empty. Click **Finish** to land on your dashboard.

## What happens after setup

You land on your real dashboard — live counts of your actual customers, sites, assets, and contracts (starting at zero, or populated if you filled in Step 4). Every screen from here on reflects your real data. Nothing you see is sample or fabricated.
