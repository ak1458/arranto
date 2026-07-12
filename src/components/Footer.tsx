import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";

const TOOLS_URL = "https://smilefotilo.com/tools";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 pb-28 md:flex-row md:items-center md:justify-between md:pb-12">
        <Link href="/" aria-label="Arranto" className="text-paper">
          <Logo className="h-6 w-auto" />
        </Link>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-fog">
          <Link href="/work" className="hover:text-paper">{t("nav.work")}</Link>
          <Link href="/studio" className="hover:text-paper">{t("nav.studio")}</Link>
          <Link href="/contact" className="hover:text-paper">{t("nav.contact")}</Link>
          <a
            href={TOOLS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-paper"
          >
            {t("footer.tools")} <span aria-hidden>↗</span>
          </a>
          <Link href="/legal/privacy" className="hover:text-paper">
            {t("footer.privacy")}
          </Link>
          <Link href="/legal/terms" className="hover:text-paper">
            {t("footer.terms")}
          </Link>
        </nav>

        <p className="font-mono text-xs text-muted">{t("footer.address")}</p>
      </div>
    </footer>
  );
}
