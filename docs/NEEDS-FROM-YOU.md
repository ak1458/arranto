# Needs from you

1. **Web3Forms key** (contact form backend, free): go to https://web3forms.com,
   enter the email that should receive inquiries, copy the access key into
   `site/.env.local` as `NEXT_PUBLIC_WEB3FORMS_KEY=...`. Until then the form UI
   works but submissions fail gracefully with the fallback email line.
2. **Domain confirm**: SEO layer assumes `arranto.com` (canonical, hreflang,
   sitemap, JSON-LD). Say the word if it's different.
3. **Your 3 reusable components**: you mentioned them but they weren't in the
   zips (those contained older strategy docs). Drop them in and I'll fold them in.
4. **Images**: generate from `IMAGE-PROMPTS.md`, drop into `site/public/work/`
   with the exact filenames listed. Site works without them (generative SVG
   placeholders render meanwhile).
5. **Tools link target**: footer/nav "Tools ↗" points to
   `https://smilefotilo.com/tools` — confirm that URL is right.
6. **Chatbot (Track 4)**: skipped for now — it needs an Anthropic API key and a
   vector store (Supabase), and you said no database yet. When ready, provide
   both and it slots in without touching the current pages.
7. ~~**hello@arranto.com**: the contact-form error fallback mentions it — confirm
   that inbox exists (or give me the right address).~~ **RESOLVED 2026-07-14** —
   owner confirmed the real inbox is `help@arranto.com`; replaced site-wide
   (messages, contact page, legal pages).
