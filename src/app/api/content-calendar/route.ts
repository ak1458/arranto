import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/openrouter";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const key = clientKey(request, "content-calendar");
    const limit = rateLimit(key, LIMITS.chat);
    if (!limit.ok) return tooMany(limit.retryAfterSec);

    const body = await request.json();
    const { businessName, industry, platforms = ["Instagram"], tone = "Professional", goals = "" } = body;

    if (!businessName || !industry) {
      return NextResponse.json({ error: "Business name and industry are required" }, { status: 400 });
    }

    const prompt = `Create a weekly social media content calendar for the business "${businessName}" in "${industry}" industry.
Tone: ${tone}. Goals: ${goals}.
Platforms: ${platforms.join(", ")}.

We need:
1. WEEKLY_THEME: [Theme name — theme description]
2. PILLARS: [4 content pillars, one per line]
3. DAILY_POSTS: Generate a post description, caption, type, and best time for each day (Monday to Sunday).
   Format each day exactly as:
   DAY: [Day name]
   THEME: [Day theme]
   TYPE: [Static / Reel / Carousel / Story]
   CAPTION: [Write the social media caption with 3 hashtags]
   BEST_TIME: [e.g. 10:00 AM]
   TIP: [1 sentence tip]

Return the response containing these sections.`;

    const aiRes = await chat([
      { role: "user", content: prompt }
    ], { maxTokens: 1500 });

    // Parse weekly theme
    const weeklyTheme = aiRes.match(/WEEKLY_THEME:\s*(.+)/)?.[1]?.trim() || "Weekly Spotlight — Showcasing our best work";

    // Parse content pillars
    const pillarsMatch = aiRes.match(/PILLARS:\s*([^]+?)(?=DAILY_POSTS:|$)/)?.[1];
    const contentPillars = pillarsMatch
      ? pillarsMatch.split("\n").map(p => p.replace(/^\d+\.\s*/, "").replace(/[-•]+/g, "").trim()).filter(p => p.length > 0).slice(0, 4)
      : ["Education", "Case Studies", "Behind the Scenes", "Features"];

    // Parse daily posts
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const daysContent = [];

    const blocks = aiRes.split(/DAY:\s*/i).slice(1);
    for (const day of days) {
      const block = blocks.find(b => b.toLowerCase().startsWith(day.toLowerCase()));
      if (block) {
        const theme = block.match(/THEME:\s*(.+)/i)?.[1]?.trim() || "Focus";
        const type = block.match(/TYPE:\s*(.+)/i)?.[1]?.trim() || "Static Post";
        const caption = block.match(/CAPTION:\s*([^]+?)(?=BEST_TIME:|$)/i)?.[1]?.trim() || `Happy ${day} from ${businessName}!`;
        const bestTime = block.match(/BEST_TIME:\s*(.+)/i)?.[1]?.trim() || "12:00 PM";
        const tip = block.match(/TIP:\s*([^]+?)(?=DAY:|$)/i)?.[1]?.trim() || "Post consistently.";

        daysContent.push({
          day,
          theme,
          posts: platforms.map((platform: string) => ({
            platform,
            type,
            caption,
            // UI prepends '#' itself — return bare tags
            hashtags: (caption.match(/#\w+/g) || ["#business"]).map((h: string) => h.slice(1)),
            bestTime,
            tip,
          })),
        });
      } else {
        // Fallback
        daysContent.push({
          day,
          theme: "Spotlight",
          posts: platforms.map((platform: string) => ({
            platform,
            type: "Static Post",
            caption: `Connect with ${businessName} this ${day}! #${industry.replace(/\s+/g, "")} #${businessName.replace(/\s+/g, "")}`,
            hashtags: [industry.replace(/\s+/g, ""), businessName.replace(/\s+/g, "")],
            bestTime: "12:00 PM",
            tip: "Engage early in comments.",
          })),
        });
      }
    }

    const weeklyTips = [
      "Keep hashtags highly relevant to your niche.",
      "Reply to all comments within the first hour of posting.",
      "Ensure all visual assets follow a unified color scheme.",
    ];

    return NextResponse.json({
      weeklyTheme,
      days: daysContent,
      contentPillars,
      weeklyTips,
      businessName,
      industry,
      success: true,
    });
  } catch (error: unknown) {
    console.error("Content calendar generation error:", error);
    return NextResponse.json({ error: "Failed to generate calendar" }, { status: 500 });
  }
}
