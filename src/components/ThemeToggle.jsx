import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from '@phosphor-icons/react'

// Keeps the mobile browser's address bar in step with the page background.
const syncThemeColor = () => {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg)
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  // Nav renders two toggles (desktop and mobile); follow the attribute so
  // flipping one keeps the other's icon right.
  useEffect(() => {
    const root = document.documentElement
    const mo = new MutationObserver(() => setTheme(root.dataset.theme || 'light'))
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  const apply = (next) => {
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
    flushSync(() => setTheme(next))
    syncThemeColor()
  }

  const toggle = (e) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) return apply(next)

    // The new theme grows out of the button as a circle big enough to reach
    // the farthest corner. Colour transitions are paused so the snapshot is
    // the finished theme, not one mid-fade.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`)
    root.classList.add('theme-switching')
    document.startViewTransition(() => apply(next)).finished.finally(() => root.classList.remove('theme-switching'))
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="group grid size-9 place-items-center rounded-md text-muted transition hover:bg-sunken hover:text-ink"
    >
      <span key={theme} className="icon-swap">
        {theme === 'dark'
          ? <Sun size={16} weight="bold" className="transition-transform duration-500 ease-[var(--ease-spring)] group-hover:rotate-45" />
          : <Moon size={16} weight="bold" className="transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-[20deg]" />}
      </span>
    </button>
  )
}
