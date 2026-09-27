import { useEffect, useState } from 'react'

/*
  Footer visitor count, backed by counterapi.dev (the site has no server).
  The counter is a public one in the `zacktiger` workspace on counterapi.dev,
  so no API key ships to the browser.

  - Each browser increments the counter once; after that it only reads, so
    refreshes and repeat visits don't inflate the number.
  - If the API is down or blocked, nothing renders.
*/

const API = 'https://api.counterapi.dev/v2/zacktiger/portfolio-visits'
const SEEN_KEY = 'vc-counted'

function alreadyCounted() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function VisitorCount() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const counted = alreadyCounted()
    const ctrl = new AbortController()
    fetch(counted ? API : `${API}/up`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        const n = d?.data?.up_count
        if (typeof n !== 'number') return
        setCount(n)
        if (!counted) {
          try {
            localStorage.setItem(SEEN_KEY, '1')
          } catch {}
        }
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])

  if (count === null) return null
  return <span>{count.toLocaleString('en-IN')} visitors</span>
}
