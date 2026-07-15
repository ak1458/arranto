'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export function TerminalForm({ initialMessage }: { initialMessage?: string }) {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('contact');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(initialMessage ?? '');
  const [botcheck, setBotcheck] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ text: string; ok: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setNotice({ text: t('invalid'), ok: false });
      return;
    }

    setBusy(true);
    setNotice(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          locale,
          botcheck,
        }),
      });

      if (res.ok) {
        setNotice({ text: t('success'), ok: true });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setNotice({ text: t('error'), ok: false });
      }
    } catch {
      setNotice({ text: t('error'), ok: false });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-svh w-full overflow-hidden bg-[#050505] py-28 text-white border-t border-white/10 select-none">
    <div className="absolute top-1/3 start-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[#d8d9dc]/5 blur-[140px] pointer-events-none"/>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#d8d9dc]">
            {t('eyebrow')}
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-white">
            {t('heading')}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#8e8f94] max-w-2xl font-light">
            {t('subline')}
          </p>
        </div>

        {/* Retro terminal window */}
        <div className="relative mx-auto max-w-3xl border border-[#d8d9dc]/35 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-xs sm:text-sm">
          {/* CRT scanline overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
            }}
          />

          {/* Title bar */}
          <div className="relative flex items-center justify-between border-b border-[#d8d9dc]/25 bg-[#0A0A0C] px-5 py-3">
            <span className="text-[10px] text-[#8e8f94] tracking-wider uppercase">
              arranto@core-terminal:~ $ initiate --contact
            </span>
            <span className="text-[10px] text-[#d8d9dc] font-semibold tracking-wider">
              SECURE // TLS 1.3
            </span>
          </div>

          <form onSubmit={handleSubmit} className="relative p-6 sm:p-10 bg-[#050505]">
            {/* honeypot — hidden from real visitors, only bots fill it */}
            <input
              type="text"
              name="botcheck"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -start-[9999px] h-0 w-0 opacity-0"
            />

            <div className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#8e8f94] sm:text-sm">
              <span className="font-bold text-[#d8d9dc]">visitor@arranto-core:~$</span>
              <span className="text-white">compose --message</span>
              <span className="inline-block h-4 w-2 animate-pulse bg-[#d8d9dc]" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="block text-[10px] uppercase tracking-wider text-[#8e8f94]">
                  $ {t('name')}:
                </span>
                <div className="flex items-center border border-white/15 bg-black px-4 py-3">
                  <span className="me-2 shrink-0 text-[#d8d9dc]">&gt;</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent font-mono text-white placeholder-white/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] uppercase tracking-wider text-[#8e8f94]">
                  $ {t('email')}:
                </span>
                <div className="flex items-center border border-white/15 bg-black px-4 py-3">
                  <span className="me-2 shrink-0 text-[#d8d9dc]">&gt;</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent font-mono text-white placeholder-white/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] uppercase tracking-wider text-[#8e8f94]">
                  $ {t('message')}:
                </span>
                <div className="flex border border-white/15 bg-black px-4 py-3">
                  <span className="me-2 shrink-0 pt-0.5 text-[#d8d9dc]">&gt;</span>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none bg-transparent font-mono text-white placeholder-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {notice && (
              <div
                className={`mt-6 border p-3 text-xs ${
                  notice.ok
                    ? 'border-[#d8d9dc]/30 bg-[#d8d9dc]/10 text-[#d8d9dc]'
                    : 'border-dashed border-white/30 bg-white/[0.03] text-[#8e8f94]'
                }`}
              >
                {notice.text}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="submit"
                disabled={busy}
                className="border border-[#d8d9dc] bg-[#d8d9dc] px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-black transition-all hover:bg-transparent hover:text-[#d8d9dc] disabled:opacity-50"
              >
                {busy ? `> ${t('sending')}` : `> ${t('submit')}`}
              </button>
              <span className="flex items-center gap-2 text-[10px] text-[#8e8f94]">
                <span className="size-2 animate-pulse bg-[#d8d9dc]" />
                CORE // SYSTEM_ONLINE
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
