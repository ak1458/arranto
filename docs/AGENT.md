# Self-Improvement Agent

Two halves: a **cloud half** that runs with your PC off, and a **local half** you run weekly that turns findings into reviewable fix proposals.

## Cloud half — automatic, daily

Vercel Cron ([`vercel.json`](../vercel.json)) hits `GET /api/cron/agent` at 02:00 UTC daily:

1. Pulls a 28-day **GA4** snapshot (top pages, countries, sources) and **Search Console** snapshot (top queries + pages with clicks/impressions/CTR/position). Missing sources are tolerated — it reports on whatever is configured.
2. Sends the data to OpenRouter with a growth-engineer prompt: problems, opportunities, prioritized recommendations, each tagged `[auto-fixable]` or `[owner]`.
3. Stores the report in Supabase `agent_reports`.

It only reads analytics and writes reports — it can never touch production code or crash the site. Failures return an error response and are visible in Vercel logs (project → **Observability → Logs**).

Read the latest report anytime:

```bash
curl -H "x-agent-key: $CRON_SECRET" https://arranto.com/api/agent/latest
```

## Local half — weekly, one command

```bash
npm run agent:improve
```

1. Fetches all unprocessed reports from Supabase.
2. Asks the AI to convert every `[auto-fixable]` recommendation into concrete file-level changes (exact content/diffs), and lists `[owner]` items as a checklist.
3. Writes proposals to `reports/agent/<date>.md` (git-ignored) and marks the reports processed.
4. **You review, apply what you approve, commit, deploy.** The agent never edits code itself — every change passes through your eyes and git.

## Why this split (honest answer)

A serverless function editing its own deployed code is technically possible (commit via GitHub API → redeploy) but a bad idea: an AI hallucination would deploy straight to production with nobody watching. Analysis is safe to automate; application of changes gets a human gate. If a pilot proves the proposals are consistently safe, the local half can later be promoted to open pull requests automatically — the code is one step from that.

## Weekly routine (5 minutes)

1. `npm run agent:improve`
2. Open `reports/agent/<today>.md`
3. Apply what you agree with (or paste the file into Claude Code: "apply these")
4. `git commit` → `git push` → Vercel redeploys
