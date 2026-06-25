import { useState } from 'react'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

const ITEMS = [
  { q: 'Do I need an AI background?', a: 'No. If you’re comfortable with basic Python - variables, loops, functions - you have everything you need.' },
  { q: 'What do I need to bring?', a: 'A laptop and its charger. Everything runs in Google Colab in your browser, so there’s nothing to install beforehand.' },
  { q: 'What if I fall behind?', a: 'Helpers roam the whole time, every hands-on has a catch-up cell, and you can call a volunteer to your table any time.' },
  { q: 'Is there a certificate?', a: 'Yes - everyone who attends the full day gets a certificate of participation.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="faq">
      <div className="container">
        <SectionHead n="04" kicker="Questions" title="Still wondering?" />
        <div className="faq" style={{ marginTop: 26 }}>
          {ITEMS.map((it, i) => (
            <Reveal className={`faq-item ${open === i ? 'open' : ''}`} key={it.q}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="qn">Q{i + 1}</span>
                <span className="qx">{it.q}</span>
                <span className="plus">{open === i ? '–' : '+'}</span>
              </button>
              <div className="faq-a"><p>{it.a}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
