import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };
type CookieField = "name" | "provider" | "purpose" | "duration" | "type";
type CookieRow = Record<CookieField, string>;

const FIELDS: CookieField[] = ["name", "provider", "purpose", "duration", "type"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return pageMetadata({
    title: t("cookiesTitle"),
    description: t("cookiesSubtitle"),
    path: "/legal/cookies",
    locale,
  });
}

export default async function Cookies({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  const headers = t.raw("cookiesTableHeaders") as CookieRow;
  const rows = t.raw("cookiesRows") as CookieRow[];

  const sections = [
    { h: t("cookiesConsentHeading"), b: t("cookiesConsentBody") },
    { h: t("cookiesChangeHeading"), b: t("cookiesChangeBody") },
    { h: t("cookiesContactHeading"), b: t("cookiesContactBody") },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
    <div className="card-hover border border-paper/10 bg-[#121218] p-8 md:p-12 shadow-2xl">
    <div className="mb-4 inline-flex border border-[#d8d9dc]/30 bg-[#d8d9dc]/10 px-3.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#d8d9dc]">
          LEGAL
        </div>
        <h1 className="font-display text-4xl text-paper">{t("cookiesTitle")}</h1>
        <p className="mt-4 leading-relaxed text-paper/70 font-light">{t("cookiesSubtitle")}</p>
        <p className="mt-6 leading-relaxed text-paper/70 font-light">{t("cookiesIntro")}</p>

<div className="mt-10 overflow-x-auto border border-white/10">
          <table className="w-full min-w-[640px] border-collapse">
            <thead className="bg-white/5">
              <tr>
                {FIELDS.map((f) => (
                  <th
                    key={f}
                    className="px-4 py-3 text-start font-mono text-[10px] uppercase tracking-wider text-paper/60"
                  >
                    {headers[f]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name}>
                  {FIELDS.map((f) => (
                    <td
                      key={f}
                      className={`border-t border-white/5 px-4 py-3 align-top text-sm text-paper/70 font-light ${
                        f === "name" ? "font-mono text-paper/85" : ""
                      }`}
                    >
                      {row[f]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col gap-8 border-t border-paper/10 pt-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-sans text-lg font-medium text-paper">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-paper/70 font-light">{s.b}</p>
            </section>
          ))}
        </div>

        <Link
          href="/"
          className="group mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper/60 transition-colors duration-300 hover:text-[#d8d9dc]"
        >
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-scale-x-100"
          >
            ←
          </span>
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
