import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { OpenChatButton } from "@/components/OpenChatButton";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "assistantPage" });
  return pageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/assistant",
    locale,
  });
}

export default async function AssistantPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("assistantPage");

  const domains = t.raw("domains") as { title: string; body: string }[];
  const steps = t.raw("steps") as { title: string; body: string }[];
  const faqItems = t.raw("faq") as { q: string; a: string }[];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="border-b border-white/10 px-6 pt-36 pb-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">{t("eyebrow")}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{t("heading")}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#c9cace]">{t("intro")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <OpenChatButton
                label={t("cta")}
                className="border border-[#d8d9dc] bg-[#d8d9dc] px-6 py-3 font-mono text-xs uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-[#d8d9dc] motion-reduce:transition-none"
              />
              <Link
                href="/contact"
                className="border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-[#d8d9dc] transition-colors hover:border-[#d8d9dc] motion-reduce:transition-none"
              >
                {t("ctaContact")}
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="border-b border-white/10 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e8f94]">{t("domainsHeading")}</h2>
          <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-3">
            {domains.map((d, i) => (
              <div key={i} className="bg-[#050505] p-6">
                <h3 className="font-display text-lg text-white">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#c9cace]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e8f94]">{t("stepsHeading")}</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-mono text-xs text-[#8e8f94]">0{i + 1}</span>
                <div>
                  <h3 className="text-sm font-medium text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#c9cace]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[#8e8f94]">{t("faqHeading")}</h2>
          <dl className="mt-8 space-y-8">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <dt className="text-sm font-medium text-white">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#c9cace]">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
