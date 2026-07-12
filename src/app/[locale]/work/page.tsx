import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sorted, type Locale } from "@/content/work";
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

  return (
    <div className="pt-20">
      <WorkGrid items={sorted} locale={locale as Locale} />
    </div>
  );
}
