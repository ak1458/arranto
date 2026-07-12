import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
import { alternatesFor } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("studioTitle"),
    description: t("studioDescription"),
    alternates: alternatesFor("/studio", locale),
  };
}

export default async function Studio({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("studio");

  return (
    <div className="mx-auto max-w-3xl px-6 pt-40 pb-32">
      <Reveal>
        <h1 className="font-display text-6xl sm:text-7xl">{t("heading")}</h1>
        <div className="mt-10 flex flex-col gap-3 border-s-2 border-gold/60 ps-6 text-lg leading-relaxed text-fog">
          <p>{t("line1")}</p>
          <p>{t("line2")}</p>
          <p>{t("line3")}</p>
        </div>
      </Reveal>
    </div>
  );
}
