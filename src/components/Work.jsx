import { ArrowUpRight } from 'lucide-react'
import { pinned, socials } from '../data/site.js'
import Marquee from './Marquee.jsx'
import ProjectCover from './ProjectCover.jsx'
import Reveal from './Reveal.jsx'

function Tile({ p, i }) {
  return (
    <Reveal as="li" delay={0.05 * (i % 3)} id={`project-${p.slug}`} className="scroll-mt-24">
      <a
        href={p.live || p.repo}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full flex-col rounded-2xl p-2 transition-colors duration-300 hover:bg-surface"
      >
        <ProjectCover project={p} />

        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                {p.name}
                {p.status && <span className="chip !text-[0.65rem]">{p.status}</span>}
              </h3>
              <p className="mt-0.5 text-sm text-muted">{p.kind}</p>
            </div>
            <ArrowUpRight
              size={20}
              className="mt-1 shrink-0 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </div>

          <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty">{p.summary}</p>

          <div className="mt-auto pt-5">
            {p.metric && (
              <p className="mb-4 flex items-baseline gap-2 border-t border-line pt-4">
                <span className="font-mono text-2xl tracking-tight text-accent">{p.metric.value}</span>
                <span className="text-xs text-muted">{p.metric.label}</span>
              </p>
            )}
            <ul className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export default function Work() {
  const github = socials.find((s) => s.label === 'GitHub')
  return (
    <section id="work" className="container-page py-24 sm:py-32">
      <Reveal className="section-label">Selected work</Reveal>
      <Reveal>
        <h2 className="display mt-6 max-w-2xl text-5xl text-balance sm:text-6xl">
          Systems, measured. <span className="italic text-muted">Trade&#8209;offs, written down.</span>
        </h2>
      </Reveal>

      <Marquee />

      <ol className="mt-16 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {pinned.map((p, i) => <Tile key={p.slug} p={p} i={i} />)}
      </ol>

      <Reveal className="mt-12">
        <a href={github.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          Everything else on GitHub
          <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  )
}
