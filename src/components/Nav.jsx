import { useEffect, useState } from 'react'
import Spark from './Spark'

export default function Nav() {
  const [, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#top">
          <Spark size={16} />
          Data Alchemy <span className="ver">4.0</span>
        </a>
        <div className="nav-links">
          <a href="#build">What you build</a>
          <a href="#schedule">The day</a>
          <a href="#faq">FAQ</a>
          <a className="nav-cta" href="#workshop">On the day →</a>
        </div>
      </div>
    </nav>
  )
}
