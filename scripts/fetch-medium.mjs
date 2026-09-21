// Pulls the Medium RSS feed into src/data/writing.json. Runs before every
// build (see "prebuild" in package.json). Medium's feed can't be read from the
// browser (no CORS), so the site ships this snapshot instead.
//
// If the fetch fails, the committed snapshot is left untouched and the build
// carries on — a Medium outage should never break a deploy.
//
// The feed only carries the latest 10 posts, so fetched posts are merged into
// the snapshot by id rather than replacing it. Older posts stay once they've
// been seen; commit writing.json after a local run to keep them. To remove a
// post, delete it from the JSON by hand.

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const FEED = 'https://medium.com/feed/@kshitijbachhav005'
const OUT = fileURLToPath(new URL('../src/data/writing.json', import.meta.url))
const WORDS_PER_MINUTE = 230

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(\w+);/g, (m, name) => entities[name] ?? m)

const text = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
const cdata = (item, tag) => item.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`))?.[1] ?? ''
const plain = (item, tag) => item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1] ?? ''

function parse(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const body = cdata(item, 'content:encoded')
    const url = plain(item, 'link').split('?')[0]
    // The opening paragraph or subheading usually works as a one-line summary;
    // site.js can override it per post.
    const lead = body.match(/<(h3|h4|p)[^>]*>([\s\S]*?)<\/\1>/)?.[2] ?? ''
    return {
      id: url.split('-').pop(),
      title: text(cdata(item, 'title')),
      url,
      date: new Date(plain(item, 'pubDate')).toISOString().slice(0, 10),
      minutes: Math.max(1, Math.round(text(body).split(' ').length / WORDS_PER_MINUTE)),
      topics: [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map(([, c]) => c),
      dek: text(lead),
    }
  })
}

function existing() {
  try {
    return JSON.parse(readFileSync(OUT, 'utf8'))
  } catch {
    return []
  }
}

try {
  const res = await fetch(FEED, {
    headers: { 'user-agent': 'Mozilla/5.0 (portfolio build)' },
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const fresh = parse(await res.text())
  if (!fresh.length) throw new Error('feed had no items')
  const byId = new Map(existing().map((p) => [p.id, p]))
  const added = fresh.filter((p) => !byId.has(p.id)).length
  fresh.forEach((p) => byId.set(p.id, p)) // the feed's copy wins, so edits land
  const posts = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date))
  writeFileSync(OUT, JSON.stringify(posts, null, 2) + '\n')
  console.log(`[medium] ${posts.length} posts (${added} new)`)
} catch (err) {
  if (!existsSync(OUT)) writeFileSync(OUT, '[]\n')
  console.warn(`[medium] fetch failed (${err.message}); keeping the existing snapshot`)
}
