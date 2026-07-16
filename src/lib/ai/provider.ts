// Provider abstraction for the site's agentic AI (design: archive/docs/2026-07-16-ai-system-design.md).
// Swap vendors by adding an adapter that satisfies `Provider` and selecting it via AI_PROVIDER.
// Contract: `complete()` always streams under the hood; pass `onDelta` to surface answer
// tokens live. Tool calls are assembled from stream deltas and returned whole.
import { env } from "@/lib/env";

export type ToolCall = { id: string; name: string; args: unknown };

export type AiMessage =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string; toolCalls?: ToolCall[] }
  | { role: "tool"; content: string; toolCallId: string };

export type AiTool = {
  name: string;
  description: string;
  parameters: Record<string, unknown>; // JSON Schema
};

export type CompleteOpts = {
  tools?: AiTool[];
  maxTokens?: number;
  timeoutMs?: number;
  model?: string;
  onDelta?: (text: string) => void;
};

export type AiResult = { text: string; toolCalls: ToolCall[] };

export interface Provider {
  complete(messages: AiMessage[], opts?: CompleteOpts): Promise<AiResult>;
}

// ---------------------------------------------------------------- OpenRouter

type OpenAiMessage = Record<string, unknown>;

function toOpenAi(m: AiMessage): OpenAiMessage {
  if (m.role === "tool") return { role: "tool", content: m.content, tool_call_id: m.toolCallId };
  if (m.role === "assistant" && m.toolCalls?.length) {
    return {
      role: "assistant",
      content: m.content || null,
      tool_calls: m.toolCalls.map((tc) => ({
        id: tc.id,
        type: "function",
        function: { name: tc.name, arguments: JSON.stringify(tc.args) },
      })),
    };
  }
  return { role: m.role, content: m.content };
}

const openRouterProvider: Provider = {
  async complete(messages, opts = {}) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.openrouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": env.siteUrl,
        "X-Title": "Arranto",
      },
      body: JSON.stringify({
        model: opts.model ?? env.model,
        messages: messages.map(toOpenAi),
        max_tokens: opts.maxTokens ?? 700,
        stream: true,
        ...(opts.tools?.length && {
          tools: opts.tools.map((t) => ({
            type: "function",
            function: { name: t.name, description: t.description, parameters: t.parameters },
          })),
        }),
      }),
      signal: AbortSignal.timeout(opts.timeoutMs ?? 60_000),
    });
    if (!res.ok || !res.body) {
      console.error(`OpenRouter ${res.status}: ${(await res.text().catch(() => "")).slice(0, 500)}`);
      throw new Error("AI request failed");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";
    // tool_call fragments arrive keyed by index; ids/names once, arguments in pieces.
    const acc = new Map<number, { id?: string; name?: string; args: string }>();

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
        try {
          const delta = JSON.parse(line.slice(6)).choices?.[0]?.delta;
          if (!delta) continue;
          if (typeof delta.content === "string" && delta.content) {
            text += delta.content;
            opts.onDelta?.(delta.content);
          }
          for (const tc of delta.tool_calls ?? []) {
            const slot = acc.get(tc.index) ?? { args: "" };
            if (tc.id) slot.id = tc.id;
            if (tc.function?.name) slot.name = tc.function.name;
            if (tc.function?.arguments) slot.args += tc.function.arguments;
            acc.set(tc.index, slot);
          }
        } catch { /* keepalive/partial lines */ }
      }
    }

    const toolCalls: ToolCall[] = [];
    for (const [i, slot] of [...acc.entries()].sort((a, b) => a[0] - b[0])) {
      if (!slot.name) continue;
      let args: unknown = {};
      try { args = slot.args ? JSON.parse(slot.args) : {}; } catch { /* malformed args → {} */ }
      toolCalls.push({ id: slot.id ?? `call_${i}`, name: slot.name, args });
    }
    return { text, toolCalls };
  },
};

export function getProvider(): Provider {
  const name = process.env.AI_PROVIDER ?? "openrouter";
  if (name === "openrouter") return openRouterProvider;
  // Future adapters (e.g. "anthropic") register here.
  throw new Error(`Unknown AI_PROVIDER: ${name}`);
}
