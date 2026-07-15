import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/openrouter";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

// Response contract is fixed by WebsiteFactoryPageClient — do not rename fields.
type Blueprint = {
  sitemap: { name: string; description: string; path: string }[];
  designDirection: { colors: string[]; typography: string; mood: string; notes: string };
  homeCopy: { headline: string; subheadline: string; cta: string };
  seoKeywords: string[];
  launchChecklist: string[];
};

const fallback = (businessName: string, industry: string): Blueprint => ({
  sitemap: [
    { name: "Home", description: `What ${businessName} does and why it matters`, path: "/" },
    { name: "Services", description: `The ${industry} services on offer`, path: "/services" },
    { name: "About", description: "Story, team, and credibility", path: "/about" },
    { name: "Contact", description: "Inquiry form and direct contact", path: "/contact" },
  ],
  designDirection: {
    colors: ["#1e3a5f", "#f8f9fa", "#c9862e", "#212529"],
    typography: "A confident serif for headlines, a clean sans-serif for body text",
    mood: "Professional and trustworthy",
    notes: "Generous whitespace, one accent color used sparingly, real photography over stock.",
  },
  homeCopy: {
    headline: `${businessName} — ${industry}, done properly`,
    subheadline: "Clear services, honest pricing, and work that speaks for itself.",
    cta: "Get in touch",
  },
  seoKeywords: [industry.toLowerCase(), `${industry.toLowerCase()} services`, `best ${industry.toLowerCase()}`],
  launchChecklist: [
    "Register domain and set up hosting",
    "Write and proofread all page copy",
    "Add analytics and Search Console",
    "Test on mobile devices",
    "Submit sitemap to Google",
  ],
});

const isHex = (c: unknown): c is string => typeof c === "string" && /^#[0-9a-fA-F]{3,8}$/.test(c);

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(clientKey(request, "website-factory"), LIMITS.chat);
    if (!limit.ok) return tooMany(limit.retryAfterSec);

    const body = await request.json();
    const { businessName, industry, targetAudience = "", style = "Professional" } = body;
    if (!businessName || !industry) {
      return NextResponse.json({ error: "Business name and industry are required" }, { status: 400 });
    }

    const prompt = `Create a website blueprint for "${businessName}", a ${industry} business${targetAudience ? ` targeting ${targetAudience}` : ""}. Visual style: ${style}.

Respond with ONLY a JSON object, no markdown fences, exactly this shape:
{
  "sitemap": [{"name": "Page name", "description": "one sentence", "path": "/slug"}],
  "designDirection": {
    "colors": ["#hex", "#hex", "#hex", "#hex"],
    "typography": "one sentence font pairing recommendation",
    "mood": "2-4 word mood description",
    "notes": "one sentence of practical design guidance"
  },
  "homeCopy": {"headline": "6-10 word homepage headline", "subheadline": "one supporting sentence", "cta": "2-3 word button text"},
  "seoKeywords": ["8 realistic search keywords"],
  "launchChecklist": ["6 concrete pre-launch tasks"]
}
sitemap: 5-7 pages, first is Home with path "/". colors: 4 hex codes fitting the ${style} style.`;

    let bp = fallback(businessName, industry);
    try {
      const raw = await chat([{ role: "user", content: prompt }], { maxTokens: 1200, timeoutMs: 45_000 });
      const parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ""));
      const hexes = (parsed.designDirection?.colors ?? []).filter(isHex);
      // Merge field-by-field so one malformed section doesn't sink the rest.
      bp = {
        sitemap: Array.isArray(parsed.sitemap) && parsed.sitemap.length ? parsed.sitemap : bp.sitemap,
        designDirection: {
          colors: hexes.length ? hexes : bp.designDirection.colors,
          typography: parsed.designDirection?.typography || bp.designDirection.typography,
          mood: parsed.designDirection?.mood || bp.designDirection.mood,
          notes: parsed.designDirection?.notes || bp.designDirection.notes,
        },
        homeCopy: {
          headline: parsed.homeCopy?.headline || bp.homeCopy.headline,
          subheadline: parsed.homeCopy?.subheadline || bp.homeCopy.subheadline,
          cta: parsed.homeCopy?.cta || bp.homeCopy.cta,
        },
        seoKeywords: Array.isArray(parsed.seoKeywords) && parsed.seoKeywords.length ? parsed.seoKeywords : bp.seoKeywords,
        launchChecklist: Array.isArray(parsed.launchChecklist) && parsed.launchChecklist.length ? parsed.launchChecklist : bp.launchChecklist,
      };
    } catch (e) {
      console.error("website-factory AI/parse failed, serving fallback:", e instanceof Error ? e.message : e);
    }

    return NextResponse.json({ ...bp, businessName, industry, success: true });
  } catch (error: unknown) {
    console.error("Website factory error:", error);
    return NextResponse.json({ error: "Failed to generate blueprint" }, { status: 500 });
  }
}
