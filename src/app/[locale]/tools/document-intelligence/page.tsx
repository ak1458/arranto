import type { Metadata } from 'next';
import DocumentIntelligencePageClient from './DocumentIntelligencePageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: locale === 'ar' ? 'ذكاء المستندات — أرانتو' : 'Document Intelligence — Arranto',
    description: locale === 'ar' ? 'استخرج الملخصات والحقول الأساسية والمهام المطلوبة من المستندات الخام بالذكاء الاصطناعي.' : 'Extract summaries, key fields, and action items from raw documents with AI.',
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
