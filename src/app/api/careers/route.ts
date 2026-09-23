import { z } from "zod";
import { rateLimit, clientKey, tooMany, LIMITS } from "@/lib/rate-limit";
import { sendAdminEmail } from "@/lib/tools/contact-core";

const ApplicationSchema = z.object({
  roleApplied: z.string().trim().min(1).default("Full-Stack Engineer"),
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Valid email address is required").max(320),
  phone: z.string().trim().min(5, "Phone number is required").max(30),
  location: z.string().trim().min(1, "Location is required").max(100),
  experience: z.string().trim().min(1, "Experience level is required").max(100),
  screeningQ1: z.string().trim().min(1, "Screening answer 1 is required"),
  screeningQ2: z.string().trim().min(1, "Screening answer 2 is required"),
  customPitchQuestion: z.string().trim().min(15, "Please answer the scenario/project question").max(5000),
  githubUrl: z.string().trim().max(500).optional(),
  portfolioUrl: z.string().trim().max(500).optional(),
  resumeUrl: z.string().trim().min(1, "Resume link is required").max(500),
  coverNote: z.string().trim().max(5000).optional(),
  proudAchievement: z.string().trim().max(5000).optional(),
  visitedWebsite: z.boolean().optional(),
  followedCompanyLinkedIn: z.boolean().optional(),
  connectedFounderLinkedIn: z.boolean().optional(),
  confirmedMinExperience: z.boolean().optional(),
  locale: z.enum(["en", "ar"]).default("en"),
  botcheck: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req, "careers"), LIMITS.contact);
  if (!rl.ok) return tooMany(rl.retryAfterSec);

  const body = await req.json().catch(() => null);
  const parsed = ApplicationSchema.safeParse(body);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid application data";
    return Response.json({ error: errorMsg }, { status: 400 });
  }

  const { botcheck, ...app } = parsed.data;
  if (botcheck) return Response.json({ ok: true }); // silent discard for bots

  // Screening evaluation
  const isQualified =
    app.screeningQ1.toLowerCase().includes("yes") &&
    app.screeningQ2.toLowerCase().includes("yes") &&
    app.confirmedMinExperience === true;

  const emailFields: Record<string, string | undefined> = {
    "Role Applied": app.roleApplied,
    "Candidate Name": app.fullName,
    "Email": app.email,
    "Phone / WhatsApp": app.phone,
    "Location": app.location,
    "Experience Level": app.experience,
    "Pre-Application Checklist": [
      app.visitedWebsite ? "✅ Visited Arranto Site" : "❌ Not visited",
      app.followedCompanyLinkedIn ? "✅ Followed Arranto LinkedIn" : "❌ Not followed",
      app.connectedFounderLinkedIn ? "✅ Connected with Ashraf Kamal" : "❌ Not connected",
      app.confirmedMinExperience ? "✅ Confirmed 3+ Years Experience" : "❌ Not confirmed",
    ].join(" | "),
    "Screening Requirement 1": app.screeningQ1,
    "Screening Requirement 2": app.screeningQ2,
    "🔥 Technical / Scenario Answer": app.customPitchQuestion,
    "GitHub Profile": app.githubUrl || "Not provided",
    "Portfolio / Live Projects": app.portfolioUrl || "Not provided",
    "Resume Link": app.resumeUrl,
    "Cover Note": app.coverNote || "Included in response",
    "Screening Status": isQualified ? "✅ Passed Essential Screening & Checklist" : "⚠️ Needs Review",
    "Locale": app.locale,
    "Submitted At": new Date().toISOString(),
  };

  const roleShort = app.roleApplied.split(/[–—]/)[0]?.trim() || app.roleApplied;

  const sent = await sendAdminEmail(
    `Arranto Careers — ${isQualified ? "⭐ " : ""}${roleShort} Application from ${app.fullName}`,
    emailFields
  );

  if ("error" in sent) {
    console.warn("Resend email warning on career submission:", sent.error);
    return Response.json({ ok: true, note: "Application recorded successfully" });
  }

  return Response.json({ ok: true, qualified: isQualified });
}
