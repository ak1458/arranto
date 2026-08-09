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
  // This "openrouter" provider branch is a fallback only — production runs
  // AI_PROVIDER=groq-with-nvidia-fallback (see provider.ts), which is where
  // the tested primary model lives. tencent/hy3:free (pinned 2026-07-16, see
  // MASTER-CONTEXT §7P) was deprecated to paid-only by OpenRouter on
  // 2026-07-21 and 404s now — swapped to another free tool-calling model
  // 2026-08-09. Rejected previously: openai/gpt-oss-20b:free (garbled
  // non-Latin tokens spliced into English output), google/gemma-4-31b-it:free
  // (upstream 429s on the free Google AI Studio tier). Swap via OPENROUTER_MODEL.
  get model() { return process.env.OPENROUTER_MODEL ?? "nvidia/nemotron-3-nano-30b-a3b:free"; },
  get cronSecret() { return required("CRON_SECRET"); },
  get googleCredentials() { return required("GOOGLE_APPLICATION_CREDENTIALS_JSON"); },
  get ga4PropertyId() { return required("GA4_PROPERTY_ID"); },
  get searchConsoleSiteUrl() { return required("SEARCH_CONSOLE_SITE_URL"); },
  get siteUrl() { return process.env.SITE_URL ?? "https://arranto.com"; },
  get resendKey() { return process.env.RESEND_API_KEY; }, // optional — degrades to "unconfigured" when unset
  get resendFrom() { return process.env.RESEND_FROM ?? "Arranto <onboarding@resend.dev>"; },
  get adminEmail() { return process.env.ADMIN_EMAIL ?? "help@arranto.com"; },
};
