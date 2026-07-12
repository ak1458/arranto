# Arranto

Founder-led software studio site. Next.js 16 App Router, bilingual EN/AR (RTL), dark-only, hosted on Vercel.

- **Build state + task list:** [`../MASTER-CONTEXT.md`](../MASTER-CONTEXT.md)
- **Service setup (all keys, direct links):** [`docs/SETUP.md`](docs/SETUP.md)
- **Self-improvement agent:** [`docs/AGENT.md`](docs/AGENT.md)

## Run

```bash
npm install
cp .env.example .env.local   # fill in keys — see docs/SETUP.md
npm run dev
```

## What's under the hood

| Area | Where |
|------|-------|
| Pages (en/ar) | `src/app/[locale]/{,work,studio,contact,legal}` |
| Case-study content (single source of truth) | `src/content/work.ts` |
| Contact API (Zod + honeypot + 5/hr rate limit → Supabase) | `src/app/api/contact/route.ts` |
| Chatbot API (OpenRouter, streaming, honesty rules) | `src/app/api/chat/route.ts` |
| Self-improvement agent (daily Vercel cron: GA4 + GSC → AI analysis) | `src/app/api/cron/agent/route.ts` |
| Weekly fix proposals (local, reviewed) | `npm run agent:improve` |
| AI-crawler content (GEO) | `/llms.txt`, `/llms-full.txt` |
| Security headers + CSP | `next.config.ts` |
| DB schema | `supabase/migrations/001_init.sql` |
