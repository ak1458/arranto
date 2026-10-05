import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

/** BreadcrumbList JSON-LD for a page; "Home" is prepended automatically. */
export function BreadcrumbJsonLd({ locale, trail }: { locale: string; trail: Crumb[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale, trail)) }}
    />
  );
}
