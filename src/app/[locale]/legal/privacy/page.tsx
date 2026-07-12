import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function Privacy({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      <h1 className="font-display text-4xl">{t("privacyTitle")}</h1>
      <p className="mt-8 leading-relaxed text-fog">{t("privacyBody")}</p>
    </div>
  );
}
