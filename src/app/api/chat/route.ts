import { z } from "zod";
import { chatStream } from "@/lib/openrouter";
import { chatSystemPrompt } from "@/lib/site-context";
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
});

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req, "chat"), LIMITS.chat);
  if (!rl.ok) return tooMany(rl.retryAfterSec);

  const body = await req.json().catch(() => null);
  const parsed = Chat.safeParse(body);
  if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 });

  try {
    const stream = await chatStream(
      [{ role: "system", content: chatSystemPrompt() }, ...parsed.data.messages],
      { maxTokens: 500, timeoutMs: 30_000 },
    );
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "Assistant unavailable, try again shortly" }, { status: 503 });
  }
}
