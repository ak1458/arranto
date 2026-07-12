import { createSign } from "node:crypto";
import { env } from "./env";

// Service-account OAuth2 (JWT bearer flow) with stdlib crypto — replaces the
// googleapis package for the two read-only APIs the agent uses.
const b64url = (s: string | Buffer) =>
  Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const cache = new Map<string, { token: string; exp: number }>();

export async function googleToken(scope: string): Promise<string> {
  const hit = cache.get(scope);
  if (hit && Date.now() < hit.exp - 60_000) return hit.token;

  const sa = JSON.parse(env.googleCredentials);
  const iat = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url(JSON.stringify({ alg: "RS256", typ: "JWT" })) +
    "." +
    b64url(JSON.stringify({ iss: sa.client_email, scope, aud: sa.token_uri, iat, exp: iat + 3600 }));
  const signature = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key);
  const jwt = `${unsigned}.${b64url(signature)}`;

  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    console.error(`Google token exchange ${res.status}: ${(await res.text()).slice(0, 300)}`);
    throw new Error("Google auth failed");
  }
  const { access_token, expires_in } = await res.json();
  cache.set(scope, { token: access_token, exp: Date.now() + expires_in * 1000 });
  return access_token;
}

export async function googleFetch(url: string, scope: string, init?: RequestInit) {
  const token = await googleToken(scope);
  const res = await fetch(url, {
    ...init,
    headers: { ...init?.headers, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!res.ok) {
    console.error(`Google API ${res.status} ${url}: ${(await res.text()).slice(0, 300)}`);
    throw new Error("Google API request failed");
  }
  return res.json();
}
