import { z } from "zod";
import { env } from "@/lib/env";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

const Inquiry = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  message: z.string().trim().min(1).max(5000),
  locale: z.enum(["en", "ar"]).default("en"),
  botcheck: z.string().optional(), // honeypot — any value means bot
});

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req, "contact"), LIMITS.contact);
  if (!rl.ok) return tooMany(rl.retryAfterSec);

  const body = await req.json().catch(() => null);
  const parsed = Inquiry.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });

  const { botcheck, ...inquiry } = parsed.data;
  if (botcheck) return Response.json({ ok: true }); // silent discard, bot sees success

  if (!env.web3formsKey) {
    console.error("WEB3FORMS_KEY is not configured in environment variables.");
    return Response.json({ error: "Contact service unconfigured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: env.web3formsKey,
        subject: `Arranto Studio — New Inquiry from ${inquiry.name}`,
        ...inquiry,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Web3Forms HTTP ${res.status}: ${text}`);
    }
  } catch (e) {
    console.error("Web3Forms submit failed:", e instanceof Error ? e.message : e);
    return Response.json({ error: "Could not send message" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
