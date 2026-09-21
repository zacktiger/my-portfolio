// Pulls the last year of GitHub contributions into src/data/contributions.json.
// Runs before every build (see "prebuild" in package.json). GitHub's calendar
// isn't readable from the browser (no CORS) and the GraphQL API needs a token,
// so this reads the public calendar page and the site ships the snapshot.
//
// If the fetch fails, the committed snapshot is left untouched and the build
// carries on — a GitHub hiccup should never break a deploy.

import { existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const USER = 'zacktiger'
const URL_ = `https://github.com/users/${USER}/contributions`
const OUT = fileURLToPath(new URL('../src/data/contributions.json', import.meta.url))

// Each day is a <td> with an id, date and 0–4 level; its count lives in a
// <tool-tip for="that id"> ("3 contributions on July 5th." / "No contributions…").
function parse(html) {
  const counts = new Map(
    [...html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)].map(([, id, label]) => [
      id,
      Number(label.match(/^(\d+)/)?.[1] ?? 0),
    ]),
  )
  return [...html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)]
    .map(([td]) => {
      const attr = (name) => td.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
      return { date: attr('data-date'), level: Number(attr('data-level') ?? 0), count: counts.get(attr('id')) ?? 0 }
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}

try {
  const res = await fetch(URL_, {
    headers: { 'user-agent': 'Mozilla/5.0 (portfolio build)' },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const days = parse(await res.text())
  if (days.length < 300) throw new Error(`only ${days.length} days parsed`)
  const total = days.reduce((n, d) => n + d.count, 0)
  writeFileSync(OUT, JSON.stringify({ user: USER, fetched: new Date().toISOString().slice(0, 10), total, days }) + '\n')
  console.log(`[github] ${total} contributions over ${days.length} days`)
} catch (err) {
  if (!existsSync(OUT)) writeFileSync(OUT, JSON.stringify({ user: USER, fetched: null, total: 0, days: [] }) + '\n')
  console.warn(`[github] fetch failed (${err.message}); keeping the existing snapshot`)
}
