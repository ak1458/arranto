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
  // Free-phase default (owner decision 2026-07-16, model pinned 2026-07-16 after
  // live A/B against tool-calling free models — see MASTER-CONTEXT §7P). The
  // openrouter/free auto-router was tried first but gave inconsistent quality;
  // tencent/hy3:free tool-calls correctly and writes clean prose. Swap via
  // OPENROUTER_MODEL. Rejected: openai/gpt-oss-20b:free (garbled non-Latin
  // tokens spliced into English output), google/gemma-4-31b-it:free (upstream
  // 429s on the free Google AI Studio tier).
  get model() { return process.env.OPENROUTER_MODEL ?? "tencent/hy3:free"; },
  get cronSecret() { return required("CRON_SECRET"); },
  get googleCredentials() { return required("GOOGLE_APPLICATION_CREDENTIALS_JSON"); },
  get ga4PropertyId() { return required("GA4_PROPERTY_ID"); },
  get searchConsoleSiteUrl() { return required("SEARCH_CONSOLE_SITE_URL"); },
  get siteUrl() { return process.env.SITE_URL ?? "https://arranto.com"; },
  get web3formsKey() { return process.env.WEB3FORMS_KEY; }, // optional
};
