'use client';

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";

const WA_NUMBER = "919453878422";

export function Footer() {
  const t = useTranslations();

  const studioLinks = [
    { href: "/assistant", label: t("footer.assistant") },
    { href: "/work", label: t("footer.work") },
    { href: "/about", label: t("footer.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const toolLinks = [
    { href: "/tools/website-audit", label: t("footer.toolAudit") },
    { href: "/tools/seo-content", label: t("footer.toolSeo") },
    { href: "/tools/brand-kit", label: t("footer.toolBrand") },
    { href: "/tools/content-calendar", label: t("footer.toolCalendar") },
    { href: "/tools/document-intelligence", label: t("footer.toolDocs") },
    { href: "/tools/website-factory", label: t("footer.toolFactory") },
  ];

  const legalLinks = [
    { href: "/legal/privacy", label: t("footer.privacy") },
    { href: "/legal/terms", label: t("footer.terms") },
    { href: "/legal/cookies", label: t("footer.cookies") },
    { href: "/legal/disclaimer", label: t("footer.disclaimer") },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#050505] text-[#9494a0]">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-28 md:pb-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand block */}
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1 lg:col-span-1">
            <Link href="/" aria-label="Arranto">
              <Logo variant="full" size="md" className="text-white" />
            </Link>
            <p className="text-sm leading-relaxed">{t("footer.blurb")}</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/ashrafkamal14/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#9494a0] transition-colors hover:text-[#d8d9dc]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/ak1458"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[#9494a0] transition-colors hover:text-[#d8d9dc]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-[#9494a0] transition-colors hover:text-[#d8d9dc]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Studio links */}
          <div className="col-span-1">
            <h3 className="font-display text-xs uppercase tracking-wider text-white">{t("footer.studioHeading")}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools links */}
          <div className="col-span-1">
            <h3 className="font-display text-xs uppercase tracking-wider text-white">{t("footer.resourcesHeading")}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <Link href="/tools" className="transition-colors hover:text-white">
                  {t("footer.tools")}
                </Link>
              </li>
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white text-[#9494a0]/80">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + WhatsApp */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="font-display text-xs uppercase tracking-wider text-white">{t("footer.contactHeading")}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${t("footer.email")}`} className="transition-colors hover:text-white">
                  {t("footer.email")}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#d8d9dc]"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new Event('arranto:open-chat'))}
                  className="text-[#d8d9dc] transition-colors hover:text-white text-left"
                >
                  {t("footer.cta")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-8 font-mono text-xs md:flex-row md:items-center md:justify-between">
          <p>{t("footer.address")}</p>
          <nav
            aria-label={t("footer.legalHeading")}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-[#9494a0]/70 md:text-start">
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
