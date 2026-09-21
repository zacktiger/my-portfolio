import { useState } from 'react'
import { ArrowUpRight, Check, Copy, EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { profile, socials } from '../data/site.js'
import Reveal from './Reveal.jsx'

// Logo and hover tint for each contact card.
const marks = {
  GitHub: { Icon: GithubLogo, brand: 'var(--ink)' },
  LinkedIn: { Icon: LinkedinLogo, brand: 'var(--blue)' },
  Email: { Icon: EnvelopeSimple, brand: 'var(--accent)' },
}

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
        <h2 className="display mt-8 text-[clamp(3.75rem,12vw,8.5rem)] !leading-[0.95] tracking-[-0.04em]">
          Let’s <span className="italic text-accent">talk.</span>
        </h2>
      </Reveal>

      <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="break-all text-xl text-ink underline decoration-line decoration-1 underline-offset-8 transition hover:decoration-accent sm:text-2xl"
        >
          {profile.email}
        </a>
        <button onClick={copy} className="btn btn-ghost w-fit !px-3 !py-1.5 font-mono !text-xs !text-muted">
          <span key={String(copied)} className="icon-swap">{copied ? <Check size={13} weight="bold" /> : <Copy size={13} weight="bold" />}</span>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </Reveal>

      <ul className="mt-14 grid gap-4 sm:grid-cols-3">
        {socials.map((s, i) => {
          const { Icon, brand } = marks[s.label]
          return (
          <Reveal as="li" key={s.label} delay={0.08 * i}>
            <a
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="card group flex items-center justify-between gap-4 p-6 hover:[box-shadow:var(--hover-shadow)]"
            >
              <span className="icon-tile contact-mark grid size-10 shrink-0 place-items-center rounded-lg bg-sunken text-ink" style={{ '--brand': brand }}>
                <Icon size={20} weight="bold" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-ink">{s.label}</span>
                <span className="block truncate font-mono text-xs text-muted">{s.handle}</span>
              </span>
              <ArrowUpRight size={18} weight="bold" className="shrink-0 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
