// Automated Data Collection & AI Lead Calling Engine for Arrento
import { sendAdminEmail } from "@/lib/tools/contact-core";

export interface LeadCallPayload {
  name: string;
  phone: string;
  email: string;
  company?: string;
  projectType: string;
  region?: string;
  preferredCallTime?: string;
  notes?: string;
}

/**
 * Executes structured lead data collection and dispatches automated phone call trigger
 */
export async function triggerLeadCall(payload: LeadCallPayload, locale: "en" | "ar" = "en") {
  const adminSubject = `🚨 URGENT Lead Call Request: ${payload.name} (${payload.company || "Individual"})`;
  
  // Send instant notification to founder inbox
  const emailResult = await sendAdminEmail(adminSubject, {
    name: payload.name,
    email: payload.email,
    company: payload.company ?? "N/A",
    project_type: payload.projectType,
    phone: payload.phone,
    preferred_time: payload.preferredCallTime ?? "ASAP",
    notes: payload.notes ?? "No additional notes",
    locale,
  });

  // Telephony Webhook Hook (e.g. Vapi / Bland.ai / Twilio AI call trigger)
  const webhookUrl = process.env.CALLING_WEBHOOK_URL;
  let callDispatched = false;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CALLING_WEBHOOK_TOKEN || ""}`,
        },
        body: JSON.stringify({
          phone_number: payload.phone,
          customer_name: payload.name,
          company: payload.company,
          prompt_summary: `Calling lead for ${payload.projectType} inquiry from ${payload.name} in ${payload.region || "GCC"}.`,
        }),
      });
      callDispatched = res.ok;
    } catch (err) {
      console.error("Calling Webhook dispatch failed:", err);
    }
  }

  const emailNotified = !("error" in emailResult);
  return {
    ok: true,
    emailNotified,
    callDispatched,
    message: `Lead data collected for ${payload.name}. `
      + (emailNotified ? "Founder notified by email. " : "Founder email notification failed. ")
      + (callDispatched ? "Automated call queued." : "No automated call was queued (calling isn't configured yet)."),
  };
}
