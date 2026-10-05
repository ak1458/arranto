// HTTP content negotiation for the Markdown representation agents ask for with
// `Accept: text/markdown` (acceptmarkdown.com, RFC 9110 §12.5.1, RFC 7763).
// Kept dependency-free so it runs in the proxy and in `node --test` unchanged.

export const PRODUCES = ["text/html", "text/markdown"] as const;
export type Produced = (typeof PRODUCES)[number];

type AcceptEntry = { type: string; q: number; specificity: number };

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const parts = raw.split(";").map((s) => s.trim());
      const type = parts[0].toLowerCase();
      let q = 1;
      for (const param of parts.slice(1)) {
        const [name, value] = param.split("=").map((s) => s.trim());
        if (name?.toLowerCase() === "q") {
          const parsed = Number(value);
          if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
        }
      }
      const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
      return { type, q, specificity };
    });
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/** Which representation to serve: the most specific matching range sets each
 * candidate's q (so `text/html;q=0, *\/*` really rejects HTML), the highest q wins,
 * and ties go to the client's order. `null` means nothing we produce is acceptable. */
export function preferredType(header: string | null | undefined): Produced | null {
  if (!header || !header.trim()) return PRODUCES[0];
  const entries = parseAccept(header);
  if (entries.length === 0) return PRODUCES[0];

  let best: Produced | null = null;
  let bestQ = -1;
  let bestPosition = Infinity;

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null;
    let matchedPosition = Infinity;
    entries.forEach((e, idx) => {
      if (!matches(e, candidate)) return;
      if (
        matched === null ||
        e.specificity > matched.specificity ||
        (e.specificity === matched.specificity && idx < matchedPosition)
      ) {
        matched = e;
        matchedPosition = idx;
      }
    });
    if (matched === null) continue;
    const q = (matched as AcceptEntry).q;
    if (q <= 0) continue;
    if (q > bestQ || (q === bestQ && matchedPosition < bestPosition)) {
      best = candidate;
      bestQ = q;
      bestPosition = matchedPosition;
    }
  }
  return best;
}

/** Adds `Accept` to Vary without clobbering what Next.js already varies on. */
export function appendVaryAccept(headers: Headers): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", "Accept");
    return;
  }
  const tokens = existing.split(",").map((s) => s.trim().toLowerCase());
  if (!tokens.includes("accept") && !tokens.includes("*")) {
    headers.set("Vary", `${existing}, Accept`);
  }
}
