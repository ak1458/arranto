import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { OpenChatButton } from "@/components/OpenChatButton";
import { pageMetadata } from "@/lib/seo";
import { services, type Locale } from "@/content/services";

import Image from "next/image";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("studioTitle"),
    description: t("studioDescription"),
    path: "/about",
    locale,
  });
}

export default async function About({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("studio");
  const faqT = await getTranslations("faq");

  const story = [t("body1"), t("body2"), t("body3"), t("body4"), t("body5")];
  const stats = t.raw("stats") as { v: string; k: string }[];
  const whatWeDo = services.slice(0, 5);
  const faqItems = faqT.raw("items") as { q: string; a: string }[];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* ── Hero Header with animated stats ── */}
      <header className="relative overflow-hidden border-b border-white/10 px-6 pt-36 pb-20 md:px-12">
        {/* Ambient glow */}
        <div className="absolute top-1/3 start-1/4 h-[400px] w-[400px] bg-[#d8d9dc]/5 blur-[160px] pointer-events-none"/>

        <div className="relative z-10 mx-auto max-w-5xl">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
              {t("eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("heading")}
            </h1>
          </Reveal>

          {/* Stats bar */}
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            {stats.map((stat, i) => (
              <Reveal key={stat.k} delay={0.05 * (i + 1)}>
                <div>
                  <dd className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {stat.v}
                  </dd>
                  <dt className="mt-2 font-mono text-xs uppercase tracking-wider text-[#9494a0]">
                    {stat.k}
                  </dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </header>

      {/* ── Founder Story — two-column layout with photo placeholder ── */}
      <section className="border-b border-white/10 px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12 lg:items-start">
          {/* Photo column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10 bg-[#000000]">
                <Image
                  src="/brand/founder.png"
                  alt="Arranto Studio Founder & Engineering Team"
                  width={600}
                  height={800}
                  priority
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent">
                  <p className="font-mono text-xs uppercase tracking-widest text-[#d8d9dc]">
                    EST. 2017 // SMILE FOTILO &rarr; ARRANTO
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Story column */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
                {t("storyHeading")}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6">
              {story.map((line, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="text-lg font-light leading-relaxed text-[#f5f5f7] sm:text-xl">
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do — service cards with hover effects ── */}
      <section className="border-b border-white/10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
              {t("whatWeDoHeading")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-[#9494a0]">
              {t("whatWeDoSubline")}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 stack-container">
            {whatWeDo.map((service, i) => (
              <article
                key={service.slug}
                className="stack-card card-hover group"
                style={{ "--stack-top": `${16 + i * 3}vh` } as React.CSSProperties}
              >
                <div>
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#9494a0]">
                    {(i + 1).toString().padStart(2, "0")} / {service.name[l]}
                  </span>
                  <h3 className="mt-4 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#d8d9dc]">
                    {service.name[l]}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#9494a0]">
                    {service.promise[l]}
                  </p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#9494a0]">
                        <span className="mt-1.5 size-1 shrink-0 bg-[#d8d9dc]" />
                        {item[l]}
                      </li>
                    ))}
                  </ul>
                </div>

              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FAQ Section for SEO ── */}
      <section className="border-b border-white/10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
              {faqT("heading")}
            </h2>
            <p className="mt-4 text-lg font-light leading-relaxed text-[#9494a0]">
              {faqT("subline")}
            </p>
          </Reveal>
          <div className="mt-10">
            <Reveal>
              <Accordion
                label={faqT("heading")}
                items={faqItems}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("ctaHeading")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <OpenChatButton
              className="group relative inline-flex items-center gap-3 border border-[#d8d9dc]/40 bg-[#d8d9dc]/10 px-8 py-4 font-mono text-sm uppercase tracking-wider text-[#d8d9dc] transition-all duration-300 hover:bg-[#d8d9dc] hover:text-[#050505] hover:shadow-[0_0_30px_rgba(216,217,220,0.3)]"
            >
              <span>{t("cta")}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </OpenChatButton>
          </Reveal>
        </div>
      </section>

      {/* FAQPage JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
