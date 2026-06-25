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
  }
}

export default function Countdown() {
  const target = isFilled(EVENT.dateISO) ? new Date(EVENT.dateISO).getTime() : NaN
  const valid = !Number.isNaN(target)

  const [t, setT] = useState(() => (valid ? diff(target) : null))

  useEffect(() => {
    if (!valid) return
    const id = setInterval(() => setT(diff(target)), 1000 * 30)
    return () => clearInterval(id)
  }, [valid, target])

  if (!valid || !t) return null

  return (
    <div className="countdown-line">
      <span className="lbl">Starts in</span>
      <span className="val">
        <span className="accent">{t.days}</span>d{' '}
        <span className="accent">{String(t.hours).padStart(2, '0')}</span>h{' '}
        <span className="accent">{String(t.mins).padStart(2, '0')}</span>m
      </span>
    </div>
  )
}
