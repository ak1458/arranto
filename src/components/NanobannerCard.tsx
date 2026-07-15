'use client';

import React from 'react';

type Props = {
  title: string;
  category: string;
  status: string;
  stack?: string[];
};

export function NanobannerCard({
  title,
  category,
  status,
  stack = ['TypeScript', 'Next.js'],
}: Props) {
  return (
  <div className="group relative overflow-hidden border border-white/20 bg-[#0c0c0e] p-6 sm:p-8 shadow-2xl transition-all hover:border-white">
      {/* Top Technical Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
        <span className="size-2.5 bg-[#d8d9dc] animate-pulse"/>
          <span className="font-mono text-xs uppercase tracking-widest text-[#d8d9dc]">
            SYSTEM ARCHITECTURE // {category}
          </span>
        </div>
        <span className="font-mono text-[11px] px-2.5 py-1 bg-white/10 text-white font-bold uppercase">
          STATUS: {status}
        </span>
      </div>

      {/* Nanobanner Visual Core */}
      <div className="my-6 space-y-2">
        <span className="font-mono text-[10px] text-[#8e8f94] uppercase tracking-wider">
          PRODUCT ENGINE SPECIFICATION
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h3>
      </div>

      {/* Bottom Stack Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
        <span className="font-mono text-[11px] text-[#8e8f94] me-2">TECH STACK:</span>
        {stack.map((tech) => (
          <span
            key={tech}
            className="border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-[#d8d9dc]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
