// Server-only typed env access. Getters fail at point of use, not boot,
// so features degrade independently when a key is missing.
if (typeof window !== "undefined") throw new Error("env.ts is server-only");

const required = (name: string): string => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name} (see docs/SETUP.md)`);
  return v;
};

export const env = {
  get openrouterKey() { return required("OPENROUTER_API_KEY"); },
  // Free-phase default (owner decision 2026-07-16): OpenRouter's free-model router,
  // which filters for tool-calling support per request. Swap via OPENROUTER_MODEL.
  get model() { return process.env.OPENROUTER_MODEL ?? "openrouter/free"; },
  get cronSecret() { return required("CRON_SECRET"); },
  get googleCredentials() { return required("GOOGLE_APPLICATION_CREDENTIALS_JSON"); },
  get ga4PropertyId() { return required("GA4_PROPERTY_ID"); },
  get searchConsoleSiteUrl() { return required("SEARCH_CONSOLE_SITE_URL"); },
  get siteUrl() { return process.env.SITE_URL ?? "https://arranto.com"; },
  get web3formsKey() { return process.env.WEB3FORMS_KEY; }, // optional
};
