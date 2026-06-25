import { STACK } from '../config'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

const STEPS = [
  { h: 'It reasons', p: 'Decides its next move instead of just replying.' },
  { h: 'It uses tools', p: 'Calls search, math and APIs to actually get things done.' },
  { h: 'It remembers', p: 'Holds context across steps, so it never loses the thread.' },
  { h: 'It finishes the job', p: 'By 5 PM it runs a real multi-step task end to end.' },
]

export default function Build() {
  return (
    <section className="section" id="build">
      <div className="container">
        <SectionHead
          n="01"
          kicker="What you build"
          title={<>Meet <span className="accent">Atlas</span>.</>}
          lead="You build it piece by piece - from one line of code to an agent that runs on its own. You walk out with the working thing you made."
        />

        <div className="build-grid" style={{ marginTop: 34 }}>
          <Reveal>
            <div className="build-list">
              {STEPS.map((s, i) => (
                <div className="build-item" key={s.h}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{s.h}</h4>
                    <p>{s.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="figure">
              <div className="figure-head">
                <span className="dot" />
                <span className="file">atlas.py</span>
              </div>
              <pre className="term">
{`> `}<span className="c-com"># one line of code...</span>{`
`}<span className="c-key">from</span> agent <span className="c-key">import</span> Atlas

atlas = <span className="c-fn">Atlas</span>(goal=<span className="c-str">"plan my study week"</span>)
atlas.<span className="c-fn">run</span>()

<span className="c-com"># ...becomes an agent that acts</span>
<span className="c-out">[reason]  I need this week's deadlines</span>
<span className="c-out">[act]     search_calendar()</span>
<span className="c-out">[memory]  3 deadlines saved</span>
<span className="c-out">[reason]  now I can build the plan</span>
<span className="c-out">[done]    study plan ready</span>
</pre>
            </div>
            <p className="figcaption">fig. 01 — one line of code becomes an agent that acts.</p>
            <p className="built-with">Built with <b>{STACK.join(' · ')}</b></p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
