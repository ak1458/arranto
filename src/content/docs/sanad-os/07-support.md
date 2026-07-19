# Support

## Getting help

- **Signed in**: use the **Support** tab in the sidebar. It has a FAQ (adding a customer, importing CSV data, inviting team members, ZATCA status, password reset) and a full ticketing system — open a ticket with a category and message, reply in a thread, mark it resolved once it's handled. Every business's tickets are private to that business, same tenant-isolation guarantees as everything else.
- **Before signing in** (trouble creating an account, a confirmation email that didn't arrive, general questions): use the **"Need help? Contact support"** link on the login page. It opens a pre-filled email.
- Both the login page and the in-app Support page also show a **"Documentation"** link once one is configured (see below).

## Publishing this documentation externally

This entire `docs/guide/` folder is written as plain, self-contained Markdown with only relative links between its own pages — it's meant to be copied as-is into wherever you actually want to host it (a company website, a docs platform, GitHub Pages, whatever). It deliberately does **not** live as HTML inside the app.

Once it's published somewhere with a real URL, point the app at it:

```sh
# In Vercel's project settings (or your .env for local dev):
VITE_DOCS_URL=https://your-site.example/docs/sanad-os
```

Redeploy — no code change required. The "Documentation" link on the login page and in the Support tab starts appearing automatically, pointing at that URL. Leave the variable unset and those links simply don't render; nothing breaks either way.

## Reporting a bug or requesting a feature

Open a support ticket from inside the app (once signed in) — that's the tracked, threaded channel. For anything before you have an account, use the login-page contact link.
