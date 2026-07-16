// Agent loop (design §2): model ⇄ tools, ≤5 rounds, NDJSON event stream out.
// Events: {t:"delta",text} {t:"status",tool} {t:"link",href,kind} {t:"done"} {t:"error"}
import { getProvider, type AiMessage } from "@/lib/ai/provider";
import { toolSchemas, runTool, type ToolCtx } from "@/lib/ai/tools";
import { systemPrompt } from "@/lib/ai/prompt";

export type ClientMsg = { role: "user" | "assistant"; content: string };

const MAX_ROUNDS = 5;

export function runAgent(history: ClientMsg[], ctx: ToolCtx): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      const emit = (ev: Record<string, unknown>) =>
        controller.enqueue(enc.encode(JSON.stringify(ev) + "\n"));
      try {
        const provider = getProvider();
        const messages: AiMessage[] = [
          { role: "system", content: systemPrompt(ctx.locale) },
          ...history,
        ];
        for (let round = 0; round < MAX_ROUNDS; round++) {
          const res = await provider.complete(messages, {
            // Last round: no tools offered → the model must answer.
            tools: round < MAX_ROUNDS - 1 ? toolSchemas() : undefined,
            maxTokens: 700,
            timeoutMs: 50_000,
            onDelta: (text) => emit({ t: "delta", text }),
          });
          if (!res.toolCalls.length) break;

          messages.push({ role: "assistant", content: res.text, toolCalls: res.toolCalls });
          for (const tc of res.toolCalls) {
            emit({ t: "status", tool: tc.name });
            const out = await runTool(tc.name, tc.args, ctx);
            if (tc.name === "submit_consultation" && out !== null && typeof out === "object" && "proposalUrl" in out) {
              const links = out as { proposalUrl: string; pdfUrl?: string };
              emit({ t: "link", href: links.proposalUrl, kind: "proposal" });
              if (links.pdfUrl) emit({ t: "link", href: links.pdfUrl, kind: "pdf" });
            }
            // Cap tool output so a huge page fetch can't blow the context.
            messages.push({ role: "tool", toolCallId: tc.id, content: JSON.stringify(out).slice(0, 6000) });
          }
        }
        emit({ t: "done" });
      } catch (e) {
        console.error("Agent error:", e instanceof Error ? e.message : e);
        emit({ t: "error" });
      } finally {
        controller.close();
      }
    },
  });
}
