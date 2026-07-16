// Stateless proposal pipeline (design §6): the entire proposal lives inside its
// URL token — deflated JSON + truncated HMAC. No database; a valid token
// regenerates the document forever, a tampered one 404s.
import { deflateRawSync, inflateRawSync } from "zlib";
import { createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";

export const PROJECT_TYPES = ["ai-automation", "ai-product", "saas"] as const;

export const Proposal = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(320),
  company: z.string().trim().max(120).optional(),
  projectType: z.enum(PROJECT_TYPES),
  goals: z.array(z.string().trim().min(1).max(160)).min(1).max(5),
  scope: z.array(z.string().trim().min(1).max(200)).min(1).max(6),
  timeline: z.string().trim().max(120).optional(),
  budgetBand: z.string().trim().max(60).optional(), // client's own stated range — never Arranto pricing
  locale: z.enum(["en", "ar"]).default("en"),
  date: z.iso.date(),
});

export type ProposalData = z.infer<typeof Proposal>;

const secret = () => process.env.PROPOSAL_SECRET ?? process.env.CRON_SECRET ?? "";

const sig = (packed: string) =>
  createHmac("sha256", secret()).update(packed).digest("base64url").slice(0, 24);

export function signProposal(data: ProposalData): string {
  if (!secret()) throw new Error("Missing env var: PROPOSAL_SECRET or CRON_SECRET");
  const packed = deflateRawSync(Buffer.from(JSON.stringify(data))).toString("base64url");
  return `${packed}.${sig(packed)}`;
}

export function verifyProposal(token: string): ProposalData | null {
  try {
    if (!secret()) return null;
    const dot = token.lastIndexOf(".");
    if (dot < 1 || token.length > 4000) return null;
    const packed = token.slice(0, dot);
    const given = Buffer.from(token.slice(dot + 1));
    const expected = Buffer.from(sig(packed));
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
    const json = inflateRawSync(Buffer.from(packed, "base64url")).toString();
    const parsed = Proposal.safeParse(JSON.parse(json));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
