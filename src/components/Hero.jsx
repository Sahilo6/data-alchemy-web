import { EVENT } from '../config'
import { isFilled } from '../utils'
import Countdown from './Countdown'
import Spark from './Spark'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <div className="hero-tag">
          <Spark size={13} />
          Agentic AI · Full-day hands-on workshop · {EVENT.timeLabel}
        </div>

        <h1>Build an AI agent <em>from scratch.</em></h1>

        <p className="lead">
          From a single line of Python to an agent that reasons, uses tools and finishes real
          tasks on its own - built by you, by 5 PM. No AI background needed.
        </p>

        <div className="hero-meta">
          {isFilled(EVENT.dateLabel) && <span><b>{EVENT.dateLabel}</b></span>}
          {isFilled(EVENT.venueLabel) && <span>· {EVENT.venueLabel}</span>}
          <span>· Bring a laptop</span>
          <span>· Basic Python</span>
        </div>

        <div className="hero-cta">
          <a className="btn btn-primary" href="#build">What you build</a>
          <a className="btn" href="#schedule">The day</a>
        </div>

        <Countdown />
      </div>
    </header>
  )
}
