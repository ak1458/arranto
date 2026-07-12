import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Noto_Naskh_Arabic,
  Noto_Sans_Arabic,
} from "next/font/google";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});
const naskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-serif",
});
const sansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-sans",
});

// Motion gate: runs before paint so GSAP-revealed elements are hidden only
// when motion is actually going to play (JS on + no reduced-motion).
const MOTION_GATE = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok')`;

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
  return {
    metadataBase: new URL("https://arranto.com"),
    title: t("title"),
    description: t("description"),
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  };
}

export const viewport: Viewport = { themeColor: "#1C1B2E" };

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
    <html
      lang={locale}
      dir={dir}
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} ${naskh.variable} ${sansArabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_GATE }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <a
            href="#main"
            className="fixed start-4 top-2 z-50 -translate-y-16 bg-gold px-3 py-1.5 text-sm text-ink transition-transform focus:translate-y-0"
          >
            {t("skip")}
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
