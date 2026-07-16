import { z } from "zod";
import { runAgent } from "@/lib/ai/agent";
import { chatBudget, BUDGET_MESSAGE } from "@/lib/ai/budget";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

const Chat = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000),
      }),
    )
    .min(1)
    .max(30),
  locale: z.enum(["en", "ar"]).default("en"),
});

const NDJSON = { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store" };

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req, "chat"), LIMITS.chat);
  if (!rl.ok) return tooMany(rl.retryAfterSec);

  const body = await req.json().catch(() => null);
  const parsed = Chat.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });
  const { messages, locale } = parsed.data;

  const ip = clientKey(req, "").slice(1); // bare IP for budget scoping
  const budget = chatBudget(ip);
  if (!budget.ok) {
    // Delivered as a normal assistant message so the widget renders it inline.
    const text = BUDGET_MESSAGE[locale] ?? BUDGET_MESSAGE.en;
    return new Response(JSON.stringify({ t: "delta", text }) + "\n" + JSON.stringify({ t: "done" }) + "\n", {
      headers: NDJSON,
    });
  }

  try {
    return new Response(runAgent(messages, { locale, ip }), { headers: NDJSON });
  } catch {
    return Response.json({ error: "Assistant unavailable, try again shortly" }, { status: 503 });
  }
}
