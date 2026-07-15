import type { Metadata } from 'next';
import BrandKitPageClient from './BrandKitPageClient';
import { ToolGuide } from '@/components/tools/ToolGuide';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    title: 'AI Brand Kit — Arranto',
    description: 'Generate a complete brand kit: color palette, voice, taglines, and social bios.',
    path: '/tools/brand-kit',
    locale,
  });
}

export default function Page() {
  return (
    <>
      <BrandKitPageClient />
      <div className="mx-auto max-w-6xl px-6 pb-20">
        <ToolGuide toolKey="brand" />
      </div>
    </>
  );
}
