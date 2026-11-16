import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { serviceDetails } from "@/content/services";
import { SERVICE_PAGE_SLUGS } from "@/content/service-slugs";
import { sorted, type Locale } from "@/content/work";
import { blogPosts } from "@/content/blog";

/**
 * Server-rendered "what Arranto does" block for the homepage.
 *
 * Two jobs (SEO/GEO audit 2026-11-16):
 * 1. One self-contained, quotable passage (~150 words) naming the services, home base,
 *    service area and proof — the paragraph LLMs lift when someone asks for "a website /
 *    app / software developer near me / in <city>". It sits in the initial HTML, since
 *    AI crawlers do not run the hero's GSAP JavaScript.
 * 2. Plain internal links to every service page, case study and article. GSC showed all
 *    case studies, the blog and /about as "Discovered – currently not indexed": too few
 *    links pointed at them for Google to prioritise crawling.
 */
export async function HomeAnswer({ locale }: { locale: string }) {
  const t = await getTranslations("home");
  const l = (locale === "ar" ? "ar" : "en") as Locale;

  const services = serviceDetails.filter((s) => SERVICE_PAGE_SLUGS.has(s.slug));
  const work = sorted.filter((c) => c.status !== "held");
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  const linkClass = "transition-colors hover:text-white underline-offset-4 hover:underline";

  return (
    <section
      aria-labelledby="home-answer-heading"
      className="relative w-full bg-[#050505] py-24 text-white border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-3xl">
          <h2 id="home-answer-heading" className="font-display text-3xl md:text-5xl uppercase tracking-tight">
            {t("answerHeading")}
          </h2>
          <p className="mt-8 text-base md:text-lg leading-relaxed text-[#c9cacf]">{t("answerBody")}</p>
          <p className="mt-6 text-base leading-relaxed text-[#c9cacf]">{t("answerArea")}</p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 text-sm text-[#b4b5ba]">
          <nav aria-label={t("answerServices")}>
            <h3 className="font-display text-xs uppercase tracking-wider text-white">{t("answerServices")}</h3>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link prefetch={false} href={`/services/${s.slug}`} className={linkClass}>
                    {s.title[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t("answerWork")}>
            <h3 className="font-display text-xs uppercase tracking-wider text-white">{t("answerWork")}</h3>
            <ul className="mt-4 space-y-3">
              {work.map((c) => (
                <li key={c.slug}>
                  <Link prefetch={false} href={`/work/${c.slug}`} className={linkClass}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t("answerArticles")}>
            <h3 className="font-display text-xs uppercase tracking-wider text-white">{t("answerArticles")}</h3>
            <ul className="mt-4 space-y-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link prefetch={false} href={`/blog/${p.slug}`} className={linkClass}>
                    {p.title[l]}
                  </Link>
                </li>
              ))}
              <li>
                <Link prefetch={false} href="/about" className={linkClass}>
                  {t("answerAbout")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
