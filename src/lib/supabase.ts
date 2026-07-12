import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

// Service-role client — server routes only. RLS has no public policies;
// this client is the sole write/read path (see supabase/migrations/001_init.sql).
let client: SupabaseClient | undefined;

export const db = () =>
  (client ??= createClient(env.supabaseUrl, env.supabaseServiceKey, {
    auth: { persistSession: false },
  }));
