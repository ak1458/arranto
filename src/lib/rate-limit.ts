// In-memory sliding-window limiter. Per serverless instance, so limits are
// approximate under scale-out — acceptable at this traffic level. Swap for
// Upstash Redis if the site ever needs strict global limits.
type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

export const LIMITS = {
  contact: { limit: 5, windowMs: 60 * 60 * 1000 },
  chat: { limit: 10, windowMs: 60 * 1000 },
  health: { limit: 5, windowMs: 60 * 1000 },
} as const;

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  if (buckets.size >= MAX_BUCKETS) {
    for (const [k, b] of buckets) if (now > b.reset) buckets.delete(k);
    if (buckets.size >= MAX_BUCKETS) buckets.clear(); // fail open over unbounded memory
  }
  const b = buckets.get(key);
  if (!b || now > b.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  b.count++;
  return { ok: b.count <= limit, retryAfterSec: Math.ceil((b.reset - now) / 1000) };
}

export function clientKey(req: Request, scope: string) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return `${scope}:${ip}`;
}

export const tooMany = (retryAfterSec: number) =>
  Response.json(
    { error: "Too many requests" },
    { status: 429, headers: { "Retry-After": String(retryAfterSec) } },
  );
