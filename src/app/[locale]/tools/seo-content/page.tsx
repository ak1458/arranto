import type { Metadata } from 'next';
import SEOContentPageClient from './SEOContentPageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: 'SEO Content Engine — Arranto',
    description: 'Generate blog post titles, meta descriptions, outlines, and keywords for your business.',
    path: '/tools/seo-content',
    locale,
  });
}

export default function Page() {
  return (
    <>
      <SEOContentPageClient />
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ToolGuide toolKey="seo" />
      </div>
    </>
  );
}
