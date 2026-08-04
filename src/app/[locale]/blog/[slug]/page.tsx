import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getPostBySlug, type Locale } from "@/content/blog";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { ArticleBody } from "@/components/ArticleBody";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  const post = getPostBySlug(slug);

  if (!post) {
    return pageMetadata({
      title: "Post Not Found",
      description: "The requested post could not be found.",
      path: `/blog/${slug}`,
      locale,
    });
  }

  return pageMetadata({
    title: `${post.title[l]} | Blog | Arranto`,
    description: post.excerpt[l],
    path: `/blog/${slug}`,
    locale,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = (locale === "ar" ? "ar" : "en") as Locale;
  
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const rawArticle = post.article[l];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title[l],
        description: post.excerpt[l],
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: locale,
        articleSection: post.category,
        author: {
          "@type": "Person",
          name: "Ashraf Kamal",
          url: `https://arranto.com/${locale}/about`,
        },
        publisher: {
          "@type": "Organization",
          name: "Arranto",
          url: "https://arranto.com",
          logo: { "@type": "ImageObject", url: "https://arranto.com/icon.svg" },
        },
        mainEntityOfPage: `https://arranto.com/${locale}/blog/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "ar" ? "الرئيسية" : "Home", item: `https://arranto.com/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "ar" ? "المدونة" : "Blog", item: `https://arranto.com/${locale}/blog` },
          { "@type": "ListItem", position: 3, name: post.title[l], item: `https://arranto.com/${locale}/blog/${slug}` },
        ],
      },
      ...(post.faq && post.faq.length > 0
        ? [{
            "@type": "FAQPage",
            mainEntity: post.faq.map(({ q, a }) => ({
              "@type": "Question",
              name: q[l],
              acceptedAnswer: { "@type": "Answer", text: a[l] },
            })),
          }]
        : []),
    ],
  };

  return (
    <div className="relative min-h-svh w-full bg-[#050505] text-white overflow-hidden py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none"/>
      
      <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8e8f94] transition-colors duration-300 hover:text-white mb-16"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 rtl:-scale-x-100">
            ←
          </span>
          {locale === 'ar' ? 'العودة إلى المدونة' : 'BACK TO BLOG'}
        </Link>

        <header className="mb-16 border-b border-white/10 pb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-flex border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-mono uppercase tracking-[0.2em] text-[#d8d9dc]">
              {post.category}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8e8f94]">
              {post.date} &bull; {post.readTime}
            </span>
          </div>
          
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-white mb-6">
            {post.title[l]}
          </h1>
          
          <p className="text-lg sm:text-xl text-[#d8d9dc] font-light leading-relaxed">
            {post.excerpt[l]}
          </p>
        </header>

        <article className="prose prose-invert max-w-none">
          <Reveal>
            <ArticleBody text={rawArticle} />
          </Reveal>
        </article>

        {post.faq && post.faq.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <Accordion
                label={l === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                items={post.faq.map(({ q, a }) => ({ q: q[l], a: a[l] }))}
              />
            </Reveal>
          </div>
        )}
      </div>
    </div>
  );
}
