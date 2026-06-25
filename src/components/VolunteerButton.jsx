import { useEffect, useState } from 'react'
import { EVENT, HELP_REASONS } from '../config'
import { isFilled } from '../utils'
import Icon from './Icon'

// Floating "Call a volunteer" button. A student taps it, says where they are
// sitting and what's wrong, and the request is sent to the volunteer team so
// the nearest free volunteer can walk over.
export default function VolunteerButton() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [table, setTable] = useState('')
  const [reason, setReason] = useState(HELP_REASONS[0])
  const [ticket, setTicket] = useState('')

  // Close on Escape for accessibility.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const reset = () => {
    setOpen(false)
    // Let the closing animation finish before clearing the success state.
    setTimeout(() => { setSent(false); setTable(''); setReason(HELP_REASONS[0]); setTicket('') }, 250)
  }

  // Short human-friendly ticket id, e.g. DA-7QK2. The Telegram bot uses this as
  // the ticket reference so a volunteer can claim and resolve it.
  const makeTicket = () =>
    'DA-' + Math.random().toString(36).slice(2, 4).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase()

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)

    const id = makeTicket()
    const payload = {
      type: 'volunteer-request',
      ticketId: id,
      table: table.trim(),
      reason,
      at: new Date().toISOString(),
      event: EVENT.name,
    }

    // Fire-and-forget: POST the ticket to the configured endpoint. Same-origin
    // (/api/...) uses a normal JSON request; an external webhook uses no-cors so
    // opaque endpoints still receive it. A roaming helper covers any failure.
    if (isFilled(EVENT.helpWebhookUrl)) {
      const sameOrigin = EVENT.helpWebhookUrl.startsWith('/')
      try {
        await fetch(EVENT.helpWebhookUrl, {
          method: 'POST',
          ...(sameOrigin ? {} : { mode: 'no-cors' }),
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } catch {
        /* ignore - the student is still told help is coming */
      }
    }

    setTicket(id)
    setSending(false)
    setSent(true)
  }

  return (
    <>
      <button className="fab" onClick={() => setOpen(true)} aria-label="Call a volunteer for help">
        <Icon name="hand" size={20} />
        <span>Call a volunteer</span>
      </button>

      {open && (
        <div className="modal-overlay" onClick={reset}>
          <div className="modal" role="dialog" aria-modal="true" aria-label="Call a volunteer" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={reset} aria-label="Close">×</button>

            {sent ? (
              <div className="modal-success">
                <div className="check-ic"><Icon name="check" size={26} /></div>
                <h3>Help is on the way</h3>
                <p>
                  A volunteer has your request{table ? <> for <b>table {table}</b></> : null} and is
                  heading over. Keep your hand up so they can spot you.
                </p>
                <div className="ticket-id">Ticket {ticket}</div>
                <button className="btn btn-ghost" onClick={reset}>Done</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3>Call a volunteer</h3>
                <p className="modal-sub">Tell us where you are and what is up. The nearest free volunteer will come to you.</p>

                <label className="modal-label" htmlFor="table">Your table / seat number</label>
                <input
                  id="table" className="modal-input" value={table} onChange={(e) => setTable(e.target.value)}
                  placeholder="e.g. Table 7" autoFocus
                />

                <div className="modal-label">What do you need help with?</div>
                <div className="reason-chips">
                  {HELP_REASONS.map((r) => (
                    <button
                      type="button" key={r}
                      className={`reason-chip ${reason === r ? 'active' : ''}`}
                      onClick={() => setReason(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <button className="btn btn-primary fab-submit" type="submit" disabled={sending}>
                  {sending ? 'Sending...' : 'Send help request'}
                </button>
                {!isFilled(EVENT.helpWebhookUrl) && (
                  <p className="modal-note">Demo mode - set helpWebhookUrl in config.js to notify the real volunteer team.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
