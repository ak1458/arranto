import type { Metadata } from 'next';
import WebsiteFactoryPageClient from './WebsiteFactoryPageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: 'Website Factory — Arranto',
    description: 'Generate a complete website blueprint from a short business brief.',
    path: '/tools/website-factory',
    locale,
  });
}

export default function Page() {
  return (
    <>
      <WebsiteFactoryPageClient />
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ToolGuide toolKey="factory" />
      </div>
    </>
  );
}
