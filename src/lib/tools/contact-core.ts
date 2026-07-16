// Web3Forms admin notification, extracted from app/api/contact/route.ts so the
// AI agent's submit_inquiry / submit_consultation tools share the same pipeline.
// Free tier: sends to the site owner's inbox only (no user emails, no attachments).
import { env } from "@/lib/env";

export async function sendAdminEmail(
  subject: string,
  fields: Record<string, string | undefined>,
): Promise<{ ok: true } | { error: string }> {
  if (!env.web3formsKey) {
    console.error("WEB3FORMS_KEY is not configured in environment variables.");
    return { error: "Contact service unconfigured" };
  }
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: env.web3formsKey, subject, ...fields }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Web3Forms HTTP ${res.status}: ${text}`);
    }
    return { ok: true };
  } catch (e) {
    console.error("Web3Forms submit failed:", e instanceof Error ? e.message : e);
    return { error: "Could not send message" };
  }
}
