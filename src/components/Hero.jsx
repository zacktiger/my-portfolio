import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'
import { profile, socials } from '../data/site.js'

const formatTime = () =>
  new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: profile.timezone,
  }).format(new Date())

function LocalTime() {
  const [time, setTime] = useState(formatTime)
  useEffect(() => {
    const t = setInterval(() => setTime(formatTime()), 15_000)
    return () => clearInterval(t)
  }, [])
  return <span className="tabular-nums">{time} IST</span>
}

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="top" className="relative">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-12 pt-32 sm:pb-20">
        <motion.div {...rise(0)} className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="tag bg-green-bg text-green">
            <span className="status-dot relative size-1.5 rounded-full bg-green" />
            {profile.status}
          </span>
          <span className="font-mono text-xs text-muted">
            {profile.location} · <LocalTime />
          </span>
        </motion.div>

        <h1 className="display text-[clamp(4rem,19vw,10rem)] !leading-[0.95] tracking-[-0.04em]">
          <motion.span {...rise(0.08)} className="block">Kshitij</motion.span>
          <motion.span {...rise(0.16)} className="block italic text-muted">
            Bachhav<span className="not-italic text-accent">.</span>
          </motion.span>
        </h1>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <motion.p {...rise(0.24)} className="max-w-xl text-lg text-balance text-ink sm:text-xl">
            {profile.tagline}{' '}
            <span className="text-muted">{profile.role}. {profile.education}.</span>
          </motion.p>

          <motion.div {...rise(0.32)} className="flex flex-wrap items-center gap-3 md:justify-end">
            <a href="#work" className="btn btn-primary group">
              See the work
              <ArrowDown size={15} weight="bold" className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href={profile.resume} className="btn btn-ghost group">
              Résumé <ArrowUpRight size={15} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.ul {...rise(0.4)} className="mt-8 flex gap-5 font-mono text-xs text-muted">
          {socials.slice(0, 2).map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 transition hover:text-accent">
                {s.label} <ArrowUpRight size={12} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
