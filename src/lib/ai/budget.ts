// Usage restrictions for the AI agent (design §5), layered on the existing
// in-memory limiter. Same tradeoff as rate-limit.ts: per serverless instance,
// approximate under scale-out — acceptable at this traffic level.
import { rateLimit } from "@/lib/rate-limit";

const DAY_MS = 24 * 60 * 60 * 1000;

const intEnv = (name: string, fallback: number) => {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
};

export type BudgetCheck = { ok: true } | { ok: false; reason: "ip" | "global" };

export function chatBudget(ip: string): BudgetCheck {
  const daily = rateLimit(`chat-day:${ip}`, { limit: intEnv("AI_DAILY_IP_CAP", 40), windowMs: DAY_MS });
  if (!daily.ok) return { ok: false, reason: "ip" };
  const global = rateLimit("chat-global-day", { limit: intEnv("AI_DAILY_GLOBAL_CAP", 500), windowMs: DAY_MS });
  if (!global.ok) return { ok: false, reason: "global" };
  return { ok: true };
}

export const consultBudget = (ip: string) =>
  rateLimit(`consult-day:${ip}`, { limit: 3, windowMs: DAY_MS });

// Static fallback copy for exhausted budgets — localized without an AI call.
export const BUDGET_MESSAGE: Record<string, string> = {
  en: "The assistant has reached its daily capacity. Please reach the founder directly via the contact page — every message there is read personally.",
  ar: "وصل المساعد إلى سعته اليومية. يمكنك التواصل مع المؤسس مباشرة عبر صفحة التواصل — كل رسالة تُقرأ شخصيًا.",
};
