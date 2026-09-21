import { stack } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function Stack() {
  return (
    <section id="stack" className="container-page py-24 sm:py-32">
      <Reveal className="section-label">Stack</Reveal>
      <Reveal>
        <h2 className="display mt-6 text-5xl sm:text-6xl">
          Tools I’ve <span className="italic text-muted">shipped with.</span>
        </h2>
      </Reveal>

      <dl className="mt-12">
        {stack.map((g, i) => (
          <Reveal
            key={g.group}
            delay={0.04 * i}
            className="grid gap-3 border-t border-line py-5 sm:grid-cols-[10rem_1fr] sm:items-center"
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">{g.group}</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-1 text-lg">
              {g.items.map((it) => <span key={it}>{it}</span>)}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
