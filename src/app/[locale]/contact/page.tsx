import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { TerminalForm } from "@/components/TerminalForm";
import { alternatesFor } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: alternatesFor("/contact", locale),
  };
}

export default async function Contact({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <Reveal>
        <h1 className="font-display text-5xl">{t("heading")}</h1>
      </Reveal>
      <Reveal className="mt-10" delay={0.1}>
        <TerminalForm />
      </Reveal>
    </div>
  );
}
