import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Writing from './components/Writing.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import NowPlaying from './components/NowPlaying.jsx'

export default function App() {
  return (
    <div className="grain relative min-h-dvh overflow-x-clip">
      <a href="#main" className="skip-link btn btn-primary">Skip to content</a>
      <div className="ambient" aria-hidden />
      <Nav />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <Work />
        <Writing />
        <About />
        <Contact />
      </main>
      <Footer />
      <NowPlaying />
    </div>
  )
}
