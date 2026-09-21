import {
  siD3, siDocker, siExpo, siFastapi, siJavascript, siNextdotjs, siNodedotjs, siPostgresql, siPrisma,
  siPrometheus, siPython, siQdrant, siReact, siReactquery, siRedis, siRender, siSocketdotio, siTailwindcss,
  siTypescript, siVercel,
} from 'simple-icons'
import { FileSql, GlobeHemisphereWest, PawPrint, PlugsConnected, Queue } from '@phosphor-icons/react'

// Small monochrome logo for a technology name, keyed by the name as written in
// site.js ("Node / Express", "PostgreSQL 16" and "React 19" all resolve).
// Brand marks come from Simple Icons; tools without one get a Phosphor stand-in.
// The brand colour is exposed as --brand so hover states can tint the mark.

const brands = {
  typescript: siTypescript,
  python: siPython,
  javascript: siJavascript,
  node: siNodedotjs,
  fastapi: siFastapi,
  'socket.io': siSocketdotio,
  postgresql: siPostgresql,
  redis: siRedis,
  qdrant: siQdrant,
  prisma: siPrisma,
  react: siReact,
  'react native': siReact,
  'next.js': siNextdotjs,
  'd3-geo': siD3,
  'tanstack query': siReactquery,
  tailwind: siTailwindcss,
  docker: siDocker,
  prometheus: siPrometheus,
  vercel: siVercel,
  render: siRender,
  expo: siExpo,
}

const standIns = {
  sql: FileSql,
  bullmq: Queue,
  postgis: GlobeHemisphereWest,
  zustand: PawPrint, // Zustand's mascot is a bear
  websockets: PlugsConnected,
}

// "Node / Express" -> "node", "PostgreSQL 16" -> "postgresql", "Docker Compose" -> "docker"
const keyOf = (name) => {
  const k = name.toLowerCase().split(' / ')[0].replace(/\s+\d+$/, '')
  return k === 'docker compose' ? 'docker' : k
}

// Near-black brand colours would vanish in dark mode; those tint to ink instead.
const tint = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70 ? 'var(--ink)' : `#${hex}`
}

export default function TechLogo({ name, size = 16, className = '' }) {
  const key = keyOf(name)
  const brand = brands[key]
  const cls = `tech-logo shrink-0 ${className}`
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden className={cls} style={{ '--brand': tint(brand.hex) }}>
        <path d={brand.path} />
      </svg>
    )
  }
  const Icon = standIns[key]
  return Icon ? <Icon size={size} weight="bold" aria-hidden className={cls} style={{ '--brand': 'var(--accent)' }} /> : null
}
