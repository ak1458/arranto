"use client";

// Centralised GA4 event helper — fires via gtag() (already loaded by Analytics.tsx).
// All custom events land in GA4 automatically; no GTM container edits needed.
//
// Usage:  import { trackEvent } from "@/lib/track";
//         trackEvent("cta_click", { cta_text: "Start your project", cta_location: "hero" });

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;

  // gtag is initialised by Analytics.tsx; guard against it not being ready yet
  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, params);
  }
}

// ── Pre-built helpers for the main conversion events ──

export function trackCTAClick(ctaText: string, ctaLocation: string) {
  trackEvent("cta_click", {
    cta_text: ctaText,
    cta_location: ctaLocation,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("whatsapp_click", {
    click_location: location,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackEmailClick(location: string) {
  trackEvent("email_click", {
    click_location: location,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackContactFormSubmit(service: string, locale: string) {
  trackEvent("contact_form_submit", {
    service_interest: service || "(none)",
    locale,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackJobApplication(role: string) {
  trackEvent("job_application_submit", {
    job_role: role,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackChatStarted() {
  trackEvent("chat_started", {
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackOutboundLink(url: string, text: string) {
  trackEvent("outbound_link", {
    link_url: url,
    link_text: text,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function trackToolUsage(toolName: string, action: string) {
  trackEvent("tool_usage", {
    tool_name: toolName,
    action,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}
