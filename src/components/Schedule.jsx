import { PHASES } from '../config'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Schedule() {
  return (
    <section className="section" id="schedule">
      <div className="container">
        <SectionHead
          n="02"
          kicker="The day · 9 to 5"
          title="The programme, in four moves."
          lead="Roughly two-thirds building, one-third concepts. Every idea is followed by you putting it into code."
        />

        <div className="program" style={{ marginTop: 30 }}>
          {PHASES.map((p, i) => (
            <Reveal className={`prog-row ${p.blurb ? '' : 'is-break'}`} key={p.title}>
              <span className="prog-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="prog-body">
                <div className="prog-title-line">
                  <span className="prog-title">{p.title}</span>
                  <span className="prog-leader" />
                  <span className="prog-time">{p.range}</span>
                </div>
                {p.blurb && <p className="prog-blurb">{p.blurb}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
