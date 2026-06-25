import { useState } from 'react'
import { EVENT, SCHEDULE, CHECKPOINTS, DEBUG } from '../config'
import { isFilled } from '../utils'
import { useWorkshopClock, formatGap } from '../useWorkshopClock'
import Reveal from './Reveal'
import Spark from './Spark'
import Icon from './Icon'

export default function Workshop() {
  const clock = useWorkshopClock()

  return (
    <section className="section" id="workshop">
      <div className="container">
        <Reveal style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            <Spark size={14} /> On the day · live hub
          </p>
          <h2 className="section-title">Lost the thread? Pick it back up.</h2>
          <p className="section-lead" style={{ margin: '14px auto 0' }}>
            Keep this tab open while you build - where the room is, when the next break is, and
            how to unstick yourself fast.
          </p>
        </Reveal>

        <Reveal delay={100} style={{ marginTop: 44 }}>
          <LiveStatus clock={clock} />
        </Reveal>

        <div className="hub-grid">
          <Reveal className="hub-col" delay={80}>
            <CatchUp clock={clock} />
          </Reveal>
          <Reveal className="hub-col" delay={160}>
            <Debug />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function LiveStatus({ clock }) {
  const { mode, phase, current, next, targetLabel, msToTarget } = clock

  return (
    <div className="live-card">
      {mode === 'live' ? (
        <span className="live-pill live"><span className="dot" /> Live now</span>
      ) : (
        <span className="live-pill preview">Preview · goes live on the day</span>
      )}

      {phase === 'after' ? (
        <div className="live-done grad-text">That’s a wrap. Go build something.</div>
      ) : (
        <>
          <div className="live-target">
            {phase === 'before' ? 'Workshop starts in' : `Next break - ${targetLabel} - in`}
          </div>
          <div className="live-timer">{formatGap(msToTarget)}</div>

          <div className="live-now">
            <div className="cell">
              <div className="k">Happening now</div>
              <div className="v">{current ? current.title : phase === 'before' ? 'Doors / setup' : '-'}</div>
              {current && <div className="t">{current.time}</div>}
            </div>
            <div className="cell">
              <div className="k">Up next</div>
              <div className="v">{next ? next.title : 'Wrap-up'}</div>
              {next && <div className="t">{next.time}</div>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function CatchUp({ clock }) {
  // Find the latest checkpoint whose hands-on has already started.
  const startedTitles = new Set()
  for (const s of SCHEDULE) {
    if (clock.current && s.time === clock.current.time) { startedTitles.add(s.title); break }
    startedTitles.add(s.title)
  }
  const reached = [...CHECKPOINTS].reverse().find((c) => startedTitles.has(c.after))

  return (
    <>
      <h3><Spark size={18} /> Quick catch-up</h3>
      <p className="sub">The whole workshop boils down to two ideas. If you’re behind, this is all you need.</p>

      <div className="qref">
        <div className="qref-card">
          <div className="label">The agent loop</div>
          <div className="loop">
            Reason <span className="arrow">→</span> Act <span className="arrow">→</span> Observe
            <span className="arrow">→</span> Repeat
          </div>
        </div>
        <div className="qref-card">
          <div className="label">The four building blocks</div>
          <div className="blocks">
            <span>Model</span><span>Goal</span><span>Tools</span><span>Memory</span>
          </div>
        </div>
        <div className="qref-card now">
          <div className="label">Where you should be</div>
          <div className="have">
            {reached
              ? <>By now you should have <b>{reached.have}</b></>
              : <>Just getting set up - make your <b>first AI call</b> and confirm it returns text.</>}
          </div>
        </div>
      </div>

      <div className="helper-note">
        <Icon name="hand" size={20} className="ic" />
        <span>
          Still stuck? Tap <b>Call a volunteer</b> (bottom-right) and one will come to your table. Or jump to the{' '}
          {isFilled(EVENT.notebookUrl)
            ? <a href={EVENT.notebookUrl} target="_blank" rel="noopener noreferrer">catch-up cell in the notebook</a>
            : <b>catch-up cell</b>}{' '}
          to resync with the room in under a minute.
        </span>
      </div>
    </>
  )
}

function Debug() {
  const [open, setOpen] = useState(-1)
  return (
    <>
      <h3><Spark size={18} /> Hit an error? Quick fixes</h3>
      <p className="sub">The errors people actually hit while building - tap one for the fix.</p>
      <div className="debug-list">
        {DEBUG.map((d, i) => (
          <div className={`debug-item ${open === i ? 'open' : ''}`} key={d.err}>
            <button className="debug-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span className="err">{d.err}</span>
              <span className="plus">+</span>
            </button>
            <div className="debug-a"><p>{d.fix}</p></div>
          </div>
        ))}
      </div>
    </>
  )
}
