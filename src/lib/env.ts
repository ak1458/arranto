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
  get model() { return process.env.OPENROUTER_MODEL ?? "anthropic/claude-sonnet-4.5"; },
  get cronSecret() { return required("CRON_SECRET"); },
  get googleCredentials() { return required("GOOGLE_APPLICATION_CREDENTIALS_JSON"); },
  get ga4PropertyId() { return required("GA4_PROPERTY_ID"); },
  get searchConsoleSiteUrl() { return required("SEARCH_CONSOLE_SITE_URL"); },
  get siteUrl() { return process.env.SITE_URL ?? "https://arranto.com"; },
  get web3formsKey() { return process.env.WEB3FORMS_KEY; }, // optional
};
