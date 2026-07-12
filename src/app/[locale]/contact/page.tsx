import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

  return (
    <div className="pt-20">
      <TerminalForm />
    </div>
  );
}
