'use client';

// CTA that opens the site-wide chat widget (Chat.tsx listens for this event).
export function OpenChatButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('arranto:open-chat'))}
    >
      {children}
    </button>
  );
}
