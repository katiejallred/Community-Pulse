# Community Pulse

Community Pulse takes a "pulse" of any product support or community Discord
server its bot has been added to. It exports recent message history, tags
product feedback with Claude, shows the results in a web portal with charts,
and emails a designed PDF report. Nothing about any specific product is
hardcoded: each server gets its own profile, so the same tool works for any
community.

**Status: just started.** Tonight's work set up the names and the technical
foundation. The commands exist but do not do anything yet. The build plan
below shows what comes next.

## The parts

- **`pulse`** is the command-line tool. You run it on your laptop (or GitHub
  runs it on a schedule) to export, analyze, and build reports.
- **The portal** is a private website where you look at the results. Only
  email addresses you put on an allowlist can sign in.
- **The database** is a hosted Postgres database that both of the above
  share.

See [docs/stack.md](docs/stack.md) for what each piece is built with and why.

## Commands

All of these work on one server at a time and default to the last 90 days.
Add `--days 30` to change the window, or `--from 2026-01-01 --to 2026-03-31`
for exact dates.

| Command | What it does |
| --- | --- |
| `pulse servers` | Lists every server the bot is in and whether it has a profile yet. |
| `pulse setup --server <name>` | Creates or edits a server's profile: products, feature areas, staff roles, channels, feedback types, report recipients. |
| `pulse export --server <name>` | Saves messages to the database. |
| `pulse analyze --server <name>` | Tags the exported messages as feedback. Shows the estimated cost and asks before running. |
| `pulse run --server <name>` | Export, then analyze, then prints the portal link. |
| `pulse report --server <name>` | Builds the PDF report. Add `--email` to send it, or `--email --dry-run` to preview the email. |
| `pulse xlsx --server <name>` | Writes the .xlsx data file locally. |
| `pulse csv --server <name>` | Writes the CSV data files locally. |

## Setup (so far)

You need Node.js 22 or newer. Then, from the repo folder:

```bash
npm install
cp .env.example .env
```

Open `.env` and fill in the values as each step below gives them to you.
Never share or commit `.env`.

To try a command before anything is wired up:

```bash
npm run pulse -- --help
```

## Build plan

Work happens in this order, checking in after each step.

1. Create the bot in the Discord Developer Portal.
2. Set up the database and schema.
3. Build export and test it on one channel.
4. Build server profiles and analysis; test on that channel's data.
5. Build the portal against real data, then deploy to Vercel.
6. Build the PDF report and the data file exports.
7. Set up Resend and email delivery; dry run first, then send to one address.
8. Add the scheduled monthly workflow.

## Naming

- Repo and package: `community-pulse`
- Bot display name: Community Pulse
- CLI command: `pulse`
- Bot description: "Collects channel history for community feedback summaries. Added by server admins."

## For developers

```bash
npm run typecheck   # check types in every package
npm run test        # run the tests
npm run build       # compile db/ and cli/, build web/
```
