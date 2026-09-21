import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import data from '../data/contributions.json'
import Reveal from './Reveal.jsx'

// Contribution calendar from the build-time snapshot (scripts/fetch-github.mjs).
// Weeks run left to right, Sunday on top. On narrow screens the oldest weeks
// are clipped on the left so the most recent ones always show.

const fmt = (iso, opts) => new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', ...opts }).format(new Date(iso))

function toWeeks(days) {
  if (!days.length) return []
  const pad = new Date(days[0].date).getUTCDay()
  const cells = [...Array(pad).fill(null), ...days]
  const weeks = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

function longestStreak(days) {
  let best = 0
  let run = 0
  for (const d of days) {
    run = d.count ? run + 1 : 0
    best = Math.max(best, run)
  }
  return best
}

const weeks = toWeeks(data.days)
const activeDays = data.days.filter((d) => d.count).length
const streak = longestStreak(data.days)

// A month label sits over the first week that starts in a new month.
const monthOf = (week) => week.find(Boolean)?.date.slice(0, 7)
const labels = weeks.map((w, i) => (i > 0 && monthOf(w) !== monthOf(weeks[i - 1]) ? fmt(w.find(Boolean).date, { month: 'short' }) : ''))

export default function Contributions() {
  const grid = useRef(null)
  const shown = useInView(grid, { once: true, margin: '-40px' })
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    if (!shown) return
    const t = setTimeout(() => setSettled(true), weeks.length * 9 + 600)
    return () => clearTimeout(t)
  }, [shown])
  if (!weeks.length) return null

  const profile = `https://github.com/${data.user}`
  return (
    <Reveal className="card mt-12 p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-ink">
          <span className="font-mono tabular-nums">{data.total.toLocaleString('en-IN')}</span> contributions in the last year
        </p>
        <a href={profile} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink">
          Everything else on GitHub
          <ArrowUpRight size={14} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <div
        ref={grid}
        role="img"
        aria-label={`GitHub contribution calendar: ${data.total} contributions on ${activeDays} days in the last year.`}
        className="contrib mt-5"
        data-shown={shown || undefined}
        data-settled={settled || undefined}
      >
        <div className="contrib-track" aria-hidden>
          {weeks.map((week, w) => (
            <div key={w} className="contrib-week" style={{ '--w': w }}>
              <span className="contrib-month">{labels[w]}</span>
              {week.map((d, i) =>
                d ? (
                  <span
                    key={d.date}
                    className="contrib-day"
                    data-level={d.level}
                    title={`${d.count || 'No'} contribution${d.count === 1 ? '' : 's'} · ${fmt(d.date, { day: 'numeric', month: 'short', year: 'numeric' })}`}
                  />
                ) : (
                  <span key={`pad-${i}`} className="contrib-day invisible" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-muted">
        <p>
          {activeDays} active days · longest streak {streak} {streak === 1 ? 'day' : 'days'}
        </p>
        <p className="flex items-center gap-1.5" aria-hidden>
          Less
          {[0, 1, 2, 3, 4].map((l) => <span key={l} className="contrib-day contrib-key" data-level={l} />)}
          More
        </p>
      </div>
    </Reveal>
  )
}
