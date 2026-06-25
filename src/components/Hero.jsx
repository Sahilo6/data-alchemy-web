import { EVENT } from '../config'
import { isFilled } from '../utils'
import Countdown from './Countdown'
import Spark from './Spark'

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <Spark size={18} className="spark hero-spark s2" />

      <div className="container hero-inner">
        <span className="badge">
          <span className="dot" />
          Agentic AI · One full day · {EVENT.timeLabel}
        </span>

        <h1>
          Turn data into <br />
          <span className="line2">agents that act.</span>
        </h1>

        <p className="lead">
          Build a working AI agent from a single line of Python - by 5 PM it reasons, uses
          tools and finishes real tasks on its own. No AI background needed.
        </p>

        <div className="hero-meta">
          {isFilled(EVENT.dateLabel) && <span>{EVENT.dateLabel}</span>}
          {isFilled(EVENT.venueLabel) && <span>· {EVENT.venueLabel}</span>}
          <span>· Bring a laptop</span>
        </div>

        <div className="hero-cta">
          <a className="btn btn-primary" href="#build">See what you'll build</a>
          <a className="btn btn-ghost" href="#schedule">The plan for the day</a>
        </div>

        <Countdown />
      </div>
    </header>
  )
}
