import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getPostBySlug, type Locale } from "@/content/blog";
import { Reveal } from "@/components/Reveal";
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
  // Simple markdown-like parser (headers, lists, blockquotes, code blocks, paragraphs)
  const renderArticle = (text: string) => {
    const blocks = text.split("\\n\\n").filter(Boolean);
    
    return blocks.map((block, idx) => {
      // Code block
      if (block.startsWith("\`\`\`") && block.endsWith("\`\`\`")) {
        const lines = block.split("\\n");
        const code = lines.slice(1, -1).join("\\n");
        const lang = lines[0].replace("\`\`\`", "").trim();
        return (
          <div key={idx} className="my-8 rounded-md bg-[#0a0a0c] border border-white/10 overflow-hidden">
            {lang && (
              <div className="bg-[#121218] px-4 py-2 border-b border-white/10 text-xs font-mono text-[#8e8f94] flex items-center">
                {lang}
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm font-mono text-[#d8d9dc] leading-relaxed">{code}</code>
            </pre>
          </div>
        );
      }
      // H3
      if (block.startsWith("### ")) {
        return (
          <h3 key={idx} className="mt-12 mb-6 text-2xl font-display font-bold text-white tracking-tight">
            {block.replace("### ", "")}
          </h3>
        );
      }
      // Blockquote
      if (block.startsWith("> ")) {
        return (
          <blockquote key={idx} className="my-8 border-s-2 border-[#d8d9dc] bg-[#d8d9dc]/5 p-6 text-lg font-light italic leading-relaxed text-[#d8d9dc]">
            {block.replace(/> /g, "").replace(/\\[!IMPORTANT\\]/g, "").trim()}
          </blockquote>
        );
      }
      // Unordered list
      if (block.startsWith("* ")) {
        const items = block.split("\\n").filter(line => line.startsWith("* "));
        return (
          <ul key={idx} className="my-6 space-y-3 ps-5">
            {items.map((item, i) => {
              // Basic bold matching: **text**
              const parts = item.replace("* ", "").split(/\\*\\*(.*?)\\*\\*/g);
              return (
                <li key={i} className="text-base text-[#9494a0] leading-relaxed relative before:absolute before:-start-5 before:top-2 before:h-1.5 before:w-1.5 before:bg-[#d8d9dc]">
                  {parts.map((p, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="text-white font-semibold">{p}</strong> : p)}
                </li>
              );
            })}
          </ul>
        );
      }
      // Standard paragraph
      return (
        <p key={idx} className="mb-6 text-base sm:text-lg text-[#9494a0] font-light leading-relaxed">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="relative min-h-svh w-full bg-[#050505] text-white overflow-hidden py-32">
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
            {renderArticle(rawArticle)}
          </Reveal>
        </article>
      </div>
    </div>
  );
}
