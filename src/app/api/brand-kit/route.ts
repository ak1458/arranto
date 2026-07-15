import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/openrouter";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const key = clientKey(request, "brand-kit");
    const limit = rateLimit(key, LIMITS.chat);
    if (!limit.ok) return tooMany(limit.retryAfterSec);

    const body = await request.json();
    const { businessName, industry, targetAudience = "", personality = "Professional", existingColors = "" } = body;

    if (!businessName || !industry) {
      return NextResponse.json({ error: "Business name and industry are required" }, { status: 400 });
    }

    const audienceText = targetAudience ? ` targeting ${targetAudience}` : "";

    // Generate taglines
    const taglinesPrompt = `Generate 5 creative tagline options for "${businessName}" (${industry}${audienceText}).
Tone: ${personality}. Keep them short, memorable, and brand-appropriate. Return ONLY a numbered list.`;

    const taglinesResponse = await chat([
      { role: "user", content: taglinesPrompt }
    ], { maxTokens: 250 });

    // Generate brand voice
    const voicePrompt = `Define the brand voice for "${businessName}" (${industry}).
Tone: ${personality}${audienceText}.

Return in this exact format:
TONE: [2-3 sentences describing tone]
DO SAY: [3 examples of on-brand phrases]
DON'T SAY: [3 examples of off-brand phrases]
SAMPLE POST: [1 short social media post example]`;

    const voiceResponse = await chat([
      { role: "user", content: voicePrompt }
    ], { maxTokens: 400 });

    // Parse taglines
    const taglines = taglinesResponse
      .split("\n")
      .map(line => line.replace(/^\d+\.\s*["']?/, "").replace(/["']?\s*$/, "").trim())
      .filter(line => line.length > 0 && line.length < 100)
      .slice(0, 5);

    // Parse brand voice
    const tone = voiceResponse.match(/TONE:\s*([^]+?)(?=DO SAY:|$)/)?.[1]?.trim() || 
      `${personality} and approachable, perfect for ${industry} customers`;
    
    const doSayMatch = voiceResponse.match(/DO SAY:\s*([^]+?)(?=DON'T SAY:|$)/)?.[1];
    const doSay = doSayMatch ? 
      doSayMatch.split("\n").map(l => l.replace(/^[-•\s\d]+\s*/, "").replace(/["']/g, "").trim()).filter(l => l.length > 0).slice(0, 3) :
      ["Welcome! How can we help today?", "Quality you can trust", "Your satisfaction is our priority"];

    const dontSayMatch = voiceResponse.match(/DON'T SAY:\s*([^]+?)(?=SAMPLE POST:|$)/)?.[1];
    const dontSay = dontSayMatch ?
      dontSayMatch.split("\n").map(l => l.replace(/^[-•\s\d]+\s*/, "").replace(/["']/g, "").trim()).filter(l => l.length > 0).slice(0, 3) :
      ["That's not our problem", "We don't do that", "You are wrong"];

    const samplePost = voiceResponse.match(/SAMPLE POST:\s*([^]+)/)?.[1]?.trim() ||
      `Excited to serve our amazing customers at ${businessName}! 🎉`;

    // Local palette computing based on personality
    type PaletteColor = { hex: string; name: string; usage: string };
    type Palette = Record<"primary" | "secondary" | "accent" | "dark" | "light" | "warning", PaletteColor>;
    const colorPalettes: Record<string, Palette> = {
      // Arranto's own identity — the canonical default for any studio/brand work.
      Arranto: {
        primary: { hex: "#050505", name: "Ink", usage: "Primary brand color, headers, key CTAs" },
        secondary: { hex: "#ff6b00", name: "Signal Gold", usage: "Accents, highlights, primary action" },
        accent: { hex: "#ff951d", name: "Gold Bright", usage: "Highlights, icons, special offers" },
        dark: { hex: "#020202", name: "Ink Deep", usage: "Text, dark backgrounds" },
        light: { hex: "#ecebea", name: "Paper", usage: "Backgrounds, cards, body text on dark" },
        warning: { hex: "#e63946", name: "Alert Red", usage: "Errors, warnings, urgent actions" },
      },
      Professional: {
        primary: { hex: "#1e3a5f", name: "Deep Navy", usage: "Primary brand color, headers, key CTAs" },
        secondary: { hex: "#4a90a4", name: "Steel Blue", usage: "Secondary buttons, links, accents" },
        accent: { hex: "#f4a261", name: "Warm Amber", usage: "Highlights, icons, special offers" },
        dark: { hex: "#1a1a2e", name: "Midnight", usage: "Text, dark backgrounds" },
        light: { hex: "#f8f9fa", name: "Cloud White", usage: "Backgrounds, cards" },
        warning: { hex: "#e63946", name: "Alert Red", usage: "Errors, warnings, urgent actions" },
      },
      Luxury: {
        primary: { hex: "#2c1810", name: "Espresso", usage: "Primary brand color, luxury feel" },
        secondary: { hex: "#c9a227", name: "Gold", usage: "Premium accents, highlights" },
        accent: { hex: "#8b7355", name: "Bronze", usage: "Details, borders" },
        dark: { hex: "#1a1a1a", name: "Onyx", usage: "Text, elegant backgrounds" },
        light: { hex: "#faf8f5", name: "Ivory", usage: "Clean backgrounds" },
        warning: { hex: "#b8860b", name: "Dark Goldenrod", usage: "Alerts that match luxury" },
      },
      Fun: {
        primary: { hex: "#ff6b6b", name: "Coral Pop", usage: "Primary brand color, energetic" },
        secondary: { hex: "#4ecdc4", name: "Turquoise", usage: "Secondary actions, freshness" },
        accent: { hex: "#ffe66d", name: "Sunny Yellow", usage: "Highlights, fun elements" },
        dark: { hex: "#2d3436", name: "Charcoal", usage: "Text, grounding" },
        light: { hex: "#fff9f0", name: "Cream", usage: "Soft backgrounds" },
        warning: { hex: "#ff7675", name: "Soft Red", usage: "Friendly warnings" },
      },
      Tech: {
        primary: { hex: "#6366f1", name: "Electric Indigo", usage: "Primary brand, innovation" },
        secondary: { hex: "#06b6d4", name: "Cyan", usage: "Tech accents, links" },
        accent: { hex: "#8b5cf6", name: "Violet", usage: "Highlights, features" },
        dark: { hex: "#0f172a", name: "Deep Space", usage: "Dark mode, code blocks" },
        light: { hex: "#f1f5f9", name: "Slate 50", usage: "Clean tech backgrounds" },
        warning: { hex: "#f43f5e", name: "Rose", usage: "Errors in tech style" },
      },
    };

    const paletteKey = Object.keys(colorPalettes).find(k =>
      personality.toLowerCase().includes(k.toLowerCase())
    ) || "Arranto";
    const colorPalette = { ...(colorPalettes[paletteKey] || colorPalettes.Arranto) };

    // Respect the user's existing brand colors: first hex becomes primary, second secondary.
    const userHexes = String(existingColors).match(/#[0-9a-fA-F]{6}\b/g) ?? [];
    if (userHexes[0]) colorPalette.primary = { hex: userHexes[0], name: "Your Brand Primary", usage: "Primary brand color (kept from your existing brand)" };
    if (userHexes[1]) colorPalette.secondary = { hex: userHexes[1], name: "Your Brand Secondary", usage: "Secondary color (kept from your existing brand)" };

    const typographyOptions = {
      Professional: {
        headingFont: "Inter / SF Pro Display",
        bodyFont: "Inter / Open Sans",
        headingStyle: "Clean, modern sans-serif with medium weight for authority",
        bodyStyle: "Highly readable, neutral sans-serif for professional content",
      },
      Luxury: {
        headingFont: "Playfair Display / Bodoni",
        bodyFont: "Lato / Source Sans Pro",
        headingStyle: "Elegant serif with high contrast for sophistication",
        bodyStyle: "Clean sans-serif that complements elegant headings",
      },
      Fun: {
        headingFont: "Poppins / Raleway",
        bodyFont: "Nunito / Quicksand",
        headingStyle: "Rounded, friendly sans-serif with personality",
        bodyStyle: "Warm, approachable with slight roundness",
      },
      Tech: {
        headingFont: "Space Grotesk / Montserrat",
        bodyFont: "Inter / Roboto",
        headingStyle: "Geometric, modern sans-serif for innovation",
        bodyStyle: "Clean, neutral for readability of technical content",
      },
    };
    const typography = typographyOptions[paletteKey as "Professional" | "Luxury" | "Fun" | "Tech"] || typographyOptions.Professional;

    const logoGuidelines = {
      style: paletteKey === "Luxury" ? "Monogram or minimal lettering" :
             paletteKey === "Fun" ? "Playful icon with bright colors" :
             paletteKey === "Tech" ? "Geometric abstract shapes" :
             "Clean logomark with simple wordmark",
      iconIdea: industry.toLowerCase().includes("food") || industry.toLowerCase().includes("restaurant") ? "Plate or dining utensils" :
                industry.toLowerCase().includes("tech") || industry.toLowerCase().includes("software") ? "Circuit outline or brackets" :
                industry.toLowerCase().includes("health") ? "Cross or health indicator" :
                "Abstract shape signifying upward progress",
      layoutTip: "Optimize for scalability. Ensure logo remains readable at small sizes (e.g. 16px favicon).",
    };

    const socialTemplates = {
      instagramBio: `${businessName} ✨ ${taglines[0] || ""}\n📍 ${targetAudience || "Worldwide"}\n👇 Inquire now`,
      twitterBio: `${businessName} | ${taglines[0] || "Quality Services"} | ${targetAudience || ""}`,
      linkedinHeadline: `${businessName} — ${industry} | ${taglines[0] || "Resilient Solutions"}`,
    };

    return NextResponse.json({
      colorPalette,
      typography,
      taglines: taglines.length > 0 ? taglines : [`${businessName}: Excellence in ${industry}`],
      brandVoice: { tone, doSay, dontSay, samplePost },
      logoGuidelines,
      socialTemplates,
      businessName,
      industry,
      success: true,
    });
  } catch (error: unknown) {
    console.error("Brand kit generation error:", error);
    return NextResponse.json({ error: "Failed to generate brand kit" }, { status: 500 });
  }
}
