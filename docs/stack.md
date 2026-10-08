# Stack decisions

Plain-English notes on what Community Pulse is built with and why. Nothing
here needs to be memorized; it is a reference for when something breaks or
needs changing.

## One repo, three parts

| Folder | What it is | Where it runs |
| --- | --- | --- |
| `cli/` | The `pulse` command. Does all the slow work: export, analysis, reports, email. | Your laptop, or GitHub Actions on a schedule. |
| `web/` | The portal. Login, charts, settings, download buttons. | Vercel. |
| `db/` | The one shared database schema both parts use. | Imported by `cli/` and `web/`. |

Long jobs never run inside the portal because Vercel cuts off a web request
after a short time limit. The portal only reads what the CLI already saved.

## Choices

- **Language:** TypeScript everywhere, so the CLI and the portal share one
  schema and one set of types.
- **Package manager:** plain `npm` with workspaces. It ships with Node, so
  there is nothing extra to install.
- **Node version:** 22 (see `.nvmrc`).
- **CLI framework:** `commander`, a small library for defining commands and
  flags like `--server` and `--days`.
- **Discord:** `discord.js` with a bot token from the Developer Portal. Never
  a user token.
- **Database:** Neon Postgres (serverless, free tier, installs from the Vercel
  Marketplace). Accessed through Drizzle ORM. Table changes are applied with
  `drizzle-kit`.
- **Analysis:** the official `@anthropic-ai/sdk`, using the Message Batches
  API for half-price runs. Default model is `claude-haiku-5-5`, a small
  low-cost model, set by `ANTHROPIC_MODEL` in `.env`.
- **Email:** Resend, from a domain you verify in the Resend dashboard.
- **Portal:** Next.js (App Router) on Vercel. Login will use Auth.js with
  email magic links, restricted to `PORTAL_ALLOWED_EMAILS`. Charts will use
  Recharts, which handles light and dark mode and phone widths.
- **PDF report:** decided in step 6. Candidates are `@react-pdf/renderer`
  (same React components as the portal) or rendering the portal's report page
  to PDF with headless Chromium.
- **Data files:** `exceljs` for .xlsx, plain CSV writing for CSV. The CLI and
  the portal call the same functions so the files are identical.
- **Tests:** `vitest`. Tests live in `cli/test/`.
- **Scheduling:** a GitHub Actions workflow, added last (step 8).

## Where secrets live

| Place | What goes there |
| --- | --- |
| `.env` at the repo root (gitignored) | Everything, for running `pulse` on your laptop. |
| Vercel project environment variables | Database URL, portal login settings, Resend key. |
| GitHub Actions secrets | Same as `.env`, for scheduled runs. |

Tokens are never printed, logged, or written to reports.
