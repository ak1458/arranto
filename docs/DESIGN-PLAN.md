# Arranto — Master Design / UI Plan (Premium Components)

> **Purpose:** When the UI/design phase begins (Claude Code UI limit was reached before
> visual work started — see MASTER-CONTEXT D7), resume from HERE. Every component below
> has a known, extracted source so work continues without re-discovering files.
>
> **Source root:** `D:\Site componenet premium\Site Components Premium\Extracted\<Category>\<Category>\<N>\code.zip`
> (note: double-nested folder — `<Category>/<Category>/<N>/`).
> Extracted working copies currently staged at `/tmp/design_src/<key>/`.

---

## 0. Target stack (locked — match Arranto, do NOT introduce new frameworks)

- Next.js 16 App Router, TS strict, Tailwind 4, **GSAP via `useGSAP`** (already in `src/lib/gsap.ts`).
- Add **Lenis** (smooth scroll) — already used by source components; add as dep once.
- **Three.js** only for `3d22` + `hover20` (WebGL). Add as dep once.
- RTL + logical properties (Rules 008–010). Dark-only (Ink `#050505` / Signal Gold `#ff6b00` / Paper `#ecebea`).
- Every animated piece = small `'use client'` leaf component, wrapped in `useGSAP`, reads `prefers-reduced-motion` (Rule 006).
- Port vanilla `script.js` → React `useGSAP` effect. Port `styles.css` → Tailwind classes or a scoped CSS module (keep raw CSS only where keyframes/complex).
- Reuse Arranto's existing `Logo`, `ToolGuide`, color tokens (`globals.css`), not the source's own colors.

---

## 1. Chosen components (owner-selected) — the build list

| Key | Category | Source path (code.zip) | Tech | Arranto target |
|-----|----------|------------------------|-----|----------------|
| `hover19` | Hover Effects | `Hover Effects/Hover Effects/19/code.zip` (`code/`) | Vanilla + GSAP | Card / work-tile hover micro-interaction |
| `hover20` | Hover Effects | `Hover Effects/Hover Effects/20/code.zip` (`files/`, Vite) | Three.js + GSAP + canvas | Hero / feature 3D hover tilt |
| `mouse20` | Mouse Effects | `Mouse Effects/Mouse Effects/20/code.zip` (`files/`) | GSAP + ScrollTrigger + SplitText + Lenis + canvas | Custom cursor + magnetic buttons |
| `menu21` | Navigation Menus | `Navigation Menus/Navigation Menus/21/code.zip` (`files/`) | Vanilla + GSAP + audio | Mobile/overlay nav open-close (with sound) |
| `page10` | Page Transitions | `Page Transitions/Page Transitions/10/code.zip` (`KineticTypePageTransition-main/`) | GSAP (kinetic type) | Route transition wrapper (locale/tool nav) |
| `scroll63` | Scroll Animation | `Scroll Animation/Scroll Animation/63/code.zip` (`files/`, Vite) | GSAP + ScrollTrigger + Lenis + SplitText | Section reveal / hero scroll story |
| `3d22` | 3D Animation | `3D Animation/3D Animation/22/code.zip` (`files/`) | GSAP + ScrollTrigger + Lenis + (Three.js) | Hero 3D object / scroll-pinned 3D |

---

## 2. Build order (resume checkpoint)

1. **Smooth scroll base** — install `lenis`, wrap root in a `SmoothScroll` provider (`useGSAP` + Lenis). Needed by `mouse20`, `scroll63`, `3d22`, `page10`. *Checkpoint A.*
2. **`hover19`** → `WorkTileHover` client component (pure GSAP, no dep beyond gsap). *Checkpoint B.*
3. **`scroll63`** → `ScrollReveal` + hero scroll narrative. *Checkpoint C.*
4. **`mouse20`** → `CustomCursor` + `MagneticButton` (global, respects touch/reduced-motion). *Checkpoint D.*
5. **`menu21`** → overlay `NavMenu` (audio optional, gate behind user-gesture). *Checkpoint E.*
6. **`page10`** → `PageTransition` (template.tsx or motion wrapper for `[locale]` routes). *Checkpoint F.*
7. **`hover20` + `3d22`** → WebGL: install `three`, build `Hero3D` / `FeatureTilt` (lazy-load, fallback static poster). *Checkpoint G (final).*

---

## 3. Per-component port notes

### hover19 — Vanilla + GSAP (no build)
- `code/index.html` + `code/styles.css` + `code/script.js`. No node_modules.
- Port: copy GSAP timeline from `script.js` into `useGSAP` in a `WorkTileHover.tsx`. Replace source's hardcoded colors with Arranto tokens. Images: use `public/work/*` (generative SVG placeholders already render).

### hover20 — Three.js + GSAP (Vite)
- `files/` has full Vite project + `node_modules`. Do NOT copy node_modules. Extract only `index.html`, `style.css`, `script.js`, and any `public/` assets.
- Port `script.js` Three.js scene into a React component using `three` directly inside `useGSAP`/`useEffect`. Keep canvas sized to container; `prefers-reduced-motion` → static render.

### mouse20 — GSAP + ScrollTrigger + SplitText + Lenis + canvas
- `files/script.js` drives a custom cursor + canvas trail + magnetic targets.
- Port into `CustomCursor.tsx` (fixed overlay, `pointer-events-none`) + `MagneticButton.tsx` (wraps CTAs). Disable on touch devices. SplitText used for text reveal — use GSAP SplitText (licensed via gsap club? check; else manual span split).

### menu21 — Vanilla + GSAP + audio
- `files/index.html` + `style.css` + `script.js` + `img/*.mp3` (open/close/select sounds).
- Port nav animation to `NavMenu.tsx`. Audio: gate behind first user interaction (autoplay policy); provide mute toggle. Keep Arranto's existing Nav labels (Work/Studio/Contact/Tools).

### page10 — GSAP kinetic type transition
- `KineticTypePageTransition-main/` — `js/index.js`, `js/typeTransition.js`, `js/article.js`.
- Port into a `PageTransition` component used as Next.js `template.tsx` under `[locale]` so it replays on navigation. Keep EN/AR text; RTL mirrors automatically.

### scroll63 — GSAP + ScrollTrigger + Lenis + SplitText (Vite)
- `files/` Vite project. Use for section reveals + a hero scroll-driven narrative on home.
- Port `script.js` ScrollTrigger timelines into `ScrollReveal.tsx` + `HeroScroll.tsx`. Reuse Lenis from step 1.

### 3d22 — GSAP + ScrollTrigger + Lenis + Three.js
- `files/` Vite. Scroll-pinned 3D scene. Port Three.js scene into `Hero3D.tsx`, lazy (`next/dynamic`, `ssr:false`), with a static poster fallback for no-WebGL / reduced-motion.

---

## 4. Hard rules while porting (from arranto-rules.md)

- Rule 001–003: Server Components default; `'use client'` only on leaf interactive components.
- Rule 004: every GSAP init inside `useGSAP`.
- Rule 006: real `prefers-reduced-motion` fallback (static state, not skipped).
- Rule 008–010: logical properties only, no `left-/right-/pl-/pr-`; directional icons mirror via `rtl:rotate-180`.
- Rule 011–014: brand layer (home/nav/hero) = ZERO region/product names.
- Rule 018–024 (Ponytail): reuse existing (Logo, ToolGuide, tokens); no new deps without justification; shortest correct solution; no dead code.

## 5. Verification gate (run after each checkpoint)
- `npm run build` must pass; `npm run lint` clean.
- Manual: each component works in EN + AR, desktop + mobile, reduced-motion on/off.
- No console errors; no layout shift (CLS ≤ 0.05); respects dark-only.

## 6. Status
- [ ] Step 1 Smooth scroll base (Lenis)
- [ ] Step 2 hover19
- [ ] Step 3 scroll63
- [ ] Step 4 mouse20
- [ ] Step 5 menu21
- [ ] Step 6 page10
- [ ] Step 7 hover20 + 3d22 (WebGL)
