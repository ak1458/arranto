'use client';

// CTA that opens the site-wide chat widget (Chat.tsx listens for this event).
export function OpenChatButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event('arranto:open-chat'))}
    >
      {label}
    </button>
  );
}
