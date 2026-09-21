import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Pause, Play } from '@phosphor-icons/react'
import { allProjects } from '../data/site.js'

// Tilted band that loops every project name. Pinned names jump to their tile
// below; the rest open the repo. Hover or focus holds it still.
function Names({ hidden }) {
  return allProjects.map((p) => {
    const pinned = Boolean(p.slug)
    return (
      <li key={p.name} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
        <a
          href={pinned ? `#project-${p.slug}` : p.href}
          target={pinned ? undefined : '_blank'}
          rel={pinned ? undefined : 'noreferrer'}
          tabIndex={hidden ? -1 : undefined}
          className="px-6 font-sans text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-tight tracking-[-0.04em] whitespace-nowrap transition-opacity hover:opacity-60 sm:px-10"
        >
          {p.name}
        </a>
        <span
          className={`size-3.5 shrink-0 rounded-full border-2 border-current sm:size-4 ${pinned ? 'bg-current' : ''}`}
          title={pinned ? 'Pinned' : undefined}
        />
      </li>
    )
  })
}

export default function Marquee() {
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const pinnedCount = allProjects.filter((p) => p.slug).length

  return (
    <div>
      {/* full-bleed: wider than the viewport so the tilted edges never show */}
      <div className="relative left-1/2 my-14 w-[110vw] -translate-x-1/2 -rotate-2 sm:my-20">
        <div
          className={`marquee bg-accent py-5 text-[#141312] sm:py-7 ${reduce ? 'overflow-x-auto' : 'overflow-hidden'}`}
          data-paused={paused}
          style={{ '--marquee-duration': `${allProjects.length * 4.5}s` }}
        >
          <ul className="marquee-track flex w-max items-center">
            <Names />
            {!reduce && <Names hidden />}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm text-muted">
          {allProjects.length} projects on a loop; filled dots mark the {pinnedCount} pinned below.
          <span className="hidden [@media(hover:hover)]:inline"> Hover to hold it still.</span>
        </p>
        {!reduce && (
          <button
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="btn btn-ghost w-fit shrink-0 !py-2 !text-muted"
          >
            {paused ? <Play size={13} weight="fill" /> : <Pause size={13} weight="fill" />}
            {paused ? 'Resume motion' : 'Pause motion'}
          </button>
        )}
      </div>
    </div>
  )
}
