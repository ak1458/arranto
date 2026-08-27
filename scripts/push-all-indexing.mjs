import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local
for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const b64url = (s) =>
  Buffer.from(s).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function getToken(scope) {
  const sa = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
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
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  if (!res.ok) throw new Error(`Auth: ${await res.text()}`);
  return (await res.json()).access_token;
}

const urls = [
  // Careers (JobPosting)
  "https://arranto.com/en/careers/ai-ml-engineer",
  "https://arranto.com/en/careers/business-development-executive",
  "https://arranto.com/ar/careers/ai-ml-engineer",
  "https://arranto.com/ar/careers/business-development-executive",
  "https://arranto.com/en/careers",
  "https://arranto.com/ar/careers",

  // Core Pages
  "https://arranto.com/en",
  "https://arranto.com/ar",
  "https://arranto.com/en/about",
  "https://arranto.com/ar/about",
  "https://arranto.com/en/work",
  "https://arranto.com/ar/work",
  "https://arranto.com/en/contact",
  "https://arranto.com/ar/contact",
  "https://arranto.com/en/tools",
  "https://arranto.com/ar/tools",
  
  // Services
  "https://arranto.com/en/services/saas-mvp-development",
  "https://arranto.com/ar/services/saas-mvp-development",
  "https://arranto.com/en/services/custom-software-development",
  "https://arranto.com/ar/services/custom-software-development",
  "https://arranto.com/en/services/ai-saas-development",
  "https://arranto.com/ar/services/ai-saas-development",
  "https://arranto.com/en/services/custom-ai-solutions",
  "https://arranto.com/ar/services/custom-ai-solutions",

  // Work Case Studies
  "https://arranto.com/en/work/fatoora-lite",
  "https://arranto.com/ar/work/fatoora-lite",
  "https://arranto.com/en/work/sanad-os",
  "https://arranto.com/ar/work/sanad-os",
  "https://arranto.com/en/work/sovereign-vault",
  "https://arranto.com/ar/work/sovereign-vault",
  "https://arranto.com/en/work/pulsekart",
  "https://arranto.com/ar/work/pulsekart"
];

async function submitAllToIndexingAPI() {
  console.log(`=== PUSHING ${urls.length} URLs TO GOOGLE INDEXING API ===\n`);
  const token = await getToken("https://www.googleapis.com/auth/indexing");

  let successCount = 0;
  let failCount = 0;

  for (const url of urls) {
    try {
      const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, type: "URL_UPDATED" }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ [SUCCESS] ${url} (Notify Time: ${data.urlNotificationMetadata?.latestUpdate?.notifyTime})`);
        successCount++;
      } else {
        console.error(`❌ [ERROR ${res.status}] ${url}: ${data.error?.message}`);
        failCount++;
      }
    } catch (e) {
      console.error(`❌ [EXCEPTION] ${url}: ${e.message}`);
      failCount++;
    }
  }

  console.log(`\n===========================================`);
  console.log(`Total Submitted: ${urls.length}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`===========================================`);
}

submitAllToIndexingAPI().catch(console.error);
