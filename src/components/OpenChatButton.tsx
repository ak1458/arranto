'use client';

import { trackCTAClick } from '@/lib/track';

// CTA that opens the site-wide chat widget (Chat.tsx listens for this event).
export function OpenChatButton({ children, className, prompt }: { children: React.ReactNode; className?: string; prompt?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        trackCTAClick(typeof children === 'string' ? children : 'Open Chat', 'chat_cta_button');
        if (prompt) {
          window.dispatchEvent(new CustomEvent('arranto:open-chat', { detail: { prompt } }));
        } else {
          window.dispatchEvent(new Event('arranto:open-chat'));
        }
      }}
    >
      {children}
    </button>
  );
}
