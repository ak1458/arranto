# Arranto

The Arranto software studio website: English and Arabic pages, project case studies, and server-side automation tools.

[![Next.js: App Router](https://img.shields.io/badge/Next.js-App%20Router-111827?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript: Typed](https://img.shields.io/badge/TypeScript-Typed-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-64748B?style=flat-square)](LICENSE)

[Website](https://arranto.com) · [Architecture](docs/SEO-ARCHITECTURE.md) · [Setup notes](docs/HANDOFF.md)

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

## License

Copyright © 2026 Ashraf Kamal. Reuse is restricted by [LICENSE](LICENSE).
