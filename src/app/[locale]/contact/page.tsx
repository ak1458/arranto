import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EmbeddedChat } from "@/components/EmbeddedChat";
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
      <section className="relative w-full overflow-hidden pt-12 pb-16">
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none"/>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#d8d9dc]">
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-white">
              {t("heading")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#8e8f94] max-w-2xl font-light">
              We've replaced traditional forms with our proactive AI Assistant. It will gather your requirements, answer your questions, and can even draft a full proposal. Start chatting below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Quick Contact Info */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                  {t("methodWhatsapp")}
                </h3>
                <p className="text-sm text-[#8e8f94] font-light mb-2">{t("methodWhatsappBody")}</p>
                <a href="https://wa.me/919453878422" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-white hover:underline">
                  +91 94538 78422 →
                </a>
              </div>
              
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                  {t("methodPhone")}
                </h3>
                <p className="text-sm text-[#8e8f94] font-light mb-2">Direct call for immediate assistance.</p>
                <a href="tel:+919453878422" className="font-mono text-xs text-white hover:underline">
                  +91 94538 78422 →
                </a>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                  {t("methodEmail")}
                </h3>
                <p className="text-sm text-[#8e8f94] font-light mb-2">{t("methodEmailBody")}</p>
                <a href="mailto:help@arranto.com" className="font-mono text-xs text-white hover:underline">
                  help@arranto.com →
                </a>
              </div>
              
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                  {t("businessHours")}
                </h3>
                <p className="text-sm text-[#8e8f94] font-light mb-2">{t("businessHoursBody")}</p>
              </div>
            </div>

            {/* Embedded Chat */}
            <div className="lg:col-span-8 relative">
              <EmbeddedChat initialMessage={message} />
            </div>
          </div>
        </div>
      </section>

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
      </section>
    </div>
  );
}
