import { useEffect, useState } from 'react'
import { EVENT } from '../config'
import { isFilled } from '../utils'

function diff(target) {
  const total = target - Date.now()
  if (total <= 0) return null
  const s = Math.floor(total / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  }
}

export default function Countdown() {
  // Only render if a real date has been set in config.
  const target = isFilled(EVENT.dateISO) ? new Date(EVENT.dateISO).getTime() : NaN
  const valid = !Number.isNaN(target)

  const [t, setT] = useState(() => (valid ? diff(target) : null))

  useEffect(() => {
    if (!valid) return
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [valid, target])

  if (!valid || !t) return null

  const cells = [
    { n: t.days, l: 'Days' },
    { n: t.hours, l: 'Hours' },
    { n: t.mins, l: 'Minutes' },
    { n: t.secs, l: 'Seconds' },
  ]

  return (
    <>
      <div className="hero-count-label">Workshop starts in</div>
      <div className="countdown" aria-label="Time until the workshop">
        {cells.map((c) => (
          <div className="cd-cell" key={c.l}>
            <div className="cd-num">{String(c.n).padStart(2, '0')}</div>
            <div className="cd-label">{c.l}</div>
          </div>
        ))}
      </div>
    </>
  )
}
