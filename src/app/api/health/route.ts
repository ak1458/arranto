import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

// Feature availability without leaking anything — booleans only.
export async function GET(req: Request) {
  const rl = rateLimit(clientKey(req, "health"), LIMITS.health);
  if (!rl.ok) return tooMany(rl.retryAfterSec);
  return Response.json({
    ok: true,
    features: {
      ai: !!process.env.OPENROUTER_API_KEY,
      db: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      google: !!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
    },
  });
}
