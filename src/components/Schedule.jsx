import { PHASES } from '../config'
import Reveal from './Reveal'

export default function Schedule() {
  return (
    <section className="section" id="schedule">
      <div className="container">
        <Reveal className="section-head-row">
          <h2 className="section-title">The day, in four moves</h2>
          <p className="section-aside">9 to 5 · roughly two-thirds building, one-third concepts.</p>
        </Reveal>

        <div className="phases">
          {PHASES.map((p, i) => (
            <Reveal className={`phase ${p.blurb ? '' : 'phase-break'}`} key={p.title} delay={i * 70}>
              <div className="phase-when">
                <span>{p.when}</span>
                <span className="phase-range">{p.range}</span>
              </div>
              <h3>{p.title}</h3>
              {p.blurb && <p>{p.blurb}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
