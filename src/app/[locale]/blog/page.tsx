import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts, type Locale } from "@/content/blog";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    title: t("blogTitle") || "Blog | Arranto",
    description: t("blogDescription") || "Insights on AI Automation and SaaS Development.",
    path: "/blog",
    locale,
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <div className="min-h-screen bg-[#050505] text-white py-32">
      <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none"/>
      
      <header className="px-6 pb-16 md:px-12 border-b border-white/10 relative z-10">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#d8d9dc]">
              {t("eyebrow") || "ARRANTO // INSIGHTS"}
            </span>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight">
              {t("heading") || "The Blog"}
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#9494a0] font-light leading-relaxed">
              {t("subline") || "Deep dives into AI Automation, Custom SaaS, and business efficiency."}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 md:px-12 pt-24 relative z-10">
        <div className="flex flex-col gap-12 relative before:absolute before:inset-y-0 before:start-4 before:w-[1px] before:bg-white/10">
          {blogPosts.map((post, index) => {
            const indexNumber = (index + 1).toString().padStart(2, '0');
            return (
              <div key={post.slug} className="relative flex items-start gap-6 group">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center bg-[#050505] font-mono text-[10px] text-[#8e8f94] transition-colors group-hover:text-white group-hover:bg-[#d8d9dc]/10 ring-1 ring-white/10">
                  {indexNumber}
                </div>
                
                <div className="pt-1.5 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-[#d8d9dc]">
                        {post.category}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#8e8f94]">
                        {post.date} &bull; {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#d8d9dc] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title[l]}
                      </Link>
                    </h2>
                    <p className="mt-4 text-sm text-[#9494a0] leading-relaxed font-light">
                      {post.excerpt[l]}
                    </p>
                  </div>
                  
                  <div className="lg:col-span-4 flex items-center lg:justify-end mt-4 lg:mt-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex justify-center items-center gap-2 border border-[#d8d9dc] bg-transparent px-6 py-3 text-[10px] font-extrabold uppercase tracking-widest text-[#d8d9dc] transition-all hover:bg-[#d8d9dc] hover:text-black w-full sm:w-auto"
                    >
                      {">"} Start Post
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
