import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Stack from './components/Stack.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import NowPlaying from './components/NowPlaying.jsx'

export default function App() {
  return (
    <div className="grain relative min-h-dvh overflow-x-clip">
      <div className="ambient" aria-hidden />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <NowPlaying />
    </div>
  )
}
