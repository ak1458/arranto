"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Logo } from "./Logo";

function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 font-mono text-xs" role="group" aria-label="Language switch">
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={locale === l ? "true" : undefined}
          className={`px-1.5 py-1 uppercase transition-colors ${
            locale === l ? "text-[#FF6B00] font-semibold" : "text-muted hover:text-paper"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hide = gsap.to(bar.current, {
          yPercent: -110,
          duration: 0.35,
          ease: "power2.out",
          paused: true,
        });
        ScrollTrigger.create({
          start: "top -80",
          onUpdate: (self) =>
            self.direction === 1 ? hide.play() : hide.reverse(),
        });
      });
    },
    { scope: bar },
  );

  const links = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "About", href: "#about" },
    { label: "Insights", href: "#insights" },
  ];

  return (
    <>
      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-50 bg-[#050505]/85 backdrop-blur-md border-b border-paper/5 transition-all duration-300"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" aria-label="Arranto" className="flex items-center gap-3.5 text-paper group">
            <Logo className="h-7 w-auto transition-transform duration-500 group-hover:scale-105" />
            <span className="font-mono text-base font-light tracking-[0.32em] text-paper">
              ARRANTO
            </span>
          </Link>

          {/* Center Navigation Links matching hero.png */}
          <nav className="hidden items-center gap-8 text-sm font-normal text-paper/80 md:flex">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors duration-200 hover:text-[#FF6B00]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right CTA Button ("Let's Build ->") */}
          <div className="hidden items-center gap-6 md:flex">
            <LocaleSwitch />
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 rounded-full border border-paper/20 bg-ink-raised/60 px-5 py-2 text-xs font-medium uppercase tracking-wider text-paper transition-all duration-300 hover:border-[#FF6B00] hover:bg-[#FF6B00]/10 hover:shadow-[0_0_20px_rgba(255,107,0,0.3)]"
            >
              <span>Let&apos;s Build</span>
              <span className="grid size-5 place-items-center rounded-full bg-[#FF6B00] text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="flex items-center gap-2 font-mono text-xs text-fog md:hidden"
          >
            <span>MENU</span>
            <span className="text-lg">≡</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex flex-col bg-[#050505]/98 p-8 backdrop-blur-2xl md:hidden"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-paper"
            >
              <Logo className="h-6 w-auto" />
              <span className="font-mono text-sm tracking-[0.3em]">ARRANTO</span>
            </Link>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(false)}
              className="font-mono text-sm text-fog"
            >
              CLOSE ✕
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-6 text-2xl font-light">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-paper transition-colors hover:text-[#FF6B00]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit items-center gap-4 rounded-full border border-[#FF6B00] bg-[#FF6B00]/10 px-6 py-3 text-base text-[#FF6B00]"
            >
              <span>Let&apos;s Build</span>
              <span>→</span>
            </a>
          </nav>
          <div className="mt-auto">
            <LocaleSwitch />
          </div>
        </div>
      )}
    </>
  );
}
