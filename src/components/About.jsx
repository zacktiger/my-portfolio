import {
  BookOpen, Browser, Code, Cube, Database, FilmSlate, GameController, HardDrives, Question, TelevisionSimple,
} from '@phosphor-icons/react'
import { highlights, interests, pinned, principles, stack } from '../data/site.js'
import Reveal from './Reveal.jsx'

// Presentation for each interest: icon, pastel tone, bento width on a
// 6-column grid (two wide tiles, then three narrow), and the "now" verb.
const look = {
  documentaries: { Icon: TelevisionSimple, tone: 'bg-blue-bg text-blue', span: 'lg:col-span-3', verb: 'Watching' },
  books: { Icon: BookOpen, tone: 'bg-green-bg text-green', span: 'lg:col-span-3', verb: 'Reading' },
  films: { Icon: FilmSlate, tone: 'bg-red-bg text-red', span: 'lg:col-span-2', verb: 'Watching' },
  games: { Icon: GameController, tone: 'bg-yellow-bg text-yellow', span: 'lg:col-span-2', verb: 'Playing' },
  quizzes: { Icon: Question, tone: 'bg-blue-bg text-blue', span: 'sm:col-span-2 lg:col-span-2', verb: null },
}

function Interest({ item, i }) {
  const { Icon, tone, span, verb } = look[item.key]
  return (
    <Reveal as="li" delay={0.08 * i} className={`card flex flex-col p-6 sm:p-8 ${span}`}>
      <span className={`grid size-10 place-items-center rounded-lg ${tone}`}>
        <Icon size={20} weight="bold" />
      </span>
      <h4 className="mt-6 text-lg font-medium text-ink">{item.title}</h4>
      <p className="mt-1.5 text-sm text-muted text-pretty">{item.line}</p>

      {(item.picks.length > 0 || (item.now && verb)) && (
        <div className="mt-auto pt-6">
          {item.now && verb && (
            <p className="text-sm">
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">{verb} · </span>
              <span className="text-ink">{item.now}</span>
            </p>
          )}
          {item.picks.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-muted">
              {item.picks.map((p, j) => (
                <li key={p} className="flex items-center gap-2">
                  {j > 0 && <span className="text-faint" aria-hidden>/</span>}
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Reveal>
  )
}

// Tool groups: icon, pastel tone and bento width on the same 6-column grid —
// three even tiles, then Frontend (the longest list, in two columns) beside Ops.
const toolLook = {
  Languages: { Icon: Code, tone: 'bg-blue-bg text-blue', span: 'lg:col-span-2' },
  Backend: { Icon: HardDrives, tone: 'bg-green-bg text-green', span: 'lg:col-span-2' },
  Data: { Icon: Database, tone: 'bg-yellow-bg text-yellow', span: 'lg:col-span-2' },
  Frontend: { Icon: Browser, tone: 'bg-red-bg text-red', span: 'sm:col-span-2 lg:col-span-4', wide: true },
  Ops: { Icon: Cube, tone: 'bg-blue-bg text-blue', span: 'lg:col-span-2' },
}

const pinnedSlug = Object.fromEntries(pinned.map((p) => [p.name, p.slug]))

function ToolGroup({ g, i }) {
  const { Icon, tone, span, wide } = toolLook[g.group]
  return (
    <Reveal as="li" delay={0.08 * i} className={`card p-6 sm:p-7 ${span}`}>
      <div className="flex items-center gap-3">
        <span className={`grid size-8 place-items-center rounded-md ${tone}`}>
          <Icon size={16} weight="bold" />
        </span>
        <h4 className="font-mono text-xs uppercase tracking-wider text-muted">{g.group}</h4>
        <span className="ml-auto font-mono text-xs text-faint">{String(g.items.length).padStart(2, '0')}</span>
      </div>
      <ul className={`mt-5 grid gap-x-6 ${wide ? 'sm:grid-cols-2' : ''}`}>
        {g.items.map((t) => (
          <li key={t.name} className="border-t border-line py-3">
            <p className="leading-snug text-ink">{t.name}</p>
            {t.in.length > 0 && (
              <p className="mt-1 font-mono text-[0.7rem] leading-snug text-faint">
                {t.in.map((name, j) => (
                  <span key={name}>
                    {j > 0 && <span aria-hidden> · </span>}
                    {pinnedSlug[name] ? (
                      <a href={`#project-${pinnedSlug[name]}`} className="transition-colors hover:text-accent">{name}</a>
                    ) : name}
                  </span>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function About() {
  return (
    <section id="about" className="container-page py-24 sm:py-32">
      <Reveal className="section-label">About</Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <Reveal>
          {/* TODO: rewrite in your own voice — placeholder copy. */}
          <p className="display text-3xl text-balance sm:text-4xl">
            I’m an ECE undergrad at IIIT Nagpur who fell for the
            <span className="italic text-accent"> backend</span> — queues, caches, locks,
            and the numbers that say whether any of it was worth it.
          </p>
          <p className="mt-6 max-w-lg text-muted">
            I build solo and treat every project like an experiment: pick a hard constraint,
            build the obvious version, measure it, then earn the complicated one.
          </p>
        </Reveal>

        <ol className="card divide-y divide-line">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.08 * i} className="flex gap-5 p-6 sm:p-7">
              <span className="kbd h-fit">0{i + 1}</span>
              <div>
                <h3 className="font-medium text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <dl className="mt-16 grid gap-4 min-[480px]:grid-cols-3">
        {highlights.map((h, i) => (
          <Reveal key={h.label} delay={0.08 * i} className="card bg-sunken! p-6 sm:p-8">
            <dt className="display text-5xl sm:text-6xl">{h.value}</dt>
            <dd className="mt-3 text-sm text-muted">{h.label}</dd>
          </Reveal>
        ))}
      </dl>

      {/* Off the clock */}
      <div className="mt-24 sm:mt-28">
        <Reveal>
          <h3 className="display text-4xl sm:text-5xl">
            Off the <span className="italic text-muted">clock.</span>
          </h3>
          <p className="mt-4 max-w-lg text-muted">
            Most of what I know that isn’t code came from one of these.
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {interests.map((item, i) => <Interest key={item.key} item={item} i={i} />)}
        </ul>
      </div>

      {/* Stack */}
      <div className="mt-24 sm:mt-28">
        <Reveal>
          <h3 className="display text-4xl sm:text-5xl">
            Tools I’ve <span className="italic text-muted">shipped with.</span>
          </h3>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-lg text-muted">
            Each one sits next to the repo that uses it, so none of this is a keyword list.
          </p>
        </Reveal>
        <ul className="mt-10 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {stack.map((g, i) => <ToolGroup key={g.group} g={g} i={i} />)}
        </ul>
      </div>
    </section>
  )
}
