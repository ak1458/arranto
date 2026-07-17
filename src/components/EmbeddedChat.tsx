'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

type Message = {
  role: 'user' | 'assistant' | 'link';
  content?: string;
  href?: string;
  kind?: string; // 'proposal' | 'pdf'
};

export function EmbeddedChat({ initialMessage }: { initialMessage?: string }) {
  const t = useTranslations('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialMessage ?? '');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [didGreet, setDidGreet] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, busy, status, error]);

  // Proactively start conversation when component mounts
  useEffect(() => {
    if (!didGreet && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: "Hello. I'm the Arranto assistant. I can help you scope out a custom build, audit your current setup, or answer any questions you have about our work. What are you looking to build?",
      };
      setMessages([welcomeMessage]);
      setDidGreet(true);
    }
  }, [didGreet, messages.length]);

  const statusLabel = (key: string) => {
    const map = t.raw('status') as Record<string, string>;
    return map[key] ?? map.default;
  };

  async function send() {
    if (!input.trim() || busy) return;

    const userText = input.trim();
    setInput('');
    setError(null);
    setBusy(true);

    const history = [...messages];
    const newMessages = [...messages, { role: 'user', content: userText } as Message];
    setMessages(newMessages);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) throw new Error('API Error');

      const reader = res.body.getReader();
      let current = [...newMessages];
      let reply = '';
      let gotAnything = false;

      const render = () => setMessages([...current, { role: 'assistant', content: reply }]);

      const decoder = new TextDecoder();
      let buffer = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          let ev: { t: string; text?: string; tool?: string; href?: string; kind?: string };
          try { ev = JSON.parse(line); } catch { continue; }
          
          if (ev.t === 'delta' && ev.text) {
            reply += ev.text;
            gotAnything = true;
            setStatus(null);
            render();
          } else if (ev.t === 'status' && ev.tool) {
            if (reply) { current = [...current, { role: 'assistant', content: reply }]; reply = ''; }
            setStatus(statusLabel(ev.tool));
            render();
          } else if (ev.t === 'link' && ev.href) {
            if (reply) { current = [...current, { role: 'assistant', content: reply }]; reply = ''; }
            current = [...current, { role: 'link', href: ev.href, kind: ev.kind === 'pdf' ? 'pdf' : 'proposal' }];
            gotAnything = true;
            render();
          } else if (ev.t === 'error') {
            setError(t('error'));
          }
        }
      }
      setStatus(null);
      if (!gotAnything) {
        setMessages(history);
        setError(t('error'));
      }
    } catch {
      setStatus(null);
      setError(t('error'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] text-white">
      <div className="relative border border-white/10 bg-[#0A0A0C] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-xs sm:text-sm flex flex-col h-[70vh] min-h-[500px]">
        
        {/* Terminal Header */}
        <div className="relative flex items-center justify-between border-b border-white/10 bg-[#050505] px-5 py-3 shrink-0">
          <span className="text-[10px] text-[#8e8f94] tracking-wider uppercase flex items-center gap-2">
            <span className="size-2 animate-pulse bg-[#d8d9dc]" />
            arranto@core-terminal:~ $ initiate --consultation
          </span>
          <span className="text-[10px] text-[#d8d9dc] font-semibold tracking-wider">
            SECURE // AI ONLINE
          </span>
        </div>

        {/* Chat Log */}
        <div 
          ref={logRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 bg-[#0A0A0C]"
        >
          {messages.map((m, i) => (
            m.role === 'link' ? (
              <a
                key={i}
                href={m.href}
                target="_blank"
                rel="noopener"
                className="me-auto block w-fit max-w-[95%] border border-[#d8d9dc]/40 bg-white/[0.04] px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#d8d9dc] transition-colors hover:border-[#d8d9dc] hover:bg-white/[0.08]"
              >
                {m.kind === 'pdf' ? t('linkPdf') : t('linkProposal')} ↗
              </a>
            ) : (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ms-auto w-fit max-w-[85%] border border-white/10 bg-[#d8d9dc]/10 text-white px-4 py-3 shadow-md font-sans text-sm'
                    : 'me-auto w-fit max-w-[95%] text-[#c9cace] font-sans text-sm leading-relaxed whitespace-pre-wrap'
                }
              >
                {m.content}
              </div>
            )
          ))}

          {busy && (
            <p className="font-mono text-[10px] text-[#8e8f94] uppercase tracking-wider">
              [SYSTEM]: {status ?? t('thinking')}
              <span className="terminal-caret" aria-hidden="true" />
            </p>
          )}

          {error && (
            <p className="font-mono text-xs text-red-400">[ERR] {error}</p>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
          className="flex flex-col border-t border-white/10 bg-[#050505] p-4 shrink-0 relative z-20"
        >
          <div className="flex items-end gap-3">
            <span className="mb-2 shrink-0 text-[#d8d9dc] font-mono text-sm">&gt;</span>
            <textarea
              rows={1}
              value={input}
              maxLength={2000}
              placeholder="Type your message here..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              className="max-h-32 flex-1 resize-none bg-transparent py-2 font-mono text-sm text-[#f0efec] placeholder:text-[#8e8f94] focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="border border-[#d8d9dc] px-6 py-3 font-mono text-[10px] uppercase font-bold tracking-widest text-[#d8d9dc] transition-colors hover:bg-[#d8d9dc] hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#d8d9dc]"
            >
              {busy ? '...' : t('send')}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
