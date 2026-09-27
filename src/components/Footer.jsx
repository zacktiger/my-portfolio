import { profile } from '../data/site.js'
import VisitorCount from './VisitorCount.jsx'

export default function Footer() {
  return (
    <footer className="container-page relative z-10 flex flex-col gap-2 border-t border-line py-8 pb-28 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:pb-8">
      <span className="flex flex-wrap gap-x-3">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <VisitorCount />
      </span>
      <span>
        Built by hand in Nagpur · <a href="#top" className="hover:text-ink">Back to top</a>
      </span>
    </footer>
  )
}
