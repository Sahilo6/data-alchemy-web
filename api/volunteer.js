// POST target for the "Call a volunteer" button. Posts a ticket into the
// volunteer Telegram group with Claim / Resolve buttons.
//
// Required Vercel env vars:
//   TELEGRAM_BOT_TOKEN  - from BotFather
//   TELEGRAM_CHAT_ID    - the volunteer group chat id (usually negative)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return res.status(500).json({ error: 'Telegram not configured' })

  const { ticketId = '?', table = '', reason = '', at } = req.body || {}
  const when = new Date(at || Date.now()).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata',
  })

  const text =
    `🆘 Help needed  ·  ${ticketId}\n` +
    `Table: ${table || '—'}\n` +
    `Issue: ${reason || '—'}\n` +
    `Time: ${when}\n` +
    `Status: ⏳ Waiting for a volunteer`

  const reply_markup = {
    inline_keyboard: [[
      { text: "🙋 I've got this", callback_data: `claim:${ticketId}` },
      { text: '✅ Resolve', callback_data: `resolve:${ticketId}` },
    ]],
  }

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, reply_markup }),
  })

  if (!tg.ok) return res.status(502).json({ error: 'Telegram send failed' })
  return res.status(200).json({ ok: true, ticketId })
}
