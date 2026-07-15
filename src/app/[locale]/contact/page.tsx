import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TerminalForm } from "@/components/TerminalForm";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ message?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("contactTitle"),
    description: t("contactDescription"),
    path: "/contact",
    locale,
  });
}

export default async function Contact({ params, searchParams }: Props) {
  const { locale } = await params;
  const { message } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const steps = t.raw("next") as string[];

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-24 text-white">
      <TerminalForm initialMessage={message} />

      <section className="mt-24 px-6 md:px-12">
        <div className="mx-auto grid max-w-4xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] lg:col-span-4">
            {t("nextHeading")}
          </h2>

          <ol className="grid gap-6 lg:col-span-8">
            {steps.map((step, i) => (
              <li key={i}>
                <Reveal delay={0.05 * i} className="flex gap-5">
                  <span className="mt-1 font-mono text-xs text-[#d8d9dc]">0{i + 1}</span>
                  <p className="text-base leading-relaxed text-[#f5f5f7] font-light sm:text-lg">{step}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-px border-t border-white/10 bg-white/10 pt-px sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col bg-[#050505] p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
              {t("directHeading")}
            </h3>
            <p className="mt-3 flex-1 text-sm text-[#8e8f94] font-light">{t("directBody")}</p>
            <a
              href="mailto:help@arranto.com"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[#d8d9dc] hover:underline"
            >
              help@arranto.com →
            </a>
          </div>

          <div className="flex flex-col bg-[#050505] p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
              {t("methodWhatsapp")}
            </h3>
            <p className="mt-3 flex-1 text-sm text-[#8e8f94] font-light">{t("methodWhatsappBody")}</p>
            <a
              href="https://wa.me/919453878422"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[#d8d9dc] hover:underline"
            >
              +91 94538 78422 →
            </a>
          </div>

          <div className="flex flex-col bg-[#050505] p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
              {t("methodLinkedin")}
            </h3>
            <p className="mt-3 flex-1 text-sm text-[#8e8f94] font-light">{t("methodLinkedinBody")}</p>
            <a
              href="https://www.linkedin.com/in/ashrafkamal14/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[#d8d9dc] hover:underline"
            >
              in/ashrafkamal14 →
            </a>
          </div>

          <div className="flex flex-col bg-[#050505] p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc]">
              {t("methodGithub")}
            </h3>
            <p className="mt-3 flex-1 text-sm text-[#8e8f94] font-light">{t("methodGithubBody")}</p>
            <a
              href="https://github.com/ak1458"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-[#d8d9dc] hover:underline"
            >
              github.com/ak1458 →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
