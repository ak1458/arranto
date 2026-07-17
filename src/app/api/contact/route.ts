import { z } from "zod";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";
import { sendAdminEmail } from "@/lib/tools/contact-core";

const Inquiry = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  service: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(100).optional(),
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

  const sent = await sendAdminEmail(`Arranto Studio — New Inquiry from ${inquiry.name}`, inquiry);
  if ("error" in sent) {
    const status = sent.error === "Contact service unconfigured" ? 503 : 500;
    return Response.json({ error: sent.error }, { status });
  }
  return Response.json({ ok: true });
}
