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
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Reveal>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-paper"
        >
          <span aria-hidden className="rtl:-scale-x-100">←</span>
          {t("heading")}
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <h1 className="font-display text-5xl">{cs.title}</h1>
          {cs.status === "in-pilot" && (
            <span className="border border-gold/50 px-2.5 py-1 font-mono text-xs text-gold">
              status: {t(`status.${cs.status}`)}
            </span>
          )}
        </div>
        <p className="mt-3 text-xl text-fog">{cs.outcome[l]}</p>
      </Reveal>

      <Reveal className="mt-12">
        <TilePattern seed={idx + 1} className="rounded-lg border border-line" />
      </Reveal>

      <Reveal className="mt-12">
        <p className="max-w-prose leading-relaxed text-fog">{cs.body[l]}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="stack">
          {cs.stack.map((s) => (
            <li
              key={s}
              className="border border-line px-2.5 py-1 font-mono text-xs text-muted"
            >
              {s}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-16">
        <Accordion
          label={t("details")}
          items={cs.faq.map(({ q, a }) => ({ q: q[l], a: a[l] }))}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
