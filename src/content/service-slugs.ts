// Slugs that have a real /services/[slug] page (one per entry in services.ts).
// Kept separate so client components (Footer) can link services without bundling
// the full service copy. tests/agent-readiness.test.mjs fails if a footer link 404s.
export const SERVICE_PAGE_SLUGS = new Set([
  "ai-automation",
  "ai-saas-development",
  "custom-ai-solutions",
  "crm-development",
  "website-development",
  "mobile-app-development",
  "digital-marketing",
  "custom-software-development",
  "zatca-e-invoicing",
]);
