import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing | Arranto",
    robots: { index: false, follow: false },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/contact`);
}
