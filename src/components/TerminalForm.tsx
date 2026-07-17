'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

export function TerminalForm({ initialMessage }: { initialMessage?: string }) {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('contact');
  const tRoot = useTranslations();

  const servicesList = tRoot.raw('servicesList') as Record<string, { title: string; slug: string }>;
  const budgetsList = t.raw('budgets') as Record<string, string>;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState(initialMessage ?? '');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [botcheck, setBotcheck] = useState('');
  
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ text: string; ok: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || !privacyAgreed) {
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
          service,
          budget,
          message: message.trim(),
          locale,
          botcheck,
        }),
      });

      if (res.ok) {
        setNotice({ text: t('success'), ok: true });
        setName('');
        setEmail('');
        setService('');
        setBudget('');
        setMessage('');
        setPrivacyAgreed(false);
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
          <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase leading-none tracking-tight text-white">
            {t('heading')}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#8e8f94] max-w-2xl font-light">
            {t('subline')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Quick Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                {t('methodWhatsapp')}
              </h3>
              <p className="text-sm text-[#8e8f94] font-light mb-2">{t('methodWhatsappBody')}</p>
              <a href="https://wa.me/919453878422" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-white hover:underline">
                +91 94538 78422 →
              </a>
            </div>
            
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                {t('methodPhone')}
              </h3>
              <p className="text-sm text-[#8e8f94] font-light mb-2">Direct call for immediate assistance.</p>
              <a href="tel:+919453878422" className="font-mono text-xs text-white hover:underline">
                +91 94538 78422 →
              </a>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                {t('methodEmail')}
              </h3>
              <p className="text-sm text-[#8e8f94] font-light mb-2">{t('methodEmailBody')}</p>
              <a href="mailto:help@arranto.com" className="font-mono text-xs text-white hover:underline">
                help@arranto.com →
              </a>
            </div>
            
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d8d9dc] mb-3">
                {t('businessHours')}
              </h3>
              <p className="text-sm text-[#8e8f94] font-light mb-2">{t('businessHoursBody')}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 relative border border-[#d8d9dc]/20 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-xs sm:text-sm">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
              }}
            />

            <div className="relative flex items-center justify-between border-b border-[#d8d9dc]/20 bg-[#0A0A0C] px-5 py-3">
              <span className="text-[10px] text-[#8e8f94] tracking-wider uppercase">
                arranto@core-terminal:~ $ initiate --contact
              </span>
              <span className="text-[10px] text-[#d8d9dc] font-semibold tracking-wider">
                SECURE // TLS 1.3
              </span>
            </div>

            <form onSubmit={handleSubmit} className="relative p-6 sm:p-10 bg-[#050505] z-20">
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

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="block text-[10px] uppercase tracking-wider text-[#8e8f94]">
                      $ {t('serviceInterest')}:
                    </span>
                    <div className="flex items-center border border-white/15 bg-black px-4 py-3 relative">
                      <span className="me-2 shrink-0 text-[#d8d9dc]">&gt;</span>
                      <select
                        required
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-transparent font-mono text-white placeholder-white/20 focus:outline-none appearance-none"
                      >
                        <option value="" disabled className="bg-[#050505] text-white/50">Select Service</option>
                        {Object.values(servicesList || {}).map((s) => (
                          <option key={s.slug} value={s.title} className="bg-[#050505] text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-white/50">
                        ▼
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[10px] uppercase tracking-wider text-[#8e8f94]">
                      $ {t('budgetRange')}:
                    </span>
                    <div className="flex items-center border border-white/15 bg-black px-4 py-3 relative">
                      <span className="me-2 shrink-0 text-[#d8d9dc]">&gt;</span>
                      <select
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-transparent font-mono text-white placeholder-white/20 focus:outline-none appearance-none"
                      >
                        <option value="" disabled className="bg-[#050505] text-white/50">Select Budget</option>
                        {Object.values(budgetsList || {}).map((b) => (
                          <option key={b} value={b} className="bg-[#050505] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-white/50">
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8e8f94]">
                    $ {t('projectDetails')}:
                  </span>
                  <div className="flex border border-white/15 bg-black px-4 py-3">
                    <span className="me-2 shrink-0 pt-0.5 text-[#d8d9dc]">&gt;</span>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full resize-none bg-transparent font-mono text-white placeholder-white/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="peer h-4 w-4 shrink-0 appearance-none border border-white/30 bg-transparent outline-none focus:ring-1 focus:ring-white/50 checked:bg-[#d8d9dc]"
                    />
                    <svg
                      className="pointer-events-none absolute start-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-[#050505] opacity-0 peer-checked:opacity-100"
                      viewBox="0 0 14 10"
                      fill="none"
                    >
                      <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <label htmlFor="privacy" className="text-xs text-[#8e8f94] cursor-pointer">
                    {t('privacyPolicyAgree')}
                  </label>
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

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
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
      </div>
    </section>
  );
}
