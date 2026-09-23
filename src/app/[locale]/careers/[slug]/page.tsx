import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { pageMetadata } from "@/lib/seo";
import { getJobBySlug, jobPostings, Locale } from "@/content/careers";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return jobPostings.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const job = getJobBySlug(slug);

  if (!job) {
    return pageMetadata({
      title: "Job Not Found — Arranto",
      description: "The requested career opening could not be found.",
      path: `/careers/${slug}`,
      locale,
    });
  }

  return pageMetadata({
    title: `${job.title[l]} — Careers | Arranto`,
    description: job.summary[l],
    path: `/careers/${slug}`,
    locale,
  });
}

export default async function JobDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const isClosed = job.status === "closed";

  // Dynamic department colors
  const deptDotColor =
    job.departmentKey === "engineering"
      ? "bg-emerald-400"
      : job.departmentKey === "marketing"
      ? "bg-amber-400"
      : job.departmentKey === "design"
      ? "bg-fuchsia-400"
      : "bg-cyan-400";

  const deptTextColor =
    job.departmentKey === "engineering"
      ? "text-emerald-400"
      : job.departmentKey === "marketing"
      ? "text-amber-400"
      : job.departmentKey === "design"
      ? "text-fuchsia-400"
      : "text-cyan-400";

  const deptBorderColor =
    job.departmentKey === "engineering"
      ? "border-emerald-400"
      : job.departmentKey === "marketing"
      ? "border-amber-400"
      : job.departmentKey === "design"
      ? "border-fuchsia-400"
      : "border-cyan-400";

  // Schema.org JobPosting structured data
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title[l],
    "description": job.summary[l],
    "identifier": {
      "@type": "PropertyValue",
      "name": "Arranto",
      "value": job.id
    },
    "datePosted": "2026-09-20",
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Arranto",
      "sameAs": "https://arranto.com",
      "logo": "https://arranto.com/brand/arranto-symbol.png"
    },
    "jobLocationType": "TELECOMMUTE",
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "industry": job.department[l]
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-24 text-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* ── 1. HEADER & BREADCRUMB ── */}
      <section className="relative w-full overflow-hidden pt-12 pb-16 border-b border-white/10">
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
          {/* Back link */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#9494a0] hover:text-white transition-colors"
            >
              ← Back to Job Dashboard
            </Link>

            {isClosed ? (
              <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300">
                🔒 Closed Role
              </span>
            ) : (
              <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Opening
              </span>
            )}
          </div>

          {/* Department badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider mb-6">
            <span className={`h-2 w-2 rounded-full ${deptDotColor} animate-pulse`} />
            {job.department[l]}
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold uppercase leading-tight tracking-tight text-white">
              {job.title[l]}
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#9494a0] font-light max-w-3xl">
              {job.summary[l]}
            </p>
          </div>

          {/* Closed Alert Banner */}
          {isClosed && (
            <div className="mt-8 border border-amber-500/30 bg-amber-500/10 p-5 text-amber-200 text-sm">
              <span className="font-semibold block font-mono text-xs uppercase tracking-wider mb-1">
                Notice: Applications Closed
              </span>
              This opening has been concluded and is no longer accepting new applicants. Browse our active dashboard for current roles.
            </div>
          )}

          {/* Key Stat Pills */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Location</span>
              <span className="mt-1 font-display text-sm sm:text-base font-semibold text-white block">
                {job.location[l]}
              </span>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Employment</span>
              <span className="mt-1 font-display text-sm sm:text-base font-semibold text-white block">
                {job.employmentType[l]}
              </span>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Experience</span>
              <span className="mt-1 font-display text-sm sm:text-base font-semibold text-white block">
                {job.experience[l]}
              </span>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Compensation</span>
              <span className="mt-1 font-display text-sm sm:text-base font-semibold text-white block">
                {job.compensation ? job.compensation[l] : "Competitive Base + Bonuses"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT THE ROLE ── */}
      <section className="px-6 py-16 md:px-12 border-b border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className={`border-s-2 ${deptBorderColor} ps-6 sm:ps-8 py-2`}>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8e8f94] block mb-3">
                ROLE OVERVIEW
              </span>
              <div className="space-y-4 text-base sm:text-lg font-light leading-relaxed text-[#f0efec]">
                {job.aboutRole[l].map((para, pi) => (
                  <p key={pi}>{para}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. RESPONSIBILITIES ── */}
      <section className="px-6 py-20 md:px-12 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
              EXECUTION & SCOPE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-12">
              What You&apos;ll Work On
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {job.responsibilities[l].map((group, gi) => (
              <Reveal key={gi} delay={0.05 * (gi + 1)}>
                <div className="border border-white/10 bg-[#0a0a0a] p-6 h-full flex flex-col justify-between">
                  <div>
                    <span className={`font-mono text-xs font-semibold ${deptTextColor}`}>
                      0{gi + 1} // AREA
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mt-3 mb-4">{group.title}</h3>
                    <ul className="space-y-3 text-sm text-[#9494a0] font-light leading-relaxed">
                      {group.items.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-2">
                          <span className={deptTextColor}>▪</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TECHNOLOGIES & SKILLS ── */}
      <section className="px-6 py-20 md:px-12 border-b border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
              SKILLS & CAPABILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-12">
              Core Capabilities & Tools
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {job.technologiesOrSkills[l].map((cat, ci) => (
              <Reveal key={ci} delay={0.05 * (ci + 1)}>
                <div className="border border-white/10 bg-[#050505] p-6 h-full">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d8d9dc] block mb-4 font-semibold">
                    0{ci + 1} // {cat.category}
                  </span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#9494a0] font-light leading-relaxed">
                    {cat.items.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-2">
                        <span className={deptTextColor}>▪</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. IMPORTANT NOTE CALLOUT ── */}
      {job.importantNote && (
        <section className="px-6 py-12 md:px-12 border-b border-white/10">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="border border-white/15 bg-[#0a0a0a] p-6 sm:p-8">
                <span className={`font-mono text-xs uppercase tracking-wider block mb-2 font-semibold ${deptTextColor}`}>
                  ⚡ IMPORTANT NOTE FOR APPLICANTS
                </span>
                <p className="text-sm sm:text-base text-[#f0efec] font-light leading-relaxed">
                  {job.importantNote[l]}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── 6. REQUIREMENTS & BENEFITS ── */}
      <section className="px-6 py-20 md:px-12 border-b border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Requirements */}
            <Reveal>
              <div className="border border-white/10 bg-[#050505] p-8 h-full">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
                  CHECKLIST (3+ YEARS EXP REQUIRED)
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-white mb-6">
                  What We&apos;re Looking For
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#9494a0] font-light leading-relaxed">
                  {job.requirements[l].map((req, ri) => (
                    <li key={ri} className="flex items-start gap-3">
                      <span className={deptTextColor}>✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* What you'll get */}
            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-[#050505] p-8 h-full">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
                  BENEFITS & PERKS
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-white mb-6">
                  What You Can Expect
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-[#9494a0] font-light leading-relaxed">
                  {job.whatWeOffer[l].map((perk, pi) => (
                    <li key={pi} className="flex items-start gap-3">
                      <span className="font-mono text-xs text-white">0{pi + 1}</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. DEDICATED JOB APPLICATION FORM ── */}
      <section id="apply" className="px-6 py-20 md:px-12 scroll-mt-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
                {isClosed ? "POSITION STATUS" : "APPLICATION FORM"}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                {isClosed ? "Applications Closed" : `Apply for ${job.title[l]}`}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#9494a0] font-light max-w-xl mx-auto">
                {isClosed
                  ? "This opening is currently closed. Explore our active roles on the Job Dashboard."
                  : "Complete the 4 pre-application verification steps and form below. We review every application thoroughly."}
              </p>
            </div>
          </Reveal>

          {/* Form with dynamic job details and pre-application checklist */}
          <Reveal delay={0.05}>
            <JobApplicationForm
              jobSlug={job.slug}
              jobTitle={job.title[l]}
              isClosed={isClosed}
              experienceOptions={job.screening.experienceOptions}
              q1Label={job.screening.q1Label}
              q1Options={job.screening.q1Options}
              q2Label={job.screening.q2Label}
              q2Options={job.screening.q2Options}
              scenarioTitle={job.screening.scenarioTitle}
              scenarioQuestion={job.screening.scenarioQuestion}
              scenarioPlaceholder={job.screening.scenarioPlaceholder}
            />
          </Reveal>

          {/* Alternative Email Application Box */}
          {!isClosed && (
            <div className="mt-12 border border-white/10 bg-[#080808] p-6 sm:p-8 text-center">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#d8d9dc] mb-2">
                Direct Application via Email
              </h4>
              <p className="text-xs sm:text-sm text-[#9494a0] font-light max-w-lg mx-auto mb-4">
                You can also email your resume, live portfolio, and LinkedIn profile directly to:
              </p>
              <a
                href={`mailto:help@arranto.com?subject=Application%20for%20${encodeURIComponent(job.title.en)}`}
                className="inline-block font-mono text-sm sm:text-base text-white underline underline-offset-4 hover:text-[#d8d9dc] transition-colors"
              >
                help@arranto.com →
              </a>
              <p className="mt-2 font-mono text-[11px] text-[#8e8f94]">
                (Please include &ldquo;{job.title.en}&rdquo; in your email subject line)
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
