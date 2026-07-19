# Getting Started

Two audiences, two very different paths:

- **A business owner evaluating or using SANAD OS** → skip to [Using the live product](#using-the-live-product).
- **A developer standing up a new instance** (self-hosting, forking, or continuing development) → see [Setting up a new instance](#setting-up-a-new-instance).

## Using the live product

1. Go to <https://sanad-os.vercel.app>.
2. **To explore without an account**: click **"Enter SANAD OS Demo Now"** on the login page. This drops you into a fully interactive sample environment — customers, contracts, dispatch board, invoices, everything populated with realistic sample data. It is clearly watermarked as a demo and never touches real records. Nothing you do here is saved to any real business.
3. **To set up your real company**: click **"Don't have an account? Create one"**, enter an email and password, and check your email for a confirmation link. Once confirmed, sign in and you'll land in the onboarding wizard.
4. **Onboarding wizard** — six steps, all but the first two optional:
   - **Step 1 (required)**: your company name, your name, business type (a curated list plus "Other — specify"), city, phone, ZATCA VAT number (15 digits, must start and end with `3`), and Commercial Registration number (optional, can be added later).
   - **Step 2**: invite teammates by email/role (owner, ops, accountant, technician) — skippable, invite later from Settings.
   - **Step 3**: bulk-import customers or assets from a CSV file — skippable, import later.
   - **Step 4**: create your first customer, site, asset, and AMC contract in one pass — skippable, or fill it in and a real contract with a scheduled visit line gets created immediately.
   - **Step 5**: choose ZATCA sandbox or production mode (currently records your preference; see [ZATCA Integration](06-zatca-integration.md) for what's actually wired up).
   - **Step 6**: optionally load additional demo data to explore alongside your real records, or finish straight into your (empty, real) dashboard.
5. After onboarding, you land in the real dashboard — live counts of your customers, sites, assets, and contracts, not sample numbers.
6. **Need help?** Once signed in, use the **Support** tab in the sidebar — FAQ plus a ticketing system your team can track. Before signing in (e.g. trouble with a confirmation email), use the "Need help? Contact support" link on the login page.

## Setting up a new instance

This is for developers — forking the codebase, self-hosting, or continuing development.

### Prerequisites

- Node.js 20+ and npm
- A [Supabase](https://supabase.com) account (free tier works for development/pilot use)
- A [Vercel](https://vercel.com) account (or any static host — the frontend is a plain Vite build)
- The [Supabase CLI](https://supabase.com/docs/guides/cli) (`npm i -g supabase`, or use `npx supabase`)

### Steps

1. **Clone and install**
   ```sh
   git clone <repo-url>
   cd sanad-os
   npm install
   ```
   This also installs `packages/zatca-engine`'s dependencies via npm workspaces — no separate install step needed there.

2. **Create a Supabase project** via the [dashboard](https://supabase.com/dashboard), or `npx supabase projects create`. Note the project ref.

3. **One-command backend setup**:
   ```sh
   npx supabase login   # one-time
   bash scripts/setup-supabase.sh <your-project-ref>
   ```
   (A PowerShell equivalent, `scripts/setup-supabase.ps1`, is also included for Windows users who prefer it.) This links the project, applies all SQL migrations in order, deploys every edge function with JWT verification enabled, and sets the `SITE_URL` secret.

   If your project's migration history was ever touched outside the CLI (e.g. applied via the Supabase dashboard SQL editor or an MCP tool), `supabase db push` may refuse to reconcile history because the local migration filenames aren't timestamp-prefixed. In that case apply the specific new migration directly:
   ```sh
   npx supabase db query --linked -f supabase/migrations/0NN_name.sql
   ```

4. **Configure Supabase Auth redirect URLs.** This matters more than it looks: Supabase's dashboard-level `site_url` and redirect allowlist control where confirmation/magic-link emails point — the client's own `emailRedirectTo` parameter is ignored unless that domain is on the allowlist. `supabase/config.toml` already declares the `[auth]` section with the project's production URL; if you're deploying to a different domain, update `site_url` and `additional_redirect_urls` there, then run:
   ```sh
   npx supabase config push --project-ref <your-project-ref>
   ```
   **Read the comment above `[auth]` in `supabase/config.toml` before adding new keys to that file** — `config push` treats every key in a section it touches as authoritative and silently resets anything not declared back to the CLI's own default. (This cost real debugging time once: an incomplete push flipped email confirmation off.)

5. **Wire the frontend environment**:
   ```sh
   cp .env.example .env
   ```
   Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's API settings (the **publishable** key — never the service-role key, which belongs only in edge function secrets).

6. **Run locally**:
   ```sh
   npm run dev        # http://localhost:5173
   npm run typecheck && npm run lint && npm test
   ```

7. **Deploy the frontend** (Vercel shown; any static host works since it's a Vite build):
   ```sh
   vercel link --yes --project <your-project-name>
   vercel env add VITE_SUPABASE_URL production --value <url> --yes
   vercel env add VITE_SUPABASE_ANON_KEY production --value <key> --yes
   vercel deploy --prod --yes
   ```

8. **Optional**: set `VITE_DOCS_URL` (locally in `.env`, or as a Vercel env var) to point the in-app "Documentation" links at a hosted copy of this guide. Leave it unset and those links simply don't appear — no code change needed either way, just redeploy after setting it.

### What's manual vs automated today

The backend setup (step 3) is one command. What's still manual: creating the Supabase project itself, linking Vercel, and the first-time `supabase login`. There's no one-click "deploy this to a fresh account" button yet — see [Architecture](04-architecture.md) for the honest state of deployability.
