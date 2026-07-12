"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

type State = "idle" | "sending" | "sent" | "error" | "invalid";

export function TerminalForm() {
  const [state, setState] = useState<State>("idle");
  const locale = useLocale();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "");
    if (!data.get("name") || !data.get("message") || !/^\S+@\S+\.\S+$/.test(email)) {
      setState("invalid");
      return;
    }

    setState("sending");
    try {
      // Honeypot travels to the server, which silently discards bot hits —
      // the bot still sees a success response (docs/arranto-app-flow.md).
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email,
          message: data.get("message"),
          locale,
          botcheck: data.get("botcheck") ? "1" : undefined,
        }),
      });
      setState(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative min-h-svh w-full overflow-hidden bg-[#050505] py-28"
    >
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FF6B00]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Top Header matching 6th.png */}
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#FF6B00]">
            INITIATE ENGAGEMENT
          </p>
          <h2 className="mt-6 font-sans text-[clamp(2.8rem,5.2vw,5.5rem)] font-light leading-[1.04] tracking-[-0.04em] text-paper">
            Ready to build<br />
            <em className="font-display font-normal italic text-[#FF6B00]">
              something that lasts?
            </em>
          </h2>
          <p className="mt-8 text-base leading-relaxed text-paper/75 md:text-lg">
            Let’s engineer the systems that power your next decade of growth.
          </p>
        </div>

        {/* Form + Contact Details Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* Terminal Box */}
          <div className="overflow-hidden rounded-2xl border border-paper/15 bg-[#0D0D0D]/95 font-mono text-sm shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b border-paper/10 bg-[#121212] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-muted">
                  arranto@core-terminal:~ $ initiate --contact
                </span>
              </div>
              <span className="text-[11px] text-[#FF6B00]">SECURE TLS v1.3</span>
            </div>

            {state === "sent" ? (
              <div className="p-12 text-center">
                <p className="text-lg font-semibold text-[#FF6B00]">
                  TRANSACTION SUCCESSFUL
                </p>
                <p className="mt-2 text-sm text-fog">
                  Your transmission has been encrypted and dispatched to Arranto lead engineers.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-6 p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs text-muted">$ enter_name:</span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Alan Turing"
                      className="rounded-lg border border-paper/15 bg-[#050505] px-4 py-3 text-paper placeholder-muted/40 transition-colors focus:border-[#FF6B00] focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs text-muted">$ enter_email:</span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="alan@turing.org"
                      className="rounded-lg border border-paper/15 bg-[#050505] px-4 py-3 text-paper placeholder-muted/40 transition-colors focus:border-[#FF6B00] focus:outline-none"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-xs text-muted">$ enter_specifications:</span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your system requirements, objectives, and timeline..."
                    className="rounded-lg border border-paper/15 bg-[#050505] px-4 py-3 text-paper placeholder-muted/40 transition-colors focus:border-[#FF6B00] focus:outline-none"
                  />
                </label>

                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute -z-10 h-0 w-0 opacity-0"
                />

                {(state === "error" || state === "invalid") && (
                  <p className="text-xs text-red-400">
                    ERROR: Invalid transmission protocol. Please verify fields and re-try.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="group relative inline-flex w-fit items-center gap-3 rounded-full border border-[#FF6B00] bg-[#FF6B00]/15 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-paper transition-all duration-300 hover:bg-[#FF6B00] hover:text-ink hover:shadow-[0_0_30px_rgba(255,107,0,0.4)] disabled:opacity-50"
                >
                  <span>
                    {state === "sending" ? "TRANSMITTING..." : "EXECUTE ENGAGEMENT"}
                  </span>
                  <span>→</span>
                </button>
              </form>
            )}
          </div>

          {/* Side Direct Contact Info */}
          <div className="flex flex-col gap-8 rounded-2xl border border-paper/15 bg-[#0D0D0D]/60 p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#FF6B00]">
                DIRECT PROTOCOL
              </p>
              <a
                href="mailto:contact@arranto.com"
                className="mt-2 block font-sans text-2xl font-light text-paper hover:text-[#FF6B00] transition-colors"
              >
                contact@arranto.com
              </a>
            </div>

            <div className="border-t border-paper/10 pt-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                OPERATIONAL NODES
              </p>
              <p className="mt-2 text-base text-paper">
                Dubai • Riyadh • London • Singapore
              </p>
            </div>

            <div className="border-t border-paper/10 pt-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                RESPONSE GUARANTEE
              </p>
              <p className="mt-2 text-base text-paper/80">
                Direct lead engineer response within <strong className="text-[#FF951D]">4 hours</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
