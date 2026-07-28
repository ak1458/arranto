import { getAllDocs } from '@/lib/docs';
import { redirect, notFound } from 'next/navigation';

export default async function ProductDocsIndexPage({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product } = await params;
  const docs = getAllDocs(product);

  if (!docs || docs.length === 0) {
    notFound();
  }

  // Redirect to the first document (usually README or 01-welcome)
  redirect(`/${locale}/support/docs/${product}/${docs[0].slug}`);
}
