import { ArrowUpRight } from '@phosphor-icons/react'
import { pinned } from '../data/site.js'
import Contributions from './Contributions.jsx'
import Marquee from './Marquee.jsx'
import ProjectCover from './ProjectCover.jsx'
import Reveal from './Reveal.jsx'
import TechLogo from './TechLogo.jsx'

// Bento rhythm on a 6-column grid: wide / narrow, narrow / wide, half / half.
// Wide tiles set the cover beside the text instead of above it.
const spans = [4, 2, 2, 4, 3, 3]
const colSpan = { 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' }

function Tile({ p, i }) {
  const wide = spans[i] === 4
  return (
    <Reveal
      as="li"
      delay={0.08 * (i % 3)}
      id={`project-${p.slug}`}
      className={`scroll-mt-24 ${colSpan[spans[i]] || 'lg:col-span-2'}`}
    >
      <a
        href={p.live || p.repo}
        target="_blank"
        rel="noreferrer"
        className={`card group grid h-full p-3 hover:[box-shadow:var(--hover-shadow)] ${
          wide ? 'grid-rows-[auto_1fr] lg:grid-cols-[1.15fr_1fr] lg:grid-rows-1 lg:gap-3' : 'grid-rows-[auto_1fr]'
        }`}
      >
        <ProjectCover project={p} className={wide ? 'lg:aspect-auto lg:h-full lg:min-h-[17rem]' : ''} />

        <div className="flex flex-col px-3 pb-3 pt-6 sm:px-4 lg:pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="flex flex-wrap items-center gap-2 text-xl font-semibold tracking-tight text-ink">
                {p.name}
                {p.status && <span className="tag bg-yellow-bg text-yellow">{p.status}</span>}
              </h3>
              <p className="mt-0.5 text-sm text-muted">{p.kind}</p>
            </div>
            <ArrowUpRight
              size={18}
              weight="bold"
              className="mt-1 shrink-0 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>

          <p className="mt-4 text-[0.95rem] text-pretty">{p.summary}</p>

          <div className="mt-auto pt-6">
            {p.metric && (
              <p className="mb-4 flex items-baseline gap-2.5 border-t border-line pt-4">
                <span className="font-mono text-2xl tracking-tight text-accent">{p.metric.value}</span>
                <span className="text-xs text-muted">{p.metric.label}</span>
              </p>
            )}
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-muted">
              {p.stack.map((s, j) => (
                <li key={s} className="flex items-center gap-1.5" style={{ '--i': j }}>
                  <TechLogo name={s} size={13} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export default function Work() {
  return (
    <section id="work" className="container-page py-24 sm:py-32">
      <Reveal className="section-label">Selected work</Reveal>
      <Reveal>
        <h2 className="display mt-6 max-w-2xl text-5xl text-balance sm:text-6xl">
          Systems, measured. <span className="italic text-muted">Trade&#8209;offs, written down.</span>
        </h2>
      </Reveal>

      <Marquee />

      <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {pinned.map((p, i) => <Tile key={p.slug} p={p} i={i} />)}
      </ol>

      <Contributions />
    </section>
  )
}
