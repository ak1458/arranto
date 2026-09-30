import type { Metadata } from 'next';
import WebsiteAuditPageClient from './WebsiteAuditPageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: locale === 'ar' ? 'فحص مجاني للموقع — أرانتو' : 'Free Website Audit — Arranto',
    description: locale === 'ar' ? 'احصل على تقييم فوري لموقعك في السيو والأداء والتوافق مع الجوال والأمان.' : 'Get an instant grading on your website SEO, performance, mobile-readiness, and security.',
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
