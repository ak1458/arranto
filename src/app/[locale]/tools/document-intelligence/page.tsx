import type { Metadata } from 'next';
import DocumentIntelligencePageClient from './DocumentIntelligencePageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: 'Document Intelligence — Arranto',
    description: 'Extract summaries, key fields, and action items from raw documents with AI.',
    path: '/tools/document-intelligence',
    locale,
  });
}

export default function Page() {
  return (
    <>
      <DocumentIntelligencePageClient />
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ToolGuide toolKey="documents" />
      </div>
    </>
  );
}
