import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/openrouter";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const key = clientKey(request, "seo-content");
    const limit = rateLimit(key, LIMITS.chat);
    if (!limit.ok) return tooMany(limit.retryAfterSec);

    const body = await request.json();
    const { business, location, industry, language = "English" } = body;

    if (!business || !industry) {
      return NextResponse.json({ error: "Business name and industry are required" }, { status: 400 });
    }

    const locationText = location ? ` in ${location}` : "";
    const langText = language && language !== "English" ? ` Write everything in ${language}.` : "";

    // Generate blog titles
    const blogTitlesPrompt = `Generate 5 catchy, SEO-optimized blog post titles for a ${industry} business called "${business}"${locationText}.
Titles should be engaging and help with local SEO. Return ONLY a numbered list, one title per line.${langText}`;

    const blogTitlesResponse = await chat([
      { role: "user", content: blogTitlesPrompt }
    ], { maxTokens: 300 });

    // Generate meta descriptions
    const metaPrompt = `Generate 3 compelling meta descriptions (under 160 characters each) for a ${industry} business called "${business}"${locationText}.
Each should include a call-to-action and relevant keywords. Return ONLY a numbered list, one description per line.${langText}`;

    const metaResponse = await chat([
      { role: "user", content: metaPrompt }
    ], { maxTokens: 300 });

    // Generate keywords
    const keywordsPrompt = `Generate 10 relevant SEO keywords for a ${industry} business${locationText}.
Include a mix of short-tail and long-tail keywords. Format: keyword — search intent (e.g., "Info" or "Purchase"). Return ONLY a numbered list.${langText}`;

    const keywordsResponse = await chat([
      { role: "user", content: keywordsPrompt }
    ], { maxTokens: 300 });

    // Generate content outline
    const outlinePrompt = `Create a detailed blog post outline for "${business}" (${industry}${locationText}).
Include: Title, Introduction, 3-4 main sections with subsections, and Conclusion with CTA. Format with clear headings.${langText}`;

    const outlineResponse = await chat([
      { role: "user", content: outlinePrompt }
    ], { maxTokens: 500 });

    const parseNumberedList = (text: string): string[] => {
      return text
        .split("\n")
        .map(line => line.replace(/^\d+\.\s*/, "").replace(/["']/g, "").trim())
        .filter(line => line.length > 0);
    };

    const blogTitles = parseNumberedList(blogTitlesResponse);
    const metaDescriptions = parseNumberedList(metaResponse);
    const keywords = parseNumberedList(keywordsResponse);

    return NextResponse.json({
      blogTitles: blogTitles.length > 0 ? blogTitles : [`Tips for choosing ${industry} services`],
      metaDescriptions: metaDescriptions.length > 0 ? metaDescriptions : [`Top-rated ${industry} services from ${business}.`],
      keywords: keywords.length > 0 ? keywords : [`${industry} near me`],
      contentOutline: outlineResponse || `1. Introduction\n2. Key services\n3. Benefits\n4. Conclusion`,
      business,
      location,
      industry,
      success: true,
    });
  } catch (error: unknown) {
    console.error("SEO content generation error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
