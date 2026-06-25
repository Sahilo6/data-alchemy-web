import Reveal from './Reveal'
import Icon from './Icon'

const CARDS = [
  { icon: 'beginner', h: 'Zero AI background', p: 'If you can write a for-loop, you are set.' },
  { icon: 'code', h: 'Not a lecture', p: 'You write and run real code all day.' },
  { icon: 'people', h: 'Peer-led', p: 'Run by seniors who started where you are.' },
  { icon: 'cloud', h: 'Nothing to install', p: 'It all runs in your browser on Colab.' },
]

export default function Reassure() {
  return (
    <section className="section tight">
      <div className="container">
        <div className="reassure">
          {CARDS.map((c, i) => (
            <Reveal className="reassure-card" key={c.h} delay={i * 80}>
              <div className="ic"><Icon name={c.icon} size={28} /></div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
