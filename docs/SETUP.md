# Arranto — Setup Guide

Every external service, in order, with direct links. Each step ends with the env var(s) it produces. Copy values into `.env.local` (local) and Vercel project settings (production). Template: [`.env.example`](../.env.example).

---

## 1. OpenRouter (AI — chatbot + agent)

1. Create account: https://openrouter.ai
2. Create API key: https://openrouter.ai/settings/keys
3. Add credits (pay-as-you-go): https://openrouter.ai/settings/credits
4. Optional — pick a different model: https://openrouter.ai/models

→ `OPENROUTER_API_KEY`, optionally `OPENROUTER_MODEL` (default `anthropic/claude-sonnet-4.5`)

## 2. Supabase (database — inquiries + agent reports)

1. Create project: https://supabase.com/dashboard/new
2. Open SQL Editor: dashboard → your project → **SQL Editor**
3. Paste and run the whole of [`supabase/migrations/001_init.sql`](../supabase/migrations/001_init.sql)
4. Get keys: dashboard → project → **Settings → API**
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY` (server-only — never prefix with NEXT_PUBLIC)

View inquiries anytime: dashboard → **Table Editor → inquiries**.

## 3. Cron secret

Generate once (any terminal): `openssl rand -hex 32` — or any long random string.

→ `CRON_SECRET` (set in Vercel; Vercel automatically sends it as `Authorization: Bearer …` to cron routes — docs: https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs)

## 4. Google Cloud service account (agent data: GA4 + Search Console)

1. Create/select project: https://console.cloud.google.com/projectcreate
2. Enable **Analytics Data API**: https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com
3. Enable **Search Console API**: https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
4. Create service account: https://console.cloud.google.com/iam-admin/serviceaccounts → *Create service account* (no roles needed)
5. Create key: service account → **Keys → Add key → JSON** — downloads a `.json` file
6. Convert to one line and set as `GOOGLE_APPLICATION_CREDENTIALS_JSON`:
   ```powershell
   Get-Content key.json -Raw | ForEach-Object { $_ -replace "`r?`n", "" }
   ```
7. Copy the service account email (`…@…iam.gserviceaccount.com`) — needed in steps 5 and 6.

## 5. Google Analytics 4

1. Create GA4 property: https://analytics.google.com → Admin → **Create property**
2. Create a **Web data stream** for `arranto.com` → copy the **Measurement ID** (`G-…`) → `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Property ID (a number, Admin → Property settings) → `GA4_PROPERTY_ID`
4. Grant the service account access: Admin → **Property access management** → Add user → paste service-account email → role **Viewer**

## 6. Google Search Console

1. Add property: https://search.google.com/search-console → **Add property** → Domain `arranto.com` (needs one DNS TXT record) — or URL-prefix if easier
2. → `SEARCH_CONSOLE_SITE_URL` = `sc-domain:arranto.com` (domain property) or `https://arranto.com/` (URL-prefix)
3. If you verify via HTML tag instead of DNS: copy the `content="…"` token → `NEXT_PUBLIC_GSC_VERIFICATION`
4. Grant service account access: property → **Settings → Users and permissions → Add user** → service-account email → **Full** (needed for sitemap submission)

## 7. Google Tag Manager (optional but recommended)

1. Create container: https://tagmanager.google.com → Create account → Web container for `arranto.com`
2. Container ID (`GTM-…`) → `NEXT_PUBLIC_GTM_ID`

Ad-related consent signals are hard-denied in code ([`src/components/Analytics.tsx`](../src/components/Analytics.tsx)) — the site runs no ad pixels by policy.

## 8. GitHub + Vercel (hosting + cron)

1. Create GitHub repo (private): https://github.com/new — then from `site/`:
   ```
   git remote add origin https://github.com/<you>/arranto.git
   git push -u origin main
   ```
2. Import to Vercel: https://vercel.com/new → select the repo
3. Add ALL env vars: project → **Settings → Environment Variables** (everything in `.env.example`)
4. Crons activate automatically from [`vercel.json`](../vercel.json) on the next production deploy — verify at project → **Settings → Cron Jobs**
5. Domain: project → **Settings → Domains** → add `arranto.com`

## 9. Optional: email notification for inquiries

1. Get a free access key: https://web3forms.com (email arrives at the address you register)
2. → `WEB3FORMS_KEY` (server-side; the old `NEXT_PUBLIC_WEB3FORMS_KEY` is retired)

## 10. Post-deploy checks

```bash
curl https://arranto.com/api/health                      # {"ok":true,"features":{...all true}}
curl https://arranto.com/llms.txt                        # honest AI-crawler summary
curl -X POST https://arranto.com/api/chat -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What is Arranto?"}]}'
curl -H "x-agent-key: $CRON_SECRET" https://arranto.com/api/agent/latest
```

Security headers check: https://securityheaders.com/?q=arranto.com

---

## Manual/business tasks (not code)

- **smilefotilo.com bridge + 301s** — done in the smile-fotilo repo (`next.config.ts` redirect map there): root stays live as bridge page; deep URLs 301 to Arranto equivalents (`/pricing`→`/contact`, `/locations/*`→`/about`, `/products/*`→`/work`).
  **`/studio` no longer exists** — the page was renamed to `/about`. Any old 301 still pointing at `/studio` now lands on a redirect rather than the page itself; update the smile-fotilo map to target `/about` directly. Arranto's own `next.config.ts` 301s the legacy paths (`/studio`, `/pricing`, `/products`, `/locations`, incl. locale-prefixed and deep variants) as a safety net for inbound links, but a redirect chain leaks a little link equity — fix it at the source.
- **Google Business Profile**: EDIT the existing profile name to "Arranto" (https://business.google.com) — never create a new profile; this preserves the 118 reviews.
- **Known audit exception**: `npm audit` reports 2 moderate advisories in `postcss` bundled inside Next.js itself; the proposed "fix" downgrades Next to v9 (nonsense). Build-time-only exposure. Re-check after each `next` upgrade.
