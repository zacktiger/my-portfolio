import { useState } from 'react'
import { ArrowUpRight, Minus, Plus } from '@phosphor-icons/react'
import { writing } from '../data/site.js'
import feed from '../data/writing.json'
import Reveal from './Reveal.jsx'

const formatDate = (iso) =>
  new Intl.DateTimeFormat('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso))

// "crude-oil" -> "Crude oil"; only used when a post has no override.
const humanize = (tag) => tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')

const posts = feed
  .map((p) => {
    const o = writing.overrides[p.id] || {}
    return { ...p, ...o, topics: o.topics || p.topics.slice(0, 2).map(humanize) }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

// The newest few are always shown; the rest sit behind a toggle so the section
// stays the same height however much gets published.
const SHOWN = 4

function Post({ p, i }) {
  return (
    <Reveal as="li" delay={0.08 * i}>
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        className="group grid gap-x-8 gap-y-2 border-b border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:py-8"
      >
        <time dateTime={p.date} className="pt-1.5 font-mono text-xs uppercase tracking-wider text-muted">
          {formatDate(p.date)}
        </time>

        <div className="min-w-0">
          <h3 className="display text-2xl text-balance transition-colors group-hover:text-accent sm:text-3xl">
            {p.title}
          </h3>
          <p className="mt-2 max-w-2xl text-muted text-pretty">{p.dek}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wider text-faint">
            {p.topics.map((t) => <span key={t}>{t}</span>)}
            <span aria-hidden>·</span>
            <span>{p.minutes} min read</span>
          </p>
        </div>

        <ArrowUpRight
          size={20}
          weight="bold"
          className="hidden shrink-0 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:mt-1.5 sm:block"
        />
      </a>
    </Reveal>
  )
}

export default function Writing() {
  const [expanded, setExpanded] = useState(false)
  if (!posts.length) return null
  const visible = expanded ? posts : posts.slice(0, SHOWN)
  const hidden = posts.length - SHOWN
  return (
    <section id="writing" className="container-page py-24 sm:py-32">
      <Reveal className="section-label">Writing</Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <Reveal>
          <h2 className="display text-5xl text-balance sm:text-6xl">
            Notes on maps, <span className="italic text-muted">money and war.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-md text-muted">
            Outside code I write about geography, economics and conflict — the same questions
            AtlasQL and PoliCast try to answer with data.
          </p>
        </Reveal>
      </div>

      <ol className="mt-12 border-t border-line">
        {visible.map((p, i) => <Post key={p.id} p={p} i={i < SHOWN ? i : i - SHOWN} />)}
      </ol>

      <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="btn btn-ghost"
          >
            <span key={String(expanded)} className="icon-swap">
              {expanded ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
            </span>
            {expanded ? 'Show fewer' : `${hidden} more ${hidden === 1 ? 'essay' : 'essays'}`}
          </button>
        )}
        <a href={writing.profile} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          All writing on Medium
          <ArrowUpRight size={14} weight="bold" className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  )
}
