import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createSign } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local
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

  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) throw new Error(`Auth failed: ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

// -------------------------------------------------------------
// GA4 Fetcher
// -------------------------------------------------------------
async function runGA4Report(token, propertyId, { dimensions, metrics, dateRanges, limit = 100, dimensionFilter }) {
  const body = {
    dateRanges: dateRanges || [{ startDate: "90daysAgo", endDate: "today" }],
    dimensions: dimensions.map(name => ({ name })),
    metrics: metrics.map(name => ({ name })),
    limit,
    dimensionFilter
  };

  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`GA4 report error: ${res.status} ${errText}`);
    return { error: errText, rows: [] };
  }

  const json = await res.json();
  const rows = (json.rows || []).map(r => {
    const row = {};
    dimensions.forEach((d, idx) => {
      row[d] = r.dimensionValues[idx]?.value;
    });
    metrics.forEach((m, idx) => {
      row[m] = isNaN(Number(r.metricValues[idx]?.value)) ? r.metricValues[idx]?.value : Number(r.metricValues[idx]?.value);
    });
    return row;
  });

  return {
    rowCount: json.rowCount || 0,
    rows,
    totals: json.totals,
  };
}

// -------------------------------------------------------------
// GSC Fetcher
// -------------------------------------------------------------
async function runGSCQuery(token, siteUrl, { startDate, endDate, dimensions, rowLimit = 100, dimensionFilterGroups }) {
  const body = {
    startDate,
    endDate,
    dimensions,
    rowLimit,
    dimensionFilterGroups
  };

  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`GSC query error: ${res.status} ${errText}`);
    return { error: errText, rows: [] };
  }

  const json = await res.json();
  const rows = (json.rows || []).map(r => ({
    keys: r.keys,
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: Number((r.ctr * 100).toFixed(2)),
    position: Number(r.position.toFixed(1))
  }));

  return { rows };
}

async function getGSCSitemaps(token, siteUrl) {
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    return { error: await res.text() };
  }
  return res.json();
}

async function inspectGSCUrl(token, siteUrl, inspectionUrl) {
  const res = await fetch(`https://searchconsole.googleapis.com/v1/urlInspection/index:inspect`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inspectionUrl,
      siteUrl,
    }),
  });
  if (!res.ok) {
    return { error: await res.text() };
  }
  return res.json();
}

// -------------------------------------------------------------
// MAIN EXECUTION
// -------------------------------------------------------------
async function main() {
  console.log("=== COMPREHENSIVE GA4 & GSC AUDIT & DATA EXTRACTION ===");
  const gaToken = await getGoogleToken("https://www.googleapis.com/auth/analytics.readonly");
  const gscToken = await getGoogleToken("https://www.googleapis.com/auth/webmasters.readonly");
  const gscInspectToken = await getGoogleToken("https://www.googleapis.com/auth/webmasters");

  const propertyId = process.env.GA4_PROPERTY_ID;
  const siteUrl = process.env.SEARCH_CONSOLE_SITE_URL;

  console.log(`GA4 Property: ${propertyId}`);
  console.log(`GSC Site: ${siteUrl}\n`);

  // 1. GA4 Reports
  console.log("--> Fetching GA4 Overview (90 Days)...");
  const gaTopPages = await runGA4Report(gaToken, propertyId, {
    dimensions: ["pagePath", "pageTitle"],
    metrics: ["screenPageViews", "sessions", "activeUsers", "userEngagementDuration"],
    limit: 50
  });

  console.log("--> Fetching GA4 Traffic Channels & Sources...");
  const gaChannels = await runGA4Report(gaToken, propertyId, {
    dimensions: ["sessionDefaultChannelGroup", "sessionSource", "sessionMedium"],
    metrics: ["sessions", "activeUsers", "screenPageViews"],
    limit: 50
  });

  console.log("--> Fetching GA4 Geographic Breakdown...");
  const gaGeo = await runGA4Report(gaToken, propertyId, {
    dimensions: ["country", "city"],
    metrics: ["sessions", "activeUsers"],
    limit: 50
  });

  console.log("--> Fetching GA4 Events (CTA, clicks, conversions)...");
  const gaEvents = await runGA4Report(gaToken, propertyId, {
    dimensions: ["eventName"],
    metrics: ["eventCount", "totalUsers"],
    limit: 50
  });

  console.log("--> Fetching GA4 Device & OS...");
  const gaDevices = await runGA4Report(gaToken, propertyId, {
    dimensions: ["deviceCategory", "operatingSystem", "browser"],
    metrics: ["sessions", "activeUsers"],
    limit: 50
  });

  // 2. GSC Reports
  const today = new Date();
  const d90 = new Date(today.getTime() - 90 * 86_400_000).toISOString().slice(0, 10);
  const d28 = new Date(today.getTime() - 28 * 86_400_000).toISOString().slice(0, 10);
  const endIso = new Date(today.getTime() - 2 * 86_400_000).toISOString().slice(0, 10); // 2 days lag for GSC

  console.log(`--> Fetching GSC Sitemaps...`);
  const gscSitemaps = await getGSCSitemaps(gscToken, siteUrl);

  console.log(`--> Fetching GSC Queries (Last 90 Days: ${d90} to ${endIso})...`);
  const gscQueries90d = await runGSCQuery(gscToken, siteUrl, {
    startDate: d90,
    endDate: endIso,
    dimensions: ["query"],
    rowLimit: 100
  });

  console.log(`--> Fetching GSC Pages (Last 90 Days)...`);
  const gscPages90d = await runGSCQuery(gscToken, siteUrl, {
    startDate: d90,
    endDate: endIso,
    dimensions: ["page"],
    rowLimit: 100
  });

  console.log(`--> Fetching GSC Countries (Last 90 Days)...`);
  const gscCountries90d = await runGSCQuery(gscToken, siteUrl, {
    startDate: d90,
    endDate: endIso,
    dimensions: ["country"],
    rowLimit: 50
  });

  console.log(`--> Fetching GSC Devices (Last 90 Days)...`);
  const gscDevices90d = await runGSCQuery(gscToken, siteUrl, {
    startDate: d90,
    endDate: endIso,
    dimensions: ["device"],
    rowLimit: 50
  });

  // 3. Sample URL Inspection on key routes
  console.log(`--> Inspecting key URLs via GSC URL Inspection API...`);
  const urlsToInspect = [
    "https://arranto.com/en",
    "https://arranto.com/ar",
    "https://arranto.com/en/about",
    "https://arranto.com/ar/about",
    "https://arranto.com/en/work",
    "https://arranto.com/en/contact",
    "https://arranto.com/en/tools",
    "https://arranto.com/en/careers/ai-ml-engineer",
    "https://arranto.com/en/services/saas-mvp-development",
    "https://arranto.com/en/services/custom-software-development",
    "https://arranto.com/sitemap.xml",
    "https://arranto.com/",
    "https://www.arranto.com/"
  ];

  const inspectionResults = [];
  for (const u of urlsToInspect) {
    try {
      const res = await inspectGSCUrl(gscInspectToken, siteUrl, u);
      inspectionResults.push({
        url: u,
        status: res.inspectionResult?.indexStatusResult?.status || res.error || "UNKNOWN",
        verdict: res.inspectionResult?.indexStatusResult?.verdict || "UNKNOWN",
        coverageState: res.inspectionResult?.indexStatusResult?.coverageState || "UNKNOWN",
        crawledAs: res.inspectionResult?.indexStatusResult?.crawledAs || "UNKNOWN",
        lastCrawlTime: res.inspectionResult?.indexStatusResult?.lastCrawlTime || null,
        userCanonical: res.inspectionResult?.indexStatusResult?.userCanonical || null,
        googleCanonical: res.inspectionResult?.indexStatusResult?.googleCanonical || null,
        indexingState: res.inspectionResult?.indexStatusResult?.indexingState || null,
        pageFetchState: res.inspectionResult?.indexStatusResult?.pageFetchState || null,
        robotsTxtState: res.inspectionResult?.indexStatusResult?.robotsTxtState || null,
      });
      console.log(`  [Inspected] ${u} -> Verdict: ${res.inspectionResult?.indexStatusResult?.verdict} | Coverage: ${res.inspectionResult?.indexStatusResult?.coverageState}`);
    } catch (e) {
      inspectionResults.push({ url: u, error: e.message });
      console.error(`  [Inspection Failed] ${u}: ${e.message}`);
    }
  }

  const completeAuditOutput = {
    generatedAt: new Date().toISOString(),
    ga4: {
      topPages: gaTopPages,
      channels: gaChannels,
      geo: gaGeo,
      events: gaEvents,
      devices: gaDevices,
    },
    gsc: {
      sitemaps: gscSitemaps,
      queries: gscQueries90d,
      pages: gscPages90d,
      countries: gscCountries90d,
      devices: gscDevices90d,
      inspections: inspectionResults
    }
  };

  const outPath = join(root, "scripts", "live-google-audit-data.json");
  writeFileSync(outPath, JSON.stringify(completeAuditOutput, null, 2));
  console.log(`\n Audit data written to ${outPath}`);
}

main().catch(err => {
  console.error("FATAL ERROR:", err);
});
