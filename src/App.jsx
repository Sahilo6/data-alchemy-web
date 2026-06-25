import Nav from './components/Nav'
import Hero from './components/Hero'
import Reassure from './components/Reassure'
import Build from './components/Build'
import Schedule from './components/Schedule'
import Workshop from './components/Workshop'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import VolunteerButton from './components/VolunteerButton'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reassure />
        <Build />
        <Schedule />
        <Workshop />
        <FAQ />
      </main>
      <Footer />
      <VolunteerButton />
    </>
  )
}
