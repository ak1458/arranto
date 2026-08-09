// Resend admin notification, extracted from app/api/contact/route.ts so the
// AI agent's submit_inquiry / submit_consultation tools share the same pipeline.
// Sends to the site owner's inbox only (no user emails, no attachments).
//
// Replaced Web3Forms (2026-08-09): Web3Forms's free tier only accepts calls made
// directly from a browser — server-side calls (this route, and every AI-agent
// tool call) get blocked by their Cloudflare bot challenge with a 403, even with
// a valid access_key. Resend is built for server-side sending and has no such
// restriction on its free tier.
import { Resend } from "resend";
import { env } from "@/lib/env";

export async function sendAdminEmail(
  subject: string,
  fields: Record<string, string | undefined>,
): Promise<{ ok: true } | { error: string }> {
  if (!env.resendKey) {
    console.error("RESEND_API_KEY is not configured in environment variables.");
    return { error: "Contact service unconfigured" };
  }
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 8px;color:#888;vertical-align:top">${k}</td><td style="padding:4px 8px">${String(v).replace(/</g, "&lt;")}</td></tr>`)
    .join("");
  try {
    const resend = new Resend(env.resendKey);
    const { error } = await resend.emails.send({
      from: env.resendFrom,
      to: env.adminEmail,
      replyTo: fields.email,
      subject,
      html: `<table>${rows}</table>`,
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    return { ok: true };
  } catch (e) {
    console.error("Resend send failed:", e instanceof Error ? e.message : e);
    return { error: "Could not send message" };
  }
}
