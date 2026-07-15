'use client';

import React from 'react';

const ITEMS = [
  {
    id: 'top',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 pointer-events-none">
        <path d="M3 11l9-8 9 8M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    id: 'work',
    label: 'Work',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 pointer-events-none">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'process',
    label: 'Process',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 pointer-events-none">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 pointer-events-none">
        <path d="M4 4h16v16H4z" />
        <path d="M4 6l8 6 8-6" />
      </svg>
    ),
  },
];

export function Dock() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center pointer-events-none md:hidden">
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#191922]/80 px-3.5 py-2 shadow-2xl backdrop-blur-md pointer-events-auto">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            aria-label={item.label}
            className="flex size-[46px] shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#191922] text-[#9494a0] transition-transform duration-150 ease-out hover:text-[#d8d9dc] active:scale-90 active:bg-[#d8d9dc] active:text-black"
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
