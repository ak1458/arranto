'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Msg = { role: 'user' | 'assistant'; content: string };

export function Chat() {
  const t = useTranslations('chat');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Esc closes and returns focus to the launcher, per WCAG 2.1.1/2.4.3.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    inputRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Pin to the newest token as the reply streams in.
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    const history: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(history);
    setInput('');
    setError(null);
    setBusy(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The route caps history at 30 messages — send the most recent window.
        body: JSON.stringify({ messages: history.slice(-30) }),
      });

      if (!res.ok || !res.body) {
        setError(res.status === 429 ? t('rateLimited') : t('error'));
        return;
      }

      setMessages([...history, { role: 'assistant', content: '' }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: 'assistant', content: reply }]);
      }
      // A stream that opens and closes empty is a failure, not an empty answer.
      if (!reply.trim()) {
        setMessages(history);
        setError(t('error'));
      }
    } catch {
      setError(t('error'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? t('close') : t('launch')}
        className="fixed bottom-6 end-6 z-50 grid h-14 w-14 place-items-center border border-white/15 bg-[#0a0a0a] text-[#d8d9dc] shadow-lg transition-colors hover:border-[#d8d9dc] hover:bg-[#d8d9dc] hover:text-black motion-reduce:transition-none"
      >
        <span aria-hidden="true" className="font-mono text-lg leading-none">
          {open ? '×' : '✦'}
        </span>
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-modal="false"
          aria-label={t('title')}
          className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col border-t border-white/10 bg-[#050505] text-[#f0efec] shadow-2xl sm:inset-x-auto sm:bottom-24 sm:end-6 sm:h-[min(34rem,70dvh)] sm:w-[26rem] sm:border"
        >
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#d8d9dc]">
              {t('title')}
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label={t('close')}
              className="font-mono text-sm text-[#8e8f94] transition-colors hover:text-[#f0efec] motion-reduce:transition-none"
            >
              &times;
            </button>
          </header>

          {/* data-lenis-prevent: without it, Lenis swallows the wheel event and this list never scrolls. */}
          <div
            ref={logRef}
            data-lenis-prevent
            role="log"
            aria-live="polite"
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm leading-relaxed"
          >
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-[#8e8f94]">{t('greeting')}</p>
                <div className="flex flex-col gap-2 pt-2">
                  {[
                    "How do pricing and scope work?",
                    "What technologies do you build with?",
                    "How long does a typical project take?"
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        setInput(suggestion);
                      }}
                      className="text-start border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-[#d8d9dc] transition-colors hover:border-[#d8d9dc]/40 hover:bg-white/[0.07]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                  ? 'ms-auto w-fit max-w-[85%] bg-white/[0.07] px-3 py-2 text-[#f0efec]'
                    : 'me-auto w-fit max-w-[95%] whitespace-pre-wrap text-[#c9cace]'
                }
              >
                {m.content}
                {m.role === 'assistant' && !m.content && busy && (
                  <span className="terminal-caret" aria-label={t('thinking')} />
                )}
              </div>
            ))}

            {error && (
              <p className="font-mono text-xs text-[#8e8f94]">[ERR] {error}</p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="flex items-end gap-2 border-t border-white/10 px-4 py-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              {t('inputLabel')}
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={2000}
              placeholder={t('placeholder')}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // Enter sends; Shift+Enter is a newline.
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              className="max-h-32 flex-1 resize-none border-b border-white/20 bg-transparent py-2 text-sm text-[#f0efec] transition-colors focus:border-[#d8d9dc] focus:outline-none motion-reduce:transition-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="border border-[#d8d9dc] px-3 py-2 font-mono text-xs tracking-wider text-[#d8d9dc] transition-colors hover:bg-[#d8d9dc] hover:text-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#d8d9dc] motion-reduce:transition-none"
            >
              {busy ? t('sending') : t('send')}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
