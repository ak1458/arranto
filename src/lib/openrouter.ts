import { env } from "./env";

export type Msg = { role: "system" | "user" | "assistant"; content: string };

type Opts = { model?: string; maxTokens?: number; timeoutMs?: number };

const API = "https://openrouter.ai/api/v1/chat/completions";

async function call(messages: Msg[], stream: boolean, opts: Opts = {}) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.openrouterKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": env.siteUrl,
      "X-Title": "Arranto",
    },
    body: JSON.stringify({
      model: opts.model ?? env.model,
      messages,
      max_tokens: opts.maxTokens ?? 1024,
      stream,
    }),
    signal: AbortSignal.timeout(opts.timeoutMs ?? 60_000),
  });
  if (!res.ok) {
    // Log detail server-side only; callers surface a generic message.
    console.error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 500)}`);
    throw new Error("AI request failed");
  }
  return res;
}

export async function chat(messages: Msg[], opts?: Opts): Promise<string> {
  const res = await call(messages, false, opts);
  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

// Returns a plain-text ReadableStream extracted from OpenRouter's SSE stream.
export async function chatStream(messages: Msg[], opts?: Opts): Promise<ReadableStream<Uint8Array>> {
  const res = await call(messages, true, opts);
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) return controller.close();
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
        try {
          const delta = JSON.parse(line.slice(6)).choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        } catch { /* ignore partial/keepalive lines */ }
      }
    },
    cancel() { reader.cancel(); },
  });
}
