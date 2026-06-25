import { STACK } from '../config'
import Reveal from './Reveal'

const STEPS = [
  { h: 'It reasons', p: 'Decides its next move instead of just replying.' },
  { h: 'It uses tools', p: 'Calls search, math and APIs to actually get things done.' },
  { h: 'It remembers', p: 'Holds context across steps, so it never loses the thread.' },
  { h: 'It finishes the job', p: 'By 5 PM it runs a real multi-step task end to end.' },
]

export default function Build() {
  return (
    <section className="section" id="build">
      <div className="container build-grid">
        <Reveal>
          <p className="eyebrow">What you build</p>
          <h2 className="section-title">
            Meet <span className="grad-text">Atlas</span>.
          </h2>
          <p className="section-lead">
            You build it piece by piece - from one line of code to an agent that runs on its
            own. You walk out with the working thing you made.
          </p>
          <div className="build-list">
            {STEPS.map((s, i) => (
              <div className="build-item" key={s.h}>
                <span className="num">{i + 1}</span>
                <div>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="atlas-card">
            <div className="atlas-head">
              <span className="dot r" /><span className="dot y" /><span className="dot g" />
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
          <p className="built-with">
            Built with {STACK.join(' · ')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
