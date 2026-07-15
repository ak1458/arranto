import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Chat } from "@/components/Chat";
import { PageTransition } from "@/components/PageTransition";
import { CardRepetitionClickEffect } from "@/components/CardRepetitionClickEffect";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";
  const ogAlternateLocale = locale === "ar" ? "en_US" : "ar_SA";
  return {
    metadataBase: new URL("https://arranto.com"),
    title: t("title"),
    description: t("description"),
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://arranto.com/${locale}`,
      siteName: "Arranto",
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
  };
}

export const viewport: Viewport = { themeColor: "#000000" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <PageTransition />
          <SmoothScroll>
            <a
              href="#main"
              className="fixed start-4 top-2 z-50 -translate-y-16 bg-[#d8d9dc] px-3 py-1.5 text-sm text-black transition-transform focus:translate-y-0"
            >
              {t("skip")}
            </a>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
          <Chat />
        </NextIntlClientProvider>
        <Analytics />
        <CardRepetitionClickEffect />
      </body>
    </html>
  );
}
