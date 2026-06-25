# Data Alchemy 4.0 - Event Website

A single-page event site for the **Data Alchemy 4.0** Agentic AI workshop.
React + Vite. Informs attendees, shows the day, and includes a live day-of hub
with a "Call a volunteer" button wired to Telegram. Registration happens on VTOP,
so there is no sign-up form here.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Edit event details

Everything is in [`src/config.js`](src/config.js). Replace the `[PLACEHOLDERS]`:

| Field | Purpose |
|---|---|
| `dateISO` | Drives the countdown + flips the day-of clock to "live" automatically. Format `2026-08-15T09:00:00`. |
| `dateLabel`, `timeLabel`, `venueLabel` | Human-readable strings in the hero. |
| `notebookUrl` | Colab starter/catch-up notebook link (shown in the day-of hub). |
| `helpWebhookUrl` | Where the "Call a volunteer" button POSTs. Defaults to `/api/volunteer`. |
| `hashtag`, `instagram`, `contactEmail`, `clubName` | Footer / branding. |
| `SCHEDULE` | Detailed agenda - powers the live "next break" clock. |
| `PHASES` | The 4-block day overview shown on the page. |

Placeholders (anything in `[ ]`) auto-hide, so the page stays clean before they're filled.

## Call-a-volunteer → Telegram

The button generates a ticket (e.g. `DA-7QK2`) and POSTs it to `/api/volunteer`,
a serverless function that drops the ticket into your volunteer Telegram group with
**Claim** / **Resolve** buttons. Tapping them edits the message live (handled by
`/api/telegram`).

One-time setup:

1. **Create the bot** - message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token.
2. **Make a volunteer group**, add the bot to it, and get the chat id (e.g. add
   [@RawDataBot](https://t.me/RawDataBot) to the group once, copy the negative `chat.id`, then remove it).
3. **Add env vars in Vercel** (Project → Settings → Environment Variables):
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `TELEGRAM_WEBHOOK_SECRET` (optional, any random string)
4. **Register the webhook** (run once, filling in token + your domain + secret):
   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://data-alchemy-web.vercel.app/api/telegram&secret_token=<SECRET>"
   ```

Until the env vars are set, the button still confirms to students (a roaming helper
covers the gap) but nothing reaches Telegram.

## Deploy

Connected to GitHub → every `git push` auto-deploys via Vercel. Manual deploy:

```bash
npm run build && vercel --prod
```
