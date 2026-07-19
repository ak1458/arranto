import { getAllDocs } from '@/lib/docs';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; product: string }>;
}) {
  const { product } = await params;
  
  if (product !== 'sanad-os') {
    notFound();
  }

  const docs = getAllDocs(product);
  
  if (docs.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-e border-white/10 pb-8 lg:pb-0 lg:pe-8">
          <nav className="sticky top-24">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">{product.replace('-', ' ')} Docs</h3>
            <ul className="space-y-3">
              {docs.map((doc) => (
                <li key={doc.slug}>
                  <Link
                    href={`/support/docs/${product}/${doc.slug}`}
                    className="text-gray-400 hover:text-white transition-colors block text-sm font-medium"
                  >
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
