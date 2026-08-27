import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env.local parser
const envContent = readFileSync(join(root, ".env.local"), "utf8");
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) {
    process.env[m[1]] = m[2].trim();
  }
}

const b64url = (s) =>
  Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function getGoogleToken(scope) {
  const sa = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  const iat = Math.floor(Date.now() / 1000);
  const unsigned =
    b64url(JSON.stringify({ alg: "RS256", typ: "JWT" })) +
    "." +
    b64url(JSON.stringify({ iss: sa.client_email, scope, aud: sa.token_uri, iat, exp: iat + 3600 }));
  const signature = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key);
  const jwt = `${unsigned}.${b64url(signature)}`;

  console.log(`[AUTH] Requesting token for scope: ${scope}`);
  console.log(`[AUTH] Service Account: ${sa.client_email}`);

  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`[AUTH ERROR] Status ${res.status}: ${text}`);
    throw new Error("Token exchange failed");
  }

  const data = JSON.parse(text);
  console.log(`[AUTH SUCCESS] Received access token (expires in ${data.expires_in}s)`);
  return data.access_token;
}

async function testGA4() {
  console.log("\n=== TESTING GA4 ===");
  try {
    const token = await getGoogleToken("https://www.googleapis.com/auth/analytics.readonly");
    const propertyId = process.env.GA4_PROPERTY_ID;
    console.log(`[GA4] Querying Property: ${propertyId}`);

    const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
    const body = {
      dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
      limit: 10,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log(`[GA4 Response] Status: ${res.status}`);
    if (!res.ok) {
      console.error(`[GA4 Error Body]: ${text}`);
    } else {
      const data = JSON.parse(text);
      console.log(`[GA4 Success] Row count: ${data.rowCount ?? 0}`);
      console.log("Sample rows:", JSON.stringify(data.rows?.slice(0, 3), null, 2));
    }
  } catch (err) {
    console.error(`[GA4 Exception]:`, err);
  }
}

async function testGSC() {
  console.log("\n=== TESTING GOOGLE SEARCH CONSOLE ===");
  try {
    const token = await getGoogleToken("https://www.googleapis.com/auth/webmasters.readonly");
    
    // 1. List sites
    console.log(`[GSC] Listing verified sites for service account...`);
    const sitesRes = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const sitesText = await sitesRes.text();
    console.log(`[GSC Sites List] Status: ${sitesRes.status}`);
    if (!sitesRes.ok) {
      console.error(`[GSC Sites List Error]: ${sitesText}`);
    } else {
      console.log(`[GSC Verified Sites]: ${sitesText}`);
    }

    // 2. Query Search Analytics
    const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL;
    console.log(`[GSC] Querying site: ${siteUrl}`);
    const end = new Date();
    const start = new Date(end.getTime() - 28 * 86_400_000);
    const iso = (d) => d.toISOString().slice(0, 10);

    const queryUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
    const queryBody = {
      startDate: iso(start),
      endDate: iso(end),
      dimensions: ["query"],
      rowLimit: 10,
    };

    const qRes = await fetch(queryUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryBody),
    });

    const qText = await qRes.text();
    console.log(`[GSC Query Response] Status: ${qRes.status}`);
    if (!qRes.ok) {
      console.error(`[GSC Query Error Body]: ${qText}`);
    } else {
      const qData = JSON.parse(qText);
      console.log(`[GSC Success] Rows:`, JSON.stringify(qData.rows?.slice(0, 5), null, 2));
    }
  } catch (err) {
    console.error(`[GSC Exception]:`, err);
  }
}

async function run() {
  await testGA4();
  await testGSC();
}

run();
