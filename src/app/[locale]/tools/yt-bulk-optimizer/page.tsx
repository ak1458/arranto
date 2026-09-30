import type { Metadata } from 'next';
import YTOptimizerClient from './YTOptimizerClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: locale === 'ar' ? 'محسّن سيو يوتيوب الجماعي — أرانتو' : 'YouTube Bulk SEO Optimizer — Arranto',
    description: locale === 'ar' ? 'أتمت تحسين سيو فيديوهات يوتيوب بالجملة، وتحسين العناوين، وتصنيف قوائم التشغيل مع إدارة حصص الواجهة البرمجية.' : 'Automate bulk YouTube video SEO, title optimization, and playlist categorization while managing API quotas.',
    path: '/tools/yt-bulk-optimizer',
    locale,
  });
}

export default function Page() {
  return (
    <>
      <YTOptimizerClient />
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ToolGuide toolKey="yt" />
      </div>
    </>
  );
}
