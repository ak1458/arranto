import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sorted, type Locale } from "@/content/work";
import { Reveal } from "@/components/Reveal";
import { WorkGrid } from "@/components/WorkGrid";
import { alternatesFor } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("workTitle"),
    description: t("workDescription"),
    alternates: alternatesFor("/work", locale),
  };
}

export default async function WorkIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <Reveal>
        <p className="font-mono text-sm text-muted">{t("eyebrow")}</p>
        <h1 className="mt-2 font-display text-5xl">{t("heading")}</h1>
      </Reveal>
      <div className="mt-12">
        <WorkGrid items={sorted} locale={locale as Locale} />
      </div>
    </div>
  );
}
