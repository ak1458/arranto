import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// GTM/GA4 need script + connect allowances; everything else stays locked down.
// React dev mode (Turbopack) needs unsafe-eval for its debugging features;
// production never uses eval, so we keep it out of the prod CSP.
const devScriptSrc = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devScriptSrc} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Legacy URL map (implementation plan 6.2). The smilefotilo.com side 301s its old deep URLs
// here; these rules catch what lands on arranto.com — old backlinks, indexed URLs, and the
// pre-rename /studio path. Routes that never existed on Arranto (/pricing, /products,
// /locations) go to their nearest real equivalent rather than 404ing and dropping the
// link equity the migration exists to preserve.
//
// next.config redirects run BEFORE the next-intl proxy, so each path needs an unprefixed
// rule (the proxy adds the locale afterwards) and a locale-prefixed rule.
const LEGACY: Record<string, string> = {
  "/studio": "/about", // renamed; docs/SETUP.md still points old 301s at /studio
  "/pricing": "/contact", // no public pricing page exists (arranto-rules.md)
  "/products": "/work",
  "/locations": "/about",
};

// statusCode 301 rather than `permanent: true` (which emits 308): the SEO plan and the
// smilefotilo redirect matrix both specify 301, and it is the status every crawler and
// link-audit tool handles without ambiguity.
const legacyRedirects = Object.entries(LEGACY).flatMap(([from, to]) => [
  { source: from, destination: to, statusCode: 301 },
  { source: `/:locale(en|ar)${from}`, destination: `/:locale${to}`, statusCode: 301 },
  // Old deep URLs (/products/foo, /locations/riyadh) collapse to the same target.
  { source: `${from}/:path*`, destination: to, statusCode: 301 },
  { source: `/:locale(en|ar)${from}/:path*`, destination: `/:locale${to}`, statusCode: 301 },
]);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default withNextIntl(nextConfig);
