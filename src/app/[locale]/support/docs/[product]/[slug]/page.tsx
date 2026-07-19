import { getDocBySlug } from '@/lib/docs';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function DocPage({
  params,
}: {
  params: Promise<{ product: string; slug: string }>;
}) {
  const { product, slug } = await params;
  const doc = getDocBySlug(product, slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-invert max-w-none prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-headings:text-white prose-strong:text-white prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-table:border-collapse prose-th:border prose-th:border-white/20 prose-td:border prose-td:border-white/10 prose-th:p-2 prose-td:p-2 prose-blockquote:border-s-4 prose-blockquote:border-white/20 prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:pe-4 prose-blockquote:ps-4 prose-blockquote:not-italic">
      <Markdown remarkPlugins={[remarkGfm]}>{doc.content}</Markdown>
    </article>
  );
}
