import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { bySlug, caseStudies, type Locale } from "@/content/work";
import { githubProjects } from "@/lib/github";
import { Accordion } from "@/components/Accordion";
import { Reveal } from "@/components/Reveal";
import { NanobannerCard } from "@/components/NanobannerCard";
import { OpenChatButton } from "@/components/OpenChatButton";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";

type Props = { params: Promise<{ locale: string; slug: string }> };

const sourceLabel: Record<Locale, string> = {
  en: "Source on GitHub",
  ar: "المصدر على GitHub",
};

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = bySlug(slug);
  if (cs) {
    return pageMetadata({
      title: `${cs.title} — Arranto`,
      description: cs.outcome[locale as Locale],
      path: `/work/${slug}`,
      locale,
    });
  }

  const repo = (await githubProjects()).find((r) => r.name === slug);
  if (!repo) return {};
  return pageMetadata({
    title: `${repo.formattedName} — Arranto`,
    description: repo.description,
    path: `/work/${slug}`,
    locale,
  });
}

export default async function WorkDetail({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("work");

  const cs = bySlug(slug);
  if (cs) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: cs.title,
      description: cs.body[l],
      creativeWorkStatus: cs.status === "proven" ? "Published" : "Pilot",
      creator: { "@type": "Organization", name: "Arranto" },
    };

    // Per-case-study FAQ content already renders in the Accordion below but had no
    // structured data of its own (MASTER-CONTEXT L18) — only /about's generic FAQ did.
    const faqJsonLd = cs.faq.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cs.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q[l],
        acceptedAnswer: { "@type": "Answer", text: a[l] },
      })),
    } : null;

    return (
      <div className="relative min-h-screen overflow-hidden bg-[#050505] text-paper">
        <div className="absolute top-1/4 start-1/3 h-[400px] w-[400px] bg-[#d8d9dc]/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 end-1/4 h-[350px] w-[350px] bg-[#d8d9dc]/5 blur-[130px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-32 md:px-12">
          <Reveal>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-paper"
            >
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-scale-x-100">←</span>
              {t("heading")}
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-col gap-6 border-b border-paper/10 pb-12">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-paper/85">
                  {t("caseStudyLabel")}
                </span>
                <span className="h-3 w-px bg-paper/20" />
                <div className="flex items-center gap-1.5 border border-paper/15 bg-paper/5 px-3 py-0.5">
                  <span
                    className={
                      cs.status === "proven"
                        ? "size-1.5 bg-[#d8d9dc]"
                        : "size-1.5 border border-[#d8d9dc] bg-transparent"
                    }
                  />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-paper/70">
                    {cs.status === "proven" ? t("badgeProven") : t("badgePilot")}
                  </span>
                </div>
                {cs.repo && (
                  <>
                    <span className="h-3 w-px bg-paper/20" />
                    <a
                      href={`https://github.com/ak1458/${cs.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-300 hover:text-[#d8d9dc]"
                    >
                      {sourceLabel[l]}
                      <span aria-hidden className="rtl:-scale-x-100">↗</span>
                    </a>
                  </>
                )}
                {cs.docs && (
                  <>
                    <span className="h-3 w-px bg-paper/20" />
                    <Link
                      href={cs.docs}
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-300 hover:text-[#d8d9dc]"
                    >
                      {l === "ar" ? "عرض الدليل" : "View Manual"}
                      <span aria-hidden className="rtl:-scale-x-100">↗</span>
                    </Link>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
                {cs.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-mono text-xl font-bold tracking-tight text-[#d8d9dc] md:text-2xl">
                {cs.outcome[l]}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <NanobannerCard
                    title={cs.title}
                    category="PRODUCTION ENGINE"
                    status={cs.status === "proven" ? "PROVEN SYSTEM" : "ACTIVE PILOT"}
                    stack={cs.stack}
                  />
                </div>
                {cs.image && (
                  <div className="flex-1 relative aspect-video rounded overflow-hidden border border-white/10">
                    <Image src={cs.image} alt={cs.title} fill className="object-cover" />
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-display text-xl font-bold tracking-tight text-paper">
                  {t("overviewHeading")}
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                {cs.article ? (
                  <div className="mt-6 text-lg leading-relaxed text-paper/80 font-light flex flex-col gap-6">
                    {cs.article[l].split('\n\n').map((paragraph, i) => {
                      if (paragraph.startsWith('### ')) {
                        return <h3 key={i} className="text-xl font-bold text-white mt-4">{paragraph.replace('### ', '')}</h3>;
                      }
                      if (paragraph.startsWith('* ')) {
                        return (
                          <ul key={i} className="list-disc list-inside flex flex-col gap-2">
                            {paragraph.split('\n').map((li, j) => (
                              <li key={j}>
                                <span dangerouslySetInnerHTML={{ __html: li.replace('* ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={i} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                    })}
                  </div>
                ) : (
                  <p className="mt-6 text-lg leading-relaxed text-paper/80 font-light">
                    {cs.body[l]}
                  </p>
                )}
              </Reveal>

              <div className="mt-16">
                <Reveal>
                  <Accordion
                    label={t("details")}
                    items={cs.faq.map(({ q, a }) => ({ q: q[l], a: a[l] }))}
                  />
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <Reveal delay={0.1}>
                <div className="card-hover border border-white/10 bg-[#121218] p-6 shadow-xl">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-4">
                    {t("techStackHeading")}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {cs.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-paper/10 bg-paper/[0.04] px-4 py-1.5 font-mono text-xs text-paper/85 transition-colors duration-300 hover:border-paper/20 hover:text-paper"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <ProjectCta title={cs.title} l={l} t={t} />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </div>
    );
  }

  const repo = (await githubProjects()).find((r) => r.name === slug);
  if (!repo) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: repo.formattedName,
    description: repo.description,
    codeRepository: repo.url,
    programmingLanguage: repo.language ?? undefined,
    creator: { "@type": "Organization", name: "Arranto" },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-paper">
      <div className="absolute top-1/4 start-1/3 h-[400px] w-[400px] bg-[#d8d9dc]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 end-1/4 h-[350px] w-[350px] bg-[#d8d9dc]/5 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-32 md:px-12">
        <Reveal>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-paper"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-scale-x-100">←</span>
            {t("heading")}
          </Link>
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 border-b border-paper/10 pb-12">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-paper/85">
                {t("repoLabel")}
              </span>
              <span className="h-3 w-px bg-paper/20" />
              <div className="flex items-center gap-1.5 border border-paper/15 bg-paper/5 px-3 py-0.5">
                <span className="size-1.5 border border-[#d8d9dc] bg-transparent" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-paper/70">
                  {t("repoStatus")}
                </span>
              </div>
              <span className="h-3 w-px bg-paper/20" />
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-300 hover:text-[#d8d9dc]"
              >
                {sourceLabel[l]}
                <span aria-hidden className="rtl:-scale-x-100">↗</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight">
              {repo.formattedName}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-xl font-bold tracking-tight text-[#d8d9dc] md:text-2xl">
              {repo.description}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8">
              <NanobannerCard
                title={repo.formattedName}
                category="OPEN SOURCE REPOSITORY"
                status={t("repoStatus").toUpperCase()}
                stack={repo.language ? [repo.language] : []}
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-xl font-bold tracking-tight text-paper">
                {t("overviewHeading")}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 text-lg leading-relaxed text-paper/80 font-light">
                {repo.description}
              </p>
            </Reveal>
            {repo.stars > 0 && (
              <Reveal delay={0.1}>
                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
                  {t("starsLabel")}: {repo.stars}
                </p>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal delay={0.1}>
              <div className="card-hover border border-white/10 bg-[#121218] p-6 shadow-xl">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-4">
                  {t("techStackHeading")}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {repo.topics.map((s) => (
                    <span
                      key={s}
                      className="border border-paper/10 bg-paper/[0.04] px-4 py-1.5 font-mono text-xs text-paper/85 transition-colors duration-300 hover:border-paper/20 hover:text-paper"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <ProjectCta title={repo.formattedName} l={l} t={t} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}

type ProjectCtaProps = {
  title: string;
  l: Locale;
  t: Awaited<ReturnType<typeof getTranslations>>;
};

// Both CTAs land on the same real inquiry flow (/api/contact → Supabase → founder
// email) — "Buy" is never a checkout; it's a pre-filled, intent-flagged message so
// the founder can see it's a buy-this-project ask and follow up directly. No public
// pricing, no payment gateway — consistent with the inquiry-only rule (arranto-rules.md).
function ProjectCta({ title, l, t }: ProjectCtaProps) {
  const similarMessage = t("similarMessageTemplate", { title });
  const buyMessage = t("buyMessageTemplate", { title });

  return (
    <div className="mt-28 flex flex-col items-center justify-between gap-8 border border-[#d8d9dc]/20 bg-gradient-to-r from-[#d8d9dc]/5 to-transparent p-12 text-center md:flex-row md:text-start md:p-16">
      <div className="max-w-xl">
        <Reveal>
          <h3 className="font-display text-2xl font-bold text-paper md:text-3xl">
            {t("ctaHeading")}
          </h3>
          <p className="mt-4 text-sm text-fog/85">{t("ctaBody")}</p>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <OpenChatButton
            className="group relative inline-flex items-center justify-center gap-3 border border-[#d8d9dc] bg-[#d8d9dc]/15 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:bg-[#d8d9dc] hover:text-ink"
          >
            {t("ctaSimilar")}
          </OpenChatButton>

        </div>
      </Reveal>
    </div>
  );
}
