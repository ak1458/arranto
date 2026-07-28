'use client';

// CTA that opens the site-wide chat widget (Chat.tsx listens for this event).
export function OpenChatButton({ children, className, prompt }: { children: React.ReactNode; className?: string; prompt?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
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
