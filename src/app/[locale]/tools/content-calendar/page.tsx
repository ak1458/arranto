import type { Metadata } from 'next';
import ContentCalendarPageClient from './ContentCalendarPageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: 'Content Calendar — Arranto',
    description: 'Plan a week of social media content with AI-generated captions and hashtags.',
    path: '/tools/content-calendar',
    locale,
  });
}

export default function Page() {
  return (
    <>
      <ContentCalendarPageClient />
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ToolGuide toolKey="calendar" />
      </div>
    </>
  );
}
