import { Link } from '@/i18n/navigation';

export default async function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 min-h-[80vh]">
      <h1 className="text-5xl font-display font-bold text-white mb-6 tracking-tight">Support & Documentation</h1>
      <p className="text-[#9a9a9e] max-w-2xl text-xl mb-16 leading-relaxed">
        Find help, architecture details, and comprehensive guides for our products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link 
          href="/support/docs/sanad-os/README" 
          className="group block p-10 rounded-3xl border border-white/10 bg-[#0d0d0d] hover:border-white/20 transition-all card-hover"
        >
          <h2 className="text-3xl font-display font-semibold text-white mb-4 group-hover:text-[#d8d9dc] transition-colors">Sanad OS</h2>
          <p className="text-[#9a9a9e] text-lg leading-relaxed">
            Arabic-first field-service and maintenance operations platform. View setup, architecture, and feature guides.
          </p>
        </Link>
      </div>
    </div>
  );
}
