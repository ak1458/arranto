import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { jobPostings, JobDetail, Locale } from "@/content/careers";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("careersTitle") || "Careers & Job Dashboard — Open Roles | Arranto",
    description: t("careersDescription") || "Explore open remote roles at Arranto: Senior Full-Stack Engineer, Performance Marketing Lead, and Senior Visual Designer. 3+ years experience required. 100% remote.",
    path: "/careers",
    locale,
  });
}

function renderDeptBadge(key: JobDetail["departmentKey"], label: string) {
  switch (key) {
    case "engineering":
      return (
        <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
          {label}
        </span>
      );
    case "marketing":
      return (
        <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border text-amber-400 bg-amber-500/10 border-amber-500/20">
          {label}
        </span>
      );
    case "design":
      return (
        <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20">
          {label}
        </span>
      );
    default:
      return (
        <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 border text-cyan-400 bg-cyan-500/10 border-cyan-500/20">
          {label}
        </span>
      );
  }
}

export default async function CareersDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === "ar" ? "ar" : "en") as Locale;

  const activeJobs = jobPostings.filter((job) => job.status === "open");
  const closedJobs = jobPostings.filter((job) => job.status === "closed");

  // Schema.org JobPosting structured data for active search engine indexing
  const jobPostingsSchema = {
    "@context": "https://schema.org",
    "@graph": activeJobs.map((job) => ({
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
    }))
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-24 text-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingsSchema) }}
      />

      {/* ── 1. HERO HEADER ── */}
      <section className="relative w-full overflow-hidden pt-12 pb-16 border-b border-white/10">
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 border border-white/10 text-[#d8d9dc] text-xs font-mono uppercase tracking-wider mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            CAREERS // TALENT DASHBOARD
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-white">
              Work with Us. Build Systems That Scale.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#9494a0] font-light max-w-3xl">
              Arranto is a high-performance digital services and engineering studio. We build resilient full-stack applications, scalable growth acquisition engines, and world-class brand identities. Browse our open positions below.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-8">
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Open Roles</span>
              <span className="mt-1 font-display text-base font-semibold text-white block">
                {activeJobs.length} Active Positions
              </span>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Work Mode</span>
              <span className="mt-1 font-display text-base font-semibold text-white block">100% Remote</span>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Requirement</span>
              <span className="mt-1 font-display text-base font-semibold text-white block">3+ Years Exp Min</span>
            </div>
            <div className="border border-white/10 bg-[#0a0a0a] p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8e8f94] block">Hiring Pace</span>
              <span className="mt-1 font-display text-base font-semibold text-white block">Immediate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. JOB DASHBOARD DIRECTORY ── */}
      <section className="px-6 py-20 md:px-12 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
                CURRENT OPENINGS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                Active Job Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#8e8f94]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              <span>{activeJobs.length} roles actively accepting applications</span>
            </div>
          </div>

          {/* Active Job Cards Grid */}
          <div className="grid grid-cols-1 gap-8">
            {activeJobs.map((job, idx) => (
              <Reveal key={job.slug} delay={0.05 * (idx + 1)}>
                <div className="group border border-white/15 bg-[#080808] p-6 sm:p-10 transition-all hover:border-white/40 hover:bg-[#0c0c0c] shadow-2xl">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-4">
                        {renderDeptBadge(job.departmentKey, job.department[l])}
                        <span className="font-mono text-[11px] text-[#9494a0] bg-white/5 px-2.5 py-1 border border-white/10">
                          {job.location[l]}
                        </span>
                        <span className="font-mono text-[11px] text-[#9494a0] bg-white/5 px-2.5 py-1 border border-white/10">
                          {job.employmentType[l]}
                        </span>
                        <span className="font-mono text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-1 border border-amber-500/20">
                          {job.experience[l]}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/careers/${job.slug}`} className="block">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white group-hover:text-[#d8d9dc] transition-colors leading-tight">
                          {job.title[l]}
                        </h3>
                      </Link>

                      {/* Summary */}
                      <p className="mt-3 text-sm text-[#9494a0] font-light leading-relaxed max-w-3xl">
                        {job.summary[l]}
                      </p>

                      {/* Highlighted Bullets */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-4">
                        {job.responsibilities[l][0]?.items.slice(0, 2).map((bullet, bi) => (
                          <div key={bi} className="flex items-start gap-2 text-xs text-[#d8d9dc] font-light">
                            <span className="text-emerald-400">▪</span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons column */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <Link
                        href={`/careers/${job.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#d8d9dc] transition-colors"
                      >
                        View Details & Apply →
                      </Link>
                      <Link
                        href={`/careers/${job.slug}#apply`}
                        className="inline-flex items-center justify-center font-mono text-xs text-[#8e8f94] hover:text-white transition-colors"
                      >
                        Application Checklist ↓
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closed / Concluded Positions Section */}
          {closedJobs.length > 0 && (
            <div className="mt-20 border-t border-white/10 pt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8e8f94] block mb-2">
                    ARCHIVED POSITIONS
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#8e8f94]">
                    Filled / Closed Openings
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#8e8f94]">
                  {closedJobs.length} Concluded
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-75">
                {closedJobs.map((job) => (
                  <div
                    key={job.slug}
                    className="border border-white/10 bg-[#0a0a0a] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          Applications Closed
                        </span>
                        <span className="font-mono text-[10px] text-[#8e8f94] bg-white/5 px-2 py-0.5 border border-white/10">
                          {job.department[l]}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-[#d8d9dc]">
                        {job.title[l]}
                      </h4>
                      <p className="mt-2 text-xs text-[#8e8f94] font-light line-clamp-2">
                        {job.summary[l]}
                      </p>
                    </div>
                    <div className="mt-6 border-t border-white/5 pt-4">
                      <Link
                        href={`/careers/${job.slug}`}
                        className="font-mono text-xs text-[#8e8f94] hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        View Archive Record →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. WHY WORK AT ARRANTO ── */}
      <section className="px-6 py-20 md:px-12 border-b border-white/10 bg-[#080808]">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
                STUDIO CULTURE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                Why Build at Arranto?
              </h2>
              <p className="mt-4 text-sm text-[#9494a0] font-light leading-relaxed">
                We believe in small, elite execution: high ownership, direct impact, zero bureaucracy, and performance-based upside.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal delay={0.05}>
              <div className="border border-white/10 bg-[#050505] p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">01 // AUTONOMY</span>
                  <h3 className="font-display text-base font-bold text-white mt-2 mb-2">100% Remote</h3>
                  <p className="text-xs text-[#8e8f94] font-light leading-relaxed">
                    Work from wherever you are most productive. We judge outputs, problem solving, and revenue results.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-white/10 bg-[#050505] p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">02 // STANDARDS</span>
                  <h3 className="font-display text-base font-bold text-white mt-2 mb-2">High Craft</h3>
                  <p className="text-xs text-[#8e8f94] font-light leading-relaxed">
                    Build production Next.js architectures, high-ROAS growth funnels, and premier brand identities.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border border-white/10 bg-[#050505] p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">03 // UPSIDE</span>
                  <h3 className="font-display text-base font-bold text-white mt-2 mb-2">Meritocratic Growth</h3>
                  <p className="text-xs text-[#8e8f94] font-light leading-relaxed">
                    Competitive compensation benchmarked globally with direct project and revenue performance bonuses.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border border-white/10 bg-[#050505] p-6 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-semibold">04 // ZERO BUREAUCRACY</span>
                  <h3 className="font-display text-base font-bold text-white mt-2 mb-2">Direct & Fast</h3>
                  <p className="text-xs text-[#8e8f94] font-light leading-relaxed">
                    No layers of middle management. Direct path from engineering ideas, growth initiatives, and design systems to production.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. GENERAL INQUIRY / SPONTANEOUS APPLICATION ── */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-4xl border border-white/10 bg-[#080808] p-8 sm:p-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc] block mb-3">
            DON&apos;T SEE YOUR ROLE?
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Spontaneous Application
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#9494a0] font-light max-w-lg mx-auto mb-6">
            If you have 3+ years of extraordinary craftsmanship in full-stack engineering, performance marketing, or brand design, email your CV and portfolio to:
          </p>
          <a
            href="mailto:help@arranto.com?subject=Spontaneous%20Application%20at%20Arranto"
            className="inline-block font-mono text-sm text-white underline underline-offset-4 hover:text-[#d8d9dc] transition-colors"
          >
            help@arranto.com →
          </a>
        </div>
      </section>
    </div>
  );
}
