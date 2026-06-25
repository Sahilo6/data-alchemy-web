import { useEffect, useMemo, useRef, useState } from 'react'
import { EVENT, SCHEDULE } from './config'
import { isFilled } from './utils'

const DASH = /\s*-\s*/

// "9:00" / "1:30" -> a Date on `base`. The day runs 9-5, so hours 1-8 are PM.
function parseClock(str, base) {
  const [hRaw, mRaw] = str.trim().split(':')
  let h = Number(hRaw)
  const m = Number(mRaw || 0)
  if (h !== 12 && h <= 8) h += 12 // 1..8 -> 13..20 (afternoon)
  const d = new Date(base)
  d.setHours(h, m, 0, 0)
  return d
}

function buildSlots(base) {
  const slots = SCHEDULE.map((s) => {
    const [a, b] = s.time.split(DASH)
    return { ...s, start: parseClock(a, base), endRaw: b ? parseClock(b, base) : null }
  })
  // A slot ends when the next one starts; the last falls back to its own end time.
  for (let i = 0; i < slots.length; i++) {
    slots[i].end = slots[i + 1] ? slots[i + 1].start : slots[i].endRaw || slots[i].start
  }
  return slots
}

// Drives the day-of hub. Returns a live picture if the workshop is actually
// running right now; otherwise a gently-ticking "preview" anchored mid-morning
// so the timer is visible while building/testing the page.
export function useWorkshopClock() {
  const hasDate = isFilled(EVENT.dateISO)

  const base = useMemo(() => {
    const d = hasDate ? new Date(EVENT.dateISO) : new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [hasDate])

  const slots = useMemo(() => buildSlots(base), [base])
  const previewAnchor = useMemo(() => {
    const d = new Date(base)
    d.setHours(11, 18, 0, 0) // mid-morning: next break is Lunch
    return d.getTime()
  }, [base])

  const mountReal = useRef(Date.now())
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const dayStart = slots[0].start.getTime()
  const dayEnd = slots[slots.length - 1].end.getTime()
  const real = Date.now()

  // "Live" only when a real date is set and we're within the workshop window.
  const live = hasDate && real >= dayStart - 30 * 60000 && real <= dayEnd
  const nowMs = live ? real : previewAnchor + (real - mountReal.current)

  const current = slots.find((s) => nowMs >= s.start.getTime() && nowMs < s.end.getTime())
  const next = slots.find((s) => s.start.getTime() > nowMs)
  const nextBreak = slots.find((s) => s.kind === 'break' && s.start.getTime() > nowMs)

  let phase, target, targetLabel
  if (nowMs < dayStart) {
    phase = 'before'; target = dayStart; targetLabel = 'Workshop starts'
  } else if (nowMs >= dayEnd) {
    phase = 'after'; target = dayEnd; targetLabel = 'Wrapped up'
  } else if (nextBreak) {
    phase = 'running'; target = nextBreak.start.getTime(); targetLabel = nextBreak.title
  } else {
    phase = 'running'; target = dayEnd; targetLabel = 'Wrap-up & certificates'
  }

  return {
    mode: live ? 'live' : 'preview',
    phase,
    current,
    next,
    nextBreak,
    targetLabel,
    msToTarget: Math.max(0, target - nowMs),
  }
}

// ms -> "1h 12m 04s" (drops the hours segment when zero).
export function formatGap(ms) {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n) => String(n).padStart(2, '0')
  return h > 0 ? `${h}h ${pad(m)}m ${pad(sec)}s` : `${m}m ${pad(sec)}s`
}
