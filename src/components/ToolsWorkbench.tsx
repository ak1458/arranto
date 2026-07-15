import { Link } from '@/i18n/navigation';

type ToolItem = {
  href: string;
  title: string;
  badge: string;
  desc: string;
  features: string[];
};

type Props = {
  tools: ToolItem[];
  openText: string;
};

export function ToolsWorkbench({ tools, openText }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <Link
          key={tool.href}
          href={tool.href}
          className="group flex h-full min-h-[280px] flex-col justify-between border border-white/10 bg-[#0a0a0a] p-7 shadow-xl transition-all duration-300 hover:border-[#d8d9dc] hover:bg-[#111111]"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex border border-white/10 bg-white/[0.04] px-3.5 py-1 text-[10px] font-mono uppercase tracking-wide text-[#9494a0]">
                {tool.badge}
              </span>
              <span className="font-mono text-[10px] text-[#8e8f94] group-hover:text-white transition-colors">
                &rarr;
              </span>
            </div>
            <h2 className="font-display text-lg font-bold leading-tight text-white group-hover:text-[#d8d9dc] transition-colors">
              {tool.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9494a0] font-light">
              {tool.desc}
            </p>
          </div>

          <div>
            <div className="mt-6 flex flex-wrap gap-2">
              {tool.features.map((f) => (
                <span
                  key={f}
                  className="border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-[#9494a0]"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-[#d8d9dc] group-hover:underline">
                {openText} &rarr;
              </span>
              <span className="font-mono text-[10px] text-[#8e8f94]">LIVE SANDBOX</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
