import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto max-w-2xl px-6 pt-40 pb-32">
      <p className="font-mono text-sm text-gold">{t("code")}</p>
      <h1 className="mt-4 font-display text-5xl">{t("body")}</h1>
      <Link
        href="/"
        className="mt-10 inline-block border border-line px-6 py-3 text-sm hover:border-gold hover:text-gold"
      >
        {t("cta")} <span aria-hidden className="rtl:-scale-x-100">→</span>
      </Link>
    </div>
  );
}
