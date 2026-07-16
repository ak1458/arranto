import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { verifyProposal } from "@/lib/proposal";

// Token IS the content (stateless, HMAC-signed) — private document, never indexed.
type Props = { params: Promise<{ locale: string; token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "proposal" });
  return { title: t("metaTitle"), robots: { index: false, follow: false } };
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#55565a]">{label}</h2>
      {children}
    </section>
  );
}

export default async function ProposalPage({ params }: Props) {
  const { locale, token } = await params;
  setRequestLocale(locale);
  const data = verifyProposal(token);
  if (!data) notFound();
  const t = await getTranslations("proposal");

  const who = data.company ? `${data.name} (${data.company})` : data.name;
  const pdfHref = `/api/proposal/pdf?t=${encodeURIComponent(token)}`;

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-28 sm:px-6">
      <article className="mx-auto max-w-3xl bg-[#f4f3f1] px-6 py-10 text-[#0a0a0a] sm:px-12 sm:py-14">
        <header className="mb-10 border-b border-[#0a0a0a] pb-4">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.4em]">ARRANTO</span>
            <span className="font-mono text-[10px] text-[#8e8f94]">{data.date}</span>
          </div>
          <h1 className="mt-6 font-display text-3xl sm:text-4xl">{t("title")}</h1>
        </header>

        <Section label={t("preparedFor")}>
          <p className="font-medium">{who}</p>
          <p className="text-sm text-[#55565a]" dir="ltr">{data.email}</p>
        </Section>

        <Section label={t("overview")}>
          <p className="text-sm leading-relaxed">
            {t("overviewBody", { who, type: t(`types.${data.projectType}`) })}
          </p>
        </Section>

        <Section label={t("goals")}>
          <ul className="space-y-1.5 text-sm leading-relaxed">
            {data.goals.map((g, i) => (
              <li key={i} className="flex gap-3"><span className="text-[#8e8f94]">—</span><span>{g}</span></li>
            ))}
          </ul>
        </Section>

        <Section label={t("scope")}>
          <ul className="space-y-1.5 text-sm leading-relaxed">
            {data.scope.map((s, i) => (
              <li key={i} className="flex gap-3"><span className="text-[#8e8f94]">—</span><span>{s}</span></li>
            ))}
          </ul>
        </Section>

        {data.timeline && (
          <Section label={t("timeline")}>
            <p className="text-sm leading-relaxed">{data.timeline}</p>
          </Section>
        )}

        {data.budgetBand && (
          <Section label={t("budget")}>
            <p className="text-sm leading-relaxed">{data.budgetBand}</p>
          </Section>
        )}

        <Section label={t("next")}>
          <ul className="space-y-1.5 text-sm leading-relaxed">
            {[t("next1"), t("next2"), t("next3")].map((s, i) => (
              <li key={i} className="flex gap-3"><span className="text-[#8e8f94]">—</span><span>{s}</span></li>
            ))}
          </ul>
        </Section>

        <p className="border-t border-[#d8d9dc] pt-4 text-xs leading-relaxed text-[#55565a]">{t("investment")}</p>

        <div className="mt-10 flex flex-wrap gap-3 print:hidden">
          <a
            href={pdfHref}
            className="border border-[#0a0a0a] bg-[#0a0a0a] px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[#f4f3f1] transition-colors hover:bg-transparent hover:text-[#0a0a0a] motion-reduce:transition-none"
          >
            {t("download")}
          </a>
        </div>

        <footer className="mt-12 border-t border-[#d8d9dc] pt-4 text-center font-mono text-[10px] text-[#8e8f94]">
          Arranto · est. 2017 · arranto.com · help@arranto.com
        </footer>
      </article>
    </main>
  );
}
