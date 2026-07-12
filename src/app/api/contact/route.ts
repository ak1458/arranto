import { z } from "zod";
import { db } from "@/lib/supabase";
import { env } from "@/lib/env";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

const Inquiry = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  message: z.string().trim().min(1).max(5000),
  locale: z.enum(["en", "ar"]).default("en"),
  botcheck: z.string().optional(), // honeypot — any value means bot
});

// Optional side channel so the founder gets an email without checking Supabase.
async function notify(i: { name: string; email: string; message: string }) {
  if (!env.web3formsKey) return;
  await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_key: env.web3formsKey, subject: "arranto.com — new inquiry", ...i }),
    signal: AbortSignal.timeout(10_000),
  }).catch((e) => console.error("web3forms notify failed:", e?.message));
}

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req, "contact"), LIMITS.contact);
  if (!rl.ok) return tooMany(rl.retryAfterSec);

  const body = await req.json().catch(() => null);
  const parsed = Inquiry.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });

  const { botcheck, ...inquiry } = parsed.data;
  if (botcheck) return Response.json({ ok: true }); // silent discard, bot sees success

  const { error } = await db().from("inquiries").insert(inquiry);
  if (error) {
    console.error("inquiries insert:", error.message);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
  await notify(inquiry);
  return Response.json({ ok: true });
}
