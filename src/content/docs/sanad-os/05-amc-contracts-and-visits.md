# AMC Contracts & Visit Scheduling

A **Contract** is your Annual Maintenance Contract with a customer — its value, dates, billing terms, and the specific service lines that define what gets maintained and how often. SANAD OS automatically turns those service lines into a real visit schedule.

## Creating a contract

1. Click **Contracts** in the sidebar.
2. Click **New Contract**.
3. Fill in the side panel:
   - **Customer** — select from your existing customer list
   - **Contract number** — e.g. `CTR-2026-002`
   - **Title** — a descriptive name
   - **Status** — Draft, Active, Expiring, Expired, Renewed, or Lost
   - **Start date / End date**
   - **Value** (SAR)
   - **Billing cadence** — Monthly, Quarterly, Annual, or Milestone
   - **SLA response time** and **SLA resolution time** (hours) — optional
   - **Terms** — free-text notes, up to 5,000 characters
4. Click **Save**.

Contracts appear in a table with a color-coded status chip: gray (draft), green (active), amber (expiring), red (expired), blue (renewed), or slate (lost). Statuses transition automatically over time as contracts approach and pass their end dates.

## Adding service lines

Open a saved contract and scroll to **Contract Lines**. Each line defines one recurring service:

1. Choose a **site** (from the contract's customer).
2. Optionally choose a specific **asset** at that site — leave blank to cover the whole site.
3. Enter a **service code** (e.g. `MAINT-HVAC`) and an optional description.
4. Choose a **frequency**: Weekly, Biweekly, Monthly, Quarterly, Semiannual, or Annual.
5. Set **visits per period** (how many visits within that frequency window — usually 1).
6. Click **Add Line**.

A contract can have as many service lines as you need — e.g. monthly HVAC checks on one asset and a separate quarterly fire-safety inspection on another.

## Generating the visit plan

Scroll further down to **Visit Plan**. This section shows every visit computed from your service lines' frequencies, with a due date, a time window, status, site, and asset for each.

- Visits are generated automatically based on each service line's frequency.
- Click **Regenerate** to extend the plan forward from the latest scheduled visit — this is safe to run repeatedly; it never duplicates or overwrites past visits (forward-only).

Each visit's status is one of: **Planned** (scheduled, not yet actioned), **Job Created** (a work order was generated from it), or **Skipped**.

## What's next

Once a contract is active with visits scheduled, invoicing that customer against the work is next — see [Invoicing & ZATCA E-Invoicing](06-invoicing-and-zatca.md).
