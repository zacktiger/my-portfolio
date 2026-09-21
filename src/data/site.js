// Single source of truth for page content. Edit here, not in the components.

export const profile = {
  name: 'Kshitij Bachhav',
  firstName: 'Kshitij',
  role: 'Full-stack engineer, backend-leaning',
  tagline:
    'I build backend systems and benchmark them before I make claims about them.',
  education: 'B.Tech ECE · IIIT Nagpur · 2023–27',
  location: 'Nagpur, India',
  timezone: 'Asia/Kolkata',
  status: 'Open to SDE & PM internships',
  email: 'kshitijbachhav005@gmail.com',
  resume: '#', // TODO: link to resume PDF (drop it in /public and use '/resume.pdf')
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/zacktiger', handle: '@zacktiger' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kshitij-bachhav-789a59213/', handle: 'in/kshitij-bachhav' },
  { label: 'Email', href: 'mailto:kshitijbachhav005@gmail.com', handle: 'kshitijbachhav005@gmail.com' },
]

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

// The six pinned projects get a tile with a cover. `metric` is optional and
// should only ever be a number a committed benchmark or eval produced.
// `image` is a screenshot in /public/projects; without one, the tile draws an
// illustration keyed by `slug` (see ProjectCover.jsx).
export const pinned = [
  {
    slug: 'pulse',
    name: 'Pulse',
    kind: 'Social feed platform',
    summary:
      'Hybrid push/pull fan-out feed. Posts fan out to Redis sorted sets on write; high-follower accounts are pulled at read time and merged.',
    metric: { value: '8.6×', label: 'faster p50 than per-request ranking' },
    stack: ['TypeScript', 'Redis', 'BullMQ', 'PostgreSQL'],
    repo: 'https://github.com/zacktiger/pulse',
    live: null, // deployment currently stuck on loading skeletons
    image: null,
  },
  {
    slug: 'filingsiq',
    name: 'FilingsIQ',
    kind: 'RAG over Indian company filings',
    summary:
      'Search and Q&A over annual reports and earnings calls, with a page-level citation on every answer so each claim can be checked by hand.',
    metric: { value: '1,285', label: 'filing pages indexed, 102-question eval' },
    stack: ['Python', 'FastAPI', 'Qdrant', 'React'],
    repo: 'https://github.com/zacktiger/filingsiq',
    live: null,
    image: null,
    status: 'In progress',
  },
  {
    slug: 'flux',
    name: 'Flux',
    kind: 'Concurrent double-entry ledger',
    summary:
      'Four concurrency-control strategies, 200 simultaneous transfers, one benchmark table. Balances are derived, never stored.',
    metric: { value: '₹0', label: 'overdraft with FOR UPDATE, vs −₹220 naive' },
    stack: ['Next.js', 'Node 22', 'PostgreSQL 16'],
    repo: 'https://github.com/zacktiger/Flux-ledger',
    live: 'https://flux-ledger-theta.vercel.app',
    image: '/projects/flux.jpg',
  },
  {
    slug: 'atlasql',
    name: 'AtlasQL',
    kind: 'Geospatial query engine',
    summary:
      'Numeric queries over the world’s administrative hierarchy. Claude turns plain English into a validated filter — it never writes SQL.',
    metric: { value: '~88K', label: 'regions across five tiers' },
    stack: ['Python', 'FastAPI', 'PostGIS', 'd3-geo'],
    repo: 'https://github.com/zacktiger/AtlasQL',
    live: null,
    image: null,
  },
  {
    slug: 'dailynote',
    name: 'DailyNote',
    kind: 'Offline-first notes app',
    summary:
      'A notes app that remembers what you meant to do: notes come back later and ask one question — anything come of this?',
    metric: null,
    stack: ['TypeScript', 'Expo', 'React Native'],
    repo: 'https://github.com/zacktiger/DailyNote',
    live: null,
    image: null,
    status: 'In progress',
  },
  {
    slug: 'policast',
    name: 'PoliCast',
    kind: 'Signal-driven forecasting',
    summary:
      'Prediction markets that re-forecast when real evidence moves — live prices and odds for numeric questions, LLM-vetted news for the rest.',
    metric: null,
    stack: ['Python', 'FastAPI', 'React 19', 'WebSockets'],
    repo: 'https://github.com/zacktiger/PoliCast',
    live: null, // poli-cast.vercel.app currently 404s
    image: null,
  },
]

// Everything that rides the marquee. Pinned slugs link to their tile; the rest
// open the repo. Assignments, tutorials and this site itself are left out.
const gh = (repo) => `https://github.com/zacktiger/${repo}`
export const allProjects = [
  ...pinned.map((p) => ({ name: p.name, slug: p.slug, href: p.repo })),
  { name: 'ProjectFlow', href: gh('Multi-Tenant-Project-Management-System') },
  { name: 'SnapLink', href: gh('Url_shortner') },
  { name: 'Assay', href: gh('assay') },
  { name: 'Algo Visualizer', href: gh('algo-visualizer') },
  { name: 'Roast My Resume', href: gh('Roastmyresume') },
  { name: 'Subreddit Vibe Check', href: gh('The-Subreddit-Vibe-Check') },
  { name: 'Store Ratings', href: gh('store-rating-app') },
  { name: 'Cognimap', href: gh('Cognimap') },
  { name: 'Expense Tracker', href: gh('AI-Expense-Tracker') },
  { name: 'Wildfire CNN', href: gh('mini-project-cnn-wildfire') },
  { name: 'RBAC Backend', href: gh('Secure-Backend-System-with-RBAC') },
  { name: 'Claude Limit Notifier', href: gh('Claude-limit-notifier') },
]

export const principles = [
  { title: 'Measure before claiming', body: 'Every performance number here comes from a benchmark script I can re-run.' },
  { title: 'Document the road not taken', body: 'Each README names the trade-off I didn’t take and the thing I didn’t build.' },
  { title: 'Argue against my own pick', body: 'If a simpler design wins, the README says so — even when it’s the one I didn’t ship.' },
]

export const stack = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
  { group: 'Backend', items: ['Node / Express', 'FastAPI', 'BullMQ', 'Socket.io'] },
  { group: 'Data', items: ['PostgreSQL', 'PostGIS', 'Redis', 'Prisma'] },
  { group: 'Frontend', items: ['React 19', 'Next.js', 'Tailwind', 'Zustand', 'TanStack Query'] },
  { group: 'Ops', items: ['Docker Compose', 'Prometheus', 'Vercel', 'Render'] },
]

export const highlights = [
  { value: '1st', label: 'Technex GameJam 2024, IIT BHU' },
  { value: '200+', label: 'DSA problems solved' },
  { value: '5', label: 'flagship systems, built solo' },
]

// Spotify corner player. Paste any open.spotify.com track link's ID here.
export const song = {
  uri: 'spotify:track:5HzMZWEwP8baubqhmpjX75',
  title: 'Sweater Weather (Sped Up)',
  artist: 'The Neighbourhood',
}
