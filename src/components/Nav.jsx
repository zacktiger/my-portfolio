import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { nav, profile } from '../data/site.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const sentinel = useRef(null)

  // The bar turns solid once a 12px sentinel at the top of the page leaves view.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
    io.observe(sentinel.current)
    return () => io.disconnect()
  }, [])

  // Scroll-spy: the section crossing the upper third of the viewport is active.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -65% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Lock page scroll while the mobile sheet is open; close it on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
    <div ref={sentinel} className="pointer-events-none absolute left-0 top-0 h-3 w-px" aria-hidden />
    <header
      className={`fixed inset-x-0 top-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? 'z-[60] border-line bg-bg' // opaque, and above the music player
          : scrolled
            ? 'z-40 border-line bg-bg/85 backdrop-blur-md'
            : 'z-40 border-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-serif text-2xl italic leading-none" aria-label={`${profile.name}, back to top`}>
          kb<span className="text-faint">.</span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {nav.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                active === id ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-md bg-sunken ring-1 ring-line"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              {label}
            </a>
          ))}
          <span className="mx-2 h-4 w-px bg-line" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-md text-ink"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto sm:hidden"
          >
            <ul className="container-page flex flex-col gap-1 pt-6">
              {nav.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-line py-4"
                  >
                    <span className="display text-5xl">{label}</span>
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
    </>
  )
}
