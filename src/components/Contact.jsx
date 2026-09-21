import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile, socials } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="container-page py-24 sm:py-32">
      <Reveal className="section-label">Contact</Reveal>

      <Reveal>
        <h2 className="display mt-8 text-[clamp(3.75rem,12vw,8.5rem)]">
          Let’s <span className="italic text-accent">talk.</span>
        </h2>
      </Reveal>

      <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="break-all text-xl underline decoration-line decoration-1 underline-offset-8 transition hover:decoration-accent sm:text-2xl"
        >
          {profile.email}
        </a>
        <button
          onClick={copy}
          className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted transition hover:border-ink hover:text-ink"
        >
          {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
        </button>
      </Reveal>

      <ul className="mt-14 grid border-t border-line sm:grid-cols-3">
        {socials.map((s, i) => (
          <Reveal
            as="li"
            key={s.label}
            delay={0.05 * i}
            className="border-b border-line sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
          >
            <a
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 py-5"
            >
              <span className="min-w-0">
                <span className="block font-medium">{s.label}</span>
                <span className="block truncate font-mono text-xs text-muted">{s.handle}</span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
