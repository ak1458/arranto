import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { bySlug, caseStudies, type Locale } from "@/content/work";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { TilePattern } from "@/components/WorkGrid";
import { alternatesFor } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = bySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Arranto`,
    description: cs.outcome[locale as Locale],
    alternates: alternatesFor(`/work/${slug}`, locale),
  };
}

export default async function WorkDetail({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cs = bySlug(slug);
  if (!cs) notFound();

  const t = await getTranslations("work");
  const l = locale as Locale;
  const idx = caseStudies.indexOf(cs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: cs.title,
    description: cs.body[l],
    creativeWorkStatus: cs.status === "proven" ? "Published" : "Pilot",
    creator: { "@type": "Organization", name: "Arranto" },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-paper">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 start-1/3 h-[400px] w-[400px] rounded-full bg-[#FF6B00]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 end-1/4 h-[350px] w-[350px] rounded-full bg-orange-500/5 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-32 md:px-12">
        {/* Back Link */}
        <Reveal>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-paper"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-scale-x-100">←</span>
            {t("heading")}
          </Link>
        </Reveal>

        {/* Hero Section */}
        <div className="mt-8 flex flex-col gap-6 border-b border-paper/10 pb-12">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-paper/85">
                ENTERPRISE CASE STUDY
              </span>
              <span className="h-3 w-px bg-paper/20" />
              <div className="flex items-center gap-1.5 rounded-full border border-paper/15 bg-paper/5 px-3 py-0.5">
                <span className="size-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-paper/70">
                  {cs.status === "proven" ? "PROVEN OUTCOME" : "ACTIVE PILOT"}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-tight">
              {cs.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-xl font-bold tracking-tight text-[#FF951D] md:text-2xl">
              {cs.outcome[l]}
            </p>
          </Reveal>
        </div>

        {/* Content & Telemetry Grid */}
        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Description body */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-sans text-xl font-medium tracking-tight text-paper">
                Project Overview
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 text-lg leading-relaxed text-paper/80 font-light">
                {cs.body[l]}
              </p>
            </Reveal>

            {/* details Accordion / FAQ */}
            <div className="mt-16">
              <Reveal>
                <Accordion
                  label={t("details")}
                  items={cs.faq.map(({ q, a }) => ({ q: q[l], a: a[l] }))}
                />
              </Reveal>
            </div>
          </div>

          {/* Right Column: Telemetry & Stack */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* SVG Tile Telemetry Panel */}
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-paper/15 bg-[#0D0D0D] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#FF6B00]/30 transition-all duration-300">
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <TilePattern seed={idx + 1} className="h-full w-full object-cover" />
                </div>
                <div className="relative z-10 flex items-center justify-between border-b border-paper/10 pb-4 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    SYSTEM TELEMETRY
                  </span>
                  <span className="size-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
                </div>
                <div className="h-44 w-full" />
              </div>
            </Reveal>

            {/* Tech Stack Block */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-paper/10 bg-[#0A0A0A]/40 p-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-4">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {cs.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-paper/10 bg-paper/[0.04] px-4 py-1.5 font-mono text-xs text-paper/85 transition-colors duration-300 hover:border-paper/20 hover:text-paper"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* CTA Box at Bottom */}
        <div className="mt-28 flex flex-col items-center justify-between gap-8 rounded-3xl border border-[#FF6B00]/20 bg-gradient-to-r from-[#FF6B00]/5 to-transparent p-12 text-center md:flex-row md:text-start md:p-16">
          <div className="max-w-xl">
            <Reveal>
              <h3 className="font-sans text-2xl font-light text-paper md:text-3xl">
                Ready to engineer your custom system?
              </h3>
              <p className="mt-4 text-sm text-fog/85">
                Let&apos;s build resilient, mission-critical infrastructure for your operations.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full border border-[#FF6B00] bg-[#FF6B00]/15 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:bg-[#FF6B00] hover:text-ink hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
            >
              <span>{t("contact")}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
