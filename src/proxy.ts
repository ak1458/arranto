import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { appendVaryAccept, preferredType } from "./lib/agent/negotiate";
import { resolveMarkdown } from "./lib/agent/markdown";

const intl = createMiddleware(routing);

// Markdown content negotiation (acceptmarkdown.com): the same URL serves HTML to
// browsers and Markdown to agents sending `Accept: text/markdown`. Every branch
// carries `Vary: Accept` so caches keep the two representations apart.
export default function proxy(req: NextRequest) {
  const accept = req.headers.get("accept");
  const chosen = preferredType(accept);

  if (chosen === "text/markdown") {
    const resolved = resolveMarkdown(req.nextUrl.pathname);
    if (resolved.kind !== "passthrough") {
      return new Response(req.method === "HEAD" ? null : resolved.body, {
        status: resolved.status,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept",
          "Cache-Control":
            resolved.status === 200
              ? "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
              : "public, max-age=0, s-maxage=300",
        },
      });
    }
  }

  // Anything else (including `chosen === null`, e.g. `Accept: application/json` from
  // link unfurlers or `text/x-component` from Next's own client) falls through to the
  // normal response: a 406 here would break real clients for no SEO or agent gain.
  // `/fr/about`-style paths: next-intl would treat "fr" as a page segment and
  // redirect to /en/fr/about, a 404 one hop later. Serve the 404 directly instead.
  const first = req.nextUrl.pathname.split("/")[1] ?? "";
  if (/^[a-z]{2}(-[a-z]{2})?$/i.test(first) && !(routing.locales as readonly string[]).includes(first)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${routing.defaultLocale}${req.nextUrl.pathname}`;
    const res = NextResponse.rewrite(url);
    appendVaryAccept(res.headers);
    return res;
  }

  const res = intl(req);
  appendVaryAccept(res.headers);
  return res;
}

export const config = {
  // Skip API routes, Next internals, and files with an extension
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
