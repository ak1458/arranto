import type { Metadata } from 'next';
import WebsiteAuditPageClient from './WebsiteAuditPageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: 'Free Website Audit — Arranto',
    description: 'Get an instant grading on your website SEO, performance, mobile-readiness, and security.',
    path: '/tools/website-audit',
    locale,
  });
}

export default function Page() {
  return (
    <>
      <WebsiteAuditPageClient />
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ToolGuide toolKey="audit" />
      </div>
    </>
  );
}
