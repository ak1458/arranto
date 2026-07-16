// Core of the Website Audit tool, extracted from app/api/audit/route.ts so the
// AI agent can call it directly (design §3). No AI involved: real fetch + heuristics.
type Severity = "critical" | "warning" | "info";
type Issue = { category: string; severity: Severity; message: string };
type Category = { name: string; score: number; icon: string };

export type AuditResult = {
  url: string; domain: string; score: number; grade: string; summary: string;
  categories: Category[]; issues: Issue[]; recommendations: string[];
  metrics?: { ttfbMs: number; htmlKB: number; scripts: number; perfSource: string; statusCode: number };
  checks?: Record<string, unknown>;
  success: true;
};

const UA = "Mozilla/5.0 (compatible; ArrantoAudit/1.0; +https://arranto.com/tools/website-audit)";

function isBlockedHost(host: string): boolean {
  const h = host.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal") || !h.includes(".")) return true;
  if (/^(127\.|10\.|192\.168\.|169\.254\.|0\.0\.0\.0|::1)/.test(h)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(h)) return true;
  return false;
}

async function fetchWithTimeout(url: string, ms: number, init?: RequestInit) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal, headers: { "User-Agent": UA, ...(init?.headers || {}) }, redirect: "follow" });
  } finally {
    clearTimeout(t);
  }
}

// Validates + SSRF-guards a raw user URL. Returns the parsed target or an error string.
export function safeTarget(rawUrl: string): URL | { error: string } {
  const cleanUrl = String(rawUrl).replace(/[^\w\-\.\/:\?&=#%+]/gi, "").slice(0, 500);
  let target: URL;
  try {
    target = new URL(cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`);
    if (!["http:", "https:"].includes(target.protocol)) throw new Error("proto");
  } catch {
    return { error: "Invalid URL format. Please enter a valid website URL." };
  }
  if (isBlockedHost(target.hostname)) {
    return { error: "That URL points to a private/internal address and cannot be audited." };
  }
  return target;
}

// SSRF-guarded page fetch → plain-text excerpt. Used by the agent's fetch_url tool.
export async function fetchPageText(rawUrl: string, maxChars = 4000): Promise<string | { error: string }> {
  const target = safeTarget(rawUrl);
  if (!(target instanceof URL)) return target;
  try {
    const res = await fetchWithTimeout(target.toString(), 9000);
    if (!res.ok) return { error: `The page responded with HTTP ${res.status}.` };
    const html = (await res.text()).slice(0, 1_500_000);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.slice(0, maxChars);
  } catch {
    return { error: "The page did not respond within 9 seconds." };
  }
}

function clamp(n: number) { return Math.max(0, Math.min(100, Math.round(n))); }

export async function auditWebsite(rawUrl: string): Promise<AuditResult | { error: string }> {
  const target = safeTarget(rawUrl);
  if (!(target instanceof URL)) return target;

  const urlString = target.toString();
  const domain = target.hostname;
  const origin = target.origin;

  let html = "";
  let ttfbMs = 0;
  let pageOk = false;
  let statusCode = 0;
  try {
    const t0 = Date.now();
    const res = await fetchWithTimeout(urlString, 9000);
    ttfbMs = Date.now() - t0;
    statusCode = res.status;
    pageOk = res.ok;
    if (res.ok) html = (await res.text()).slice(0, 1_500_000);
  } catch {
    return {
      url: urlString, domain, score: 0, grade: "N/A",
      summary: `Could not reach ${domain}. The site may be down, blocking bots, or too slow to respond.`,
      categories: [], issues: [{ category: "Availability", severity: "critical", message: "The site did not respond within 9 seconds." }],
      recommendations: ["Confirm the site is online and not blocking automated requests, then re-run the audit."],
      success: true,
    };
  }

  const lower = html.toLowerCase();
  const htmlKB = Math.round(html.length / 1024);

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, " ") : "";
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*>/i);
  const desc = descMatch ? (descMatch[0].match(/content=["']([\s\S]*?)["']/i)?.[1] || "").trim() : "";
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html);
  const h1Count = (lower.match(/<h1[\s>]/g) || []).length;
  const hasSchema = /application\/ld\+json/i.test(html);
  const hasAnalytics = /(googletagmanager\.com|google-analytics\.com|gtag\(|gtm\.js|plausible|clarity\.ms|posthog)/i.test(lower);
  const imgTags = (lower.match(/<img[\s>]/g) || []).length;
  const imgWithAlt = (html.match(/<img[^>]+alt=["'][^"']*["']/gi) || []).length;
  const altCoverage = imgTags === 0 ? 100 : Math.round((imgWithAlt / imgTags) * 100);
  const scripts = (lower.match(/<script[\s>]/g) || []).length;
  const stylesheets = (lower.match(/<link[^>]+rel=["']stylesheet["']/gi) || []).length;
  const mixedContent = target.protocol === "https:" && /(src|href)=["']http:\/\//i.test(html);

  let hasRobots = false, robotsHasSitemap = false, hasSitemap = false;
  try {
    const r = await fetchWithTimeout(`${origin}/robots.txt`, 5000);
    if (r.ok) { hasRobots = true; const txt = (await r.text()).toLowerCase(); robotsHasSitemap = txt.includes("sitemap:"); }
  } catch { /* ignore */ }
  try {
    const s = await fetchWithTimeout(`${origin}/sitemap.xml`, 5000, { method: "GET" });
    hasSitemap = s.ok || robotsHasSitemap;
  } catch { hasSitemap = robotsHasSitemap; }

  let p = 100;
  if (ttfbMs > 600) p -= Math.min(35, (ttfbMs - 600) / 60);
  if (htmlKB > 150) p -= Math.min(25, (htmlKB - 150) / 20);
  if (scripts > 15) p -= Math.min(20, (scripts - 15) * 1.5);
  if (stylesheets > 6) p -= Math.min(10, (stylesheets - 6) * 2);
  const perfScore = clamp(p);

  const issues: Issue[] = [];
  const recommendations: string[] = [];

  let seo = 100;
  if (!title) { seo -= 30; issues.push({ category: "SEO", severity: "critical", message: "No <title> tag found." }); recommendations.push("Add a unique, descriptive <title> (30–60 chars) to every page."); }
  else if (title.length < 30 || title.length > 65) { seo -= 8; issues.push({ category: "SEO", severity: "warning", message: `Title length is ${title.length} chars (aim for 30–60).` }); }
  if (!desc) { seo -= 15; issues.push({ category: "SEO", severity: "warning", message: "Missing meta description." }); recommendations.push("Write a compelling 120–160 char meta description."); }
  if (!hasCanonical) { seo -= 8; issues.push({ category: "SEO", severity: "info", message: "No canonical tag." }); }
  if (!hasSchema) { seo -= 12; issues.push({ category: "SEO", severity: "warning", message: "No structured data (JSON-LD) detected." }); recommendations.push("Add Schema.org JSON-LD."); }
  if (!hasRobots) { seo -= 8; issues.push({ category: "SEO", severity: "warning", message: "No robots.txt found." }); }
  if (!hasSitemap) { seo -= 10; issues.push({ category: "SEO", severity: "warning", message: "No XML sitemap found." }); }

  const perf = perfScore;
  if (perf < 50) { issues.push({ category: "Performance", severity: "critical", message: `Performance score is low (${perf}/100).` }); }
  else if (perf < 80) { issues.push({ category: "Performance", severity: "warning", message: `Performance is ${perf}/100.` }); }

  let mobile = 100;
  if (!hasViewport) { mobile -= 60; issues.push({ category: "Mobile", severity: "critical", message: "No mobile viewport meta tag." }); recommendations.push("Add viewport meta tag."); }

  let trust = 100;
  if (target.protocol !== "https:") { trust -= 60; issues.push({ category: "Security", severity: "critical", message: "Site is not served over HTTPS." }); }
  if (mixedContent) { trust -= 20; issues.push({ category: "Security", severity: "warning", message: "Mixed content detected." }); }
  if (!hasAnalytics) { trust -= 5; issues.push({ category: "Analytics", severity: "info", message: "No analytics detected." }); }

  let structure = 100;
  if (h1Count === 0) { structure -= 25; issues.push({ category: "Structure", severity: "warning", message: "No <h1> heading found." }); }
  else if (h1Count > 1) { structure -= 10; issues.push({ category: "Structure", severity: "info", message: "Multiple <h1> tags found." }); }
  if (imgTags > 0 && altCoverage < 80) { structure -= 12; issues.push({ category: "Accessibility", severity: "warning", message: `Only ${altCoverage}% images have alt text.` }); }

  const categories: Category[] = [
    { name: "SEO", score: clamp(seo), icon: "🔍" },
    { name: "Performance", score: clamp(perf), icon: "⚡" },
    { name: "Mobile", score: clamp(mobile), icon: "📱" },
    { name: "Security", score: clamp(trust), icon: "🔒" },
    { name: "Structure", score: clamp(structure), icon: "🧱" },
  ];

  const score = clamp(categories.reduce((a, c) => a + c.score, 0) / categories.length);
  let grade = "F";
  if (score >= 90) grade = "A"; else if (score >= 80) grade = "B"; else if (score >= 70) grade = "C"; else if (score >= 55) grade = "D";

  const summary = score >= 80
    ? `${domain} has strong fundamentals (${score}/100).`
    : `${domain} scores ${score}/100. Key areas need optimization.`;

  if (recommendations.length === 0) recommendations.push("Strong site — continue monitoring metrics.");

  return {
    url: urlString, domain, score, grade, summary,
    categories,
    metrics: { ttfbMs, htmlKB, scripts, perfSource: "heuristic", statusCode },
    issues, recommendations,
    checks: { https: target.protocol === "https:", hasViewport, hasSchema, hasRobots, hasSitemap, hasCanonical, hasAnalytics, h1Count, altCoverage, pageOk },
    success: true,
  };
}
