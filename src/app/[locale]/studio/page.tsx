import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { alternatesFor } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("studioTitle"),
    description: t("studioDescription"),
    alternates: alternatesFor("/studio", locale),
  };
}

export default async function Studio({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("studio");

  const stats = [
    { value: t("statEst"), label: t("statEstLabel") },
    { value: t("statSize"), label: t("statSizeLabel") },
    { value: t("statShipped"), label: t("statShippedLabel") },
    { value: t("statReviews"), label: t("statReviewsLabel") },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-paper">
      {/* Background glow accents */}
      <div className="absolute top-1/4 end-1/4 h-[350px] w-[350px] rounded-full bg-[#FF6B00]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 start-1/4 h-[350px] w-[350px] rounded-full bg-orange-500/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-32 md:px-12">
        {/* Hero Header */}
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 font-sans text-[clamp(3rem,7vw,6.5rem)] font-light leading-[1.04] tracking-[-0.04em]">
              {t("heading")}
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-paper/75 max-w-2xl font-light">
              {t("tagline")}
            </p>
          </Reveal>
        </div>

        {/* Highlights Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Reveal key={stat.value} delay={0.08 * idx} className="h-full">
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-paper/10 bg-[#0D0D0D]/60 p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[#FF6B00]/40 hover:shadow-[0_10px_30px_rgba(255,107,0,0.08)]">
                <span className="font-mono text-4xl font-bold tracking-tight text-[#FF6B00] transition-transform duration-300 group-hover:scale-105 inline-block origin-start">
                  {stat.value}
                </span>
                <p className="mt-8 text-sm leading-relaxed text-fog/85">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-28 grid gap-16 lg:grid-cols-12 lg:items-center border-t border-paper/10 pt-20">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal>
              <h2 className="font-sans text-3xl font-light tracking-tight md:text-4xl text-paper">
                {t("storyHeading")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-paper/75 md:text-lg">
                {t("storyBody1")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-base leading-relaxed text-paper/75 md:text-lg">
                {t("storyBody2")}
              </p>
            </Reveal>
          </div>

          {/* Technical Info Block */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-paper/15 bg-[#0A0A0A] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-2 border-b border-paper/10 pb-4 mb-6">
                  <span className="size-2.5 rounded-full bg-red-500/80" />
                  <span className="size-2.5 rounded-full bg-yellow-500/80" />
                  <span className="size-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-[10px] text-muted">arranto-meta.sh</span>
                </div>
                <div className="font-mono text-xs flex flex-col gap-4 text-fog/85">
                  <div className="flex justify-between">
                    <span className="text-muted">LOCATION:</span>
                    <span>Gonda, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">FOUNDED:</span>
                    <span>2017</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">FOCUS:</span>
                    <span>AI-native Systems</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">MEMBER:</span>
                    <span>Ashraf Kamal (Founder)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">CLIENT BASE:</span>
                    <span>Gulf, US, EU, India</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-28 flex flex-col items-center justify-between gap-8 rounded-3xl border border-[#FF6B00]/20 bg-gradient-to-r from-[#FF6B00]/5 to-transparent p-12 text-center md:flex-row md:text-start md:p-16">
          <div className="max-w-xl">
            <Reveal>
              <h3 className="font-sans text-2xl font-light text-paper md:text-3xl">
                {t("ctaText")}
              </h3>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 rounded-full border border-[#FF6B00] bg-[#FF6B00]/15 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:bg-[#FF6B00] hover:text-ink hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
            >
              <span>{t("ctaBtn")}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
