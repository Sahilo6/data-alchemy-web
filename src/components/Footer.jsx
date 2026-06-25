import { EVENT } from '../config'
import { isFilled } from '../utils'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand">Data Alchemy <span className="ver" style={{ color: 'var(--cyan)' }}>4.0</span></div>
            <p>{EVENT.tagline} A full-day, hands-on Agentic AI workshop - build a real agent yourself.</p>
          </div>
          <div className="footer-links">
            <a href="#build">What you build</a>
            <a href="#schedule">The day</a>
            <a href="#workshop">On the day</a>
            <a href="#faq">FAQ</a>
            {isFilled(EVENT.instagram) && <a href={EVENT.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            {isFilled(EVENT.contactEmail) && <a href={`mailto:${EVENT.contactEmail}`}>Contact</a>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            {isFilled(EVENT.clubName) ? `Hosted by ${EVENT.clubName}.` : 'Hosted by your club.'} ·{' '}
            {isFilled(EVENT.dateLabel) ? EVENT.dateLabel : 'Date to be announced'}
          </span>
          <span className="hashtag">{EVENT.hashtag}</span>
        </div>
      </div>
    </footer>
  )
}
