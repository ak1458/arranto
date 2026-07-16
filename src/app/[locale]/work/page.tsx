import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sorted, type Locale } from "@/content/work";
import { WorkGrid } from "@/components/WorkGrid";
import { Reveal } from "@/components/Reveal";
import { WorkPortfolioModal } from "@/components/WorkPortfolioModal";
import { githubProjects } from "@/lib/github";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

type Localized = Record<Locale, string>;

const gh: { eyebrow: Localized; heading: Localized } = {
  eyebrow: {
    en: "GITHUB // ENGINEERING SYSTEMS CORE",
    ar: "جيت هاب // نواة الأنظمة الهندسية",
  },
  heading: {
    en: "Live Technical Repositories",
    ar: "المستودعات التقنية المباشرة",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("workTitle"),
    description: t("workDescription"),
    path: "/work",
    locale,
  });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === "ar" ? "ar" : "en") as Locale;

  const t = await getTranslations({ locale, namespace: "work" });
  const repos = await githubProjects();

  const stats = [
    { k: t("stat1Label"), v: t("stat1Value") },
    { k: t("stat2Label"), v: t("stat2Value") },
    { k: t("stat3Label"), v: t("stat3Value") },
    { k: t("stat4Label"), v: t("stat4Value") },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="px-6 pt-36 pb-16 md:px-12 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc]">
              {t("eyebrow")}
            </span>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight">
              {t("heading")}
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#9494a0] font-light leading-relaxed">
              {t("subline")}
            </p>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <Reveal key={stat.k} delay={idx * 0.1}>
                <div>
                  <dd className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{stat.v}</dd>
                  <dt className="mt-2 text-[#9494a0]">{stat.k}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </header>

      {/* Proof layer: /work is where the fuller `body` paragraph is allowed to render. */}
      <WorkGrid
        items={sorted.map((c) => ({
          slug: c.slug,
          title: c.title,
          status: c.status,
          stack: c.stack,
          outcome: c.outcome[l],
          summary: c.body[l],
        }))}
        withHeader={false}
      />

      <WorkPortfolioModal
        repos={repos}
        eyebrow={gh.eyebrow[l]}
        heading={gh.heading[l]}
      />

      {/* Strict Monochrome Studio Footer */}
      <section className="px-6 pb-24 md:px-12 border-t border-white/10 pt-16">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#8e8f94]">
              NEXT STEP // INITIATE SCOPE
            </span>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
              Start your technical architecture briefing.
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-[#d8d9dc] bg-transparent px-8 py-4 font-mono text-xs uppercase tracking-widest text-[#d8d9dc] transition-all hover:bg-[#d8d9dc] hover:text-black"
          >
            Open Interactive Terminal &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
