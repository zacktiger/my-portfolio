import { highlights, principles } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="container-page py-24 sm:py-32">
      <Reveal className="section-label">About</Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <Reveal>
          {/* TODO: rewrite in your own voice — placeholder copy. */}
          <p className="display text-3xl leading-[1.15] text-balance sm:text-4xl">
            I’m an ECE undergrad at IIIT Nagpur who fell for the
            <span className="italic text-accent"> backend</span> — queues, caches, locks,
            and the numbers that say whether any of it was worth it.
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            I build solo and treat every project like an experiment: pick a hard constraint,
            build the obvious version, measure it, then earn the complicated one.
          </p>
        </Reveal>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.06 * i} className="bg-bg p-6">
              <p className="font-mono text-xs text-faint">0{i + 1}</p>
              <h3 className="mt-2 font-medium">{p.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-10 min-[480px]:grid-cols-3">
        {highlights.map((h, i) => (
          <Reveal key={h.label} delay={0.06 * i}>
            <dt className="display text-5xl sm:text-6xl">{h.value}</dt>
            <dd className="mt-2 text-sm text-muted">{h.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
