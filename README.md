<p align="center"><img src=".github/assets/readme-header.svg" alt="Arranto — Bilingual software studio · Web applications &amp; automation" width="100%" /></p>

# Arranto

Arranto is a software-studio website and a set of server-side tools in one Next.js application. Visitors can browse services, read project case studies, contact the studio, or use its assistant and content utilities. English and Arabic routes share the application structure, while translations and logical CSS properties support right-to-left layouts. The source is useful for understanding how the marketing site, localized content, API handlers, and integration settings fit together.

[![Stars](https://img.shields.io/github/stars/ak1458/arranto?style=flat-square)](https://github.com/ak1458/arranto/stargazers)
[![Watching](https://img.shields.io/github/watchers/ak1458/arranto?style=flat-square&label=watching)](https://github.com/ak1458/arranto/watchers)
[![Forks](https://img.shields.io/github/forks/ak1458/arranto?style=flat-square)](https://github.com/ak1458/arranto/forks)
[![Activity](https://img.shields.io/github/last-commit/ak1458/arranto?style=flat-square)](https://github.com/ak1458/arranto/activity)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-64748b?style=flat-square)](LICENSE)

**[How it works](#how-it-works) · [Run locally](#run-locally) · [Configuration](#configuration) · [Commands](#development-commands) · [Versions](#versions-and-distribution) · [License](#license)**

## How it works

1. A visitor enters a locale route and receives the corresponding navigation, translated copy, and metadata.
2. Service, blog, and work pages read the repository’s structured content rather than a second CMS application.
3. Assistant and tool requests reach server-side API routes, where configured providers and request limits apply.
4. Analytics and search integrations run only when their environment configuration is present.

## Architecture

| Path | Purpose |
| --- | --- |
| [src/app/[locale]/](<src/app/[locale]/>) | Localized page routes and layouts. |
| [src/app/api/](<src/app/api/>) | Chat, contact, audit, proposal, and content-tool handlers. |
| [src/content/](<src/content/>) | Service, work, and blog data. |
| [src/lib/](<src/lib/>) | Provider, metadata, and integration helpers. |
| [tests/](<tests/>) | Node-based negotiation, SEO, and agent-readiness checks. |

## What is here

- Locale-based pages with English/Arabic translations and RTL support.
- Service pages, a blog, and project case studies.
- Server routes for chat, website audits, proposals, and content tools.
- Sitemap, robots, metadata helpers, and analytics integration code.

## Run locally

```bash
git clone https://github.com/ak1458/arranto.git
cd arranto
npm ci
cp .env.example .env.local
npm run dev
```

Fill in the integrations you need using [.env.example](.env.example). Provider, email, analytics, and Google API credentials belong on the server. Optional integrations need their own configuration.

## Engineering notes

| Area | Location |
| --- | --- |
| Localized pages | `src/app/[locale]/` |
| Server routes | `src/app/api/` |
| Content and translations | `src/content/`, `src/messages/` |
| Checks | `tests/`, `scripts/` |

Available checks: `npm test`, `npm run test:seo`, `npm run test:agent`, `npm run lint`, and `npm run build`. The build also checks logical CSS properties and translation keys.

Deployment and integration state are documented in [the handoff](docs/HANDOFF.md). Search features are implementation details, not a ranking guarantee.


## Configuration

Settings template: [.env.example](<.env.example>). Copy it to the application’s local environment file and fill only the integrations you use.

| Variable | Purpose |
| --- | --- |
| `OPENROUTER_API_KEY` | Provider credential. Keep server-side; public-prefixed legacy options must not contain production secrets. |
| `OPENROUTER_MODEL` | Model identifier used by the selected provider integration. |
| `AI_PROVIDER` | Provider selection used by the corresponding integration. |
| `GROQ_API_KEY` | Provider credential. Keep server-side; public-prefixed legacy options must not contain production secrets. |
| `GROQ_MODEL` | Model identifier used by the selected provider integration. |
| `NVIDIA_API_KEY` | Provider credential. Keep server-side; public-prefixed legacy options must not contain production secrets. |
| `NVIDIA_MODEL` | Model identifier used by the selected provider integration. |
| `AI_DAILY_IP_CAP` | Optional configuration; see the linked template and its consuming module for accepted values. |
| `AI_DAILY_GLOBAL_CAP` | Optional configuration; see the linked template and its consuming module for accepted values. |
| `PROPOSAL_SECRET` | Server-side proposal operation secret. |
| `CRON_SECRET` | Server secret protecting scheduled-operation routes. |
| `GOOGLE_APPLICATION_CREDENTIALS_JSON` | Optional configuration; see the linked template and its consuming module for accepted values. |
| `GA4_PROPERTY_ID` | Analytics/search-property configuration; does not itself supply account access. |
| `SEARCH_CONSOLE_SITE_URL` | Endpoint for the corresponding integration; verify the expected service and environment. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Analytics/search-property configuration; does not itself supply account access. |
| `NEXT_PUBLIC_GTM_ID` | Analytics/search-property configuration; does not itself supply account access. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Analytics/search-property configuration; does not itself supply account access. |
| `RESEND_API_KEY` | Provider credential. Keep server-side; public-prefixed legacy options must not contain production secrets. |
| `RESEND_FROM` | Optional configuration; see the linked template and its consuming module for accepted values. |
| `ADMIN_EMAIL` | Optional configuration; see the linked template and its consuming module for accepted values. |
| `SITE_URL` | Application origin/redirect setting; match the target environment. |

Environment files and provider tokens must remain untracked. A public client prefix exposes a value in the browser bundle; it is not a safe place for privileged credentials.

## Development commands

Workspace: [package.json](<package.json>). Run these commands from its directory.

| Command | Script defined in manifest |
| --- | --- |
| `npm run dev` | `next dev` |
| `npm run build` | `node scripts/check-logical-props.mjs && node scripts/check-i18n-keys.mjs && next build` |
| `npm run start` | `next start` |
| `npm run lint` | `eslint` |
| `npm run test` | `node --test tests/negotiate.test.mjs` |
| `npm run test:agent` | `node --test tests/agent-readiness.test.mjs` |
| `npm run test:seo` | `node --test tests/seo.test.mjs` |
| `npm run lint:rtl` | `node scripts/check-logical-props.mjs` |

These are available commands, not a claim that all checks passed in this documentation pass. Connected checks require the services, credentials, and isolated data described above.

## Operational notes

Start with a local environment and configure one integration at a time. A successful page render does not establish that email delivery, analytics collection, or provider-backed tools are configured. The build intentionally checks translation keys and logical CSS properties before the Next.js build. Keep those checks when changing layouts or locales.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| A tool cannot produce output | Check its provider selection, server environment, and request limits; a static marketing page does not exercise those integrations. |
| Arabic layout or copy differs | Check locale keys and logical CSS properties; run the translation/RTL checks rather than hardcoding a second layout. |
| Analytics shows no data | Review docs/ANALYTICS.md and verify the correct property/configuration in the target environment. |

## Versions and distribution

Manifest versions are application/workspace metadata, not a certification of release readiness.

| Manifest | Declared version |
| --- | --- |
| [package.json](<package.json>) | `0.1.0` |

No published GitHub Release or version tag was recorded in this snapshot. The default branch is a development/source snapshot; it must not be described as a stable downloadable release merely to populate the sidebar.

GitHub Packages is a separate registry. This README does not imply that a registry package exists; use the installation path documented here rather than an invented package-install command.

## Documentation and maintenance

- [docs/HANDOFF.md](<docs/HANDOFF.md>)
- [docs/SEO-ARCHITECTURE.md](<docs/SEO-ARCHITECTURE.md>)
- [docs/ANALYTICS.md](<docs/ANALYTICS.md>)

Include the affected workflow, reproduction steps, and relevant check output when reporting a problem. Do not include credentials or live customer data.

## License

This repository’s project code is **proprietary / all rights reserved**. Public visibility does not grant unrestricted reuse. Read [LICENSE](<LICENSE>) for the exact terms. Third-party dependencies and bundled components retain their own notices.
