// Telegram webhook. Receives Claim / Resolve button taps and edits the ticket
// message in place so the group sees who owns it and when it's done.
//
// Env vars:
//   TELEGRAM_BOT_TOKEN       - from BotFather
//   TELEGRAM_WEBHOOK_SECRET  - optional; if set, must match the secret_token
//                              you registered when setting the webhook.

export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (secret && req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    return res.status(401).end()
  }

  const cb = (req.body || {}).callback_query
  if (!cb) return res.status(200).json({ ok: true }) // ignore everything that isn't a button tap

  const action = (cb.data || '').split(':')[0]
  const who = [cb.from?.first_name, cb.from?.username && `@${cb.from.username}`].filter(Boolean).join(' ')
  const base = (cb.message?.text || '').split('\nStatus:')[0]

  let text = cb.message?.text || ''
  let reply_markup = cb.message?.reply_markup
  let toast = ''

  if (action === 'claim') {
    text = `${base}\nStatus: 🟡 Claimed by ${who}`
    reply_markup = { inline_keyboard: [[{ text: '✅ Resolve', callback_data: (cb.data || '').replace('claim:', 'resolve:') }]] }
    toast = "You've got this one"
  } else if (action === 'resolve') {
    text = `${base}\nStatus: ✅ Resolved by ${who}`
    reply_markup = { inline_keyboard: [] }
    toast = 'Marked resolved - thanks!'
  }

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: cb.message.chat.id, message_id: cb.message.message_id, text, reply_markup }),
  })
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: cb.id, text: toast }),
  })

  return res.status(200).json({ ok: true })
}
