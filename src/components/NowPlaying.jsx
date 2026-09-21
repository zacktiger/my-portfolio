import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, MusicNotes, Play, VinylRecord, X } from '@phosphor-icons/react'
import { song } from '../data/site.js'

/*
  Corner Spotify player.

  - A few seconds after load, a small prompt offers to start the song. Browsers
    block autoplay, so the song only ever starts from a click.
  - The embed is created through Spotify's iFrame API, which lets us call
    play() from our own button and listen for pause/play to animate the pill.
  - The iframe stays mounted once created (panel is hidden, not unmounted), so
    minimising the player never stops the music.
  - Spotify swaps the host element for an <iframe>; we create that host node
    imperatively so React never tries to reconcile a node it no longer owns.
*/

const DISMISS_KEY = 'np-dismissed'
const PROMPT_DELAY_MS = 2500

let apiPromise
function loadSpotifyApi() {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    window.onSpotifyIframeApiReady = resolve
    const s = document.createElement('script')
    s.src = 'https://open.spotify.com/embed/iframe-api/v1'
    s.async = true
    document.body.appendChild(s)
  })
  return apiPromise
}

function Equalizer({ playing, className = '' }) {
  return (
    <span className={`eq flex h-3.5 items-end gap-[2px] ${playing ? 'playing' : ''} ${className}`} aria-hidden>
      <span /><span /><span />
    </span>
  )
}

export default function NowPlaying() {
  const [phase, setPhase] = useState('idle') // idle | prompt | open | closed
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const hostRef = useRef(null)
  const controllerRef = useRef(null)
  const pendingPlay = useRef(false)
  const creating = useRef(false)

  const ensureController = useCallback(async () => {
    if (controllerRef.current || creating.current || !hostRef.current) return
    creating.current = true
    const api = await loadSpotifyApi()
    const el = document.createElement('div')
    hostRef.current.appendChild(el)
    api.createController(el, { uri: song.uri, width: '100%', height: 152 }, (c) => {
      controllerRef.current = c
      c.addListener('ready', () => {
        setReady(true)
        if (pendingPlay.current) {
          pendingPlay.current = false
          c.play()
        }
      })
      c.addListener('playback_update', (e) => setPlaying(!e.data.isPaused))
    })
  }, [])

  // Show the prompt once per visitor; returning visitors who dismissed it just get the pill.
  useEffect(() => {
    let dismissed = false
    try { dismissed = localStorage.getItem(DISMISS_KEY) === '1' } catch {}
    if (dismissed) {
      setPhase('closed')
      return
    }
    const t = setTimeout(() => {
      setPhase('prompt')
      ensureController() // warm the embed so Play is instant
    }, PROMPT_DELAY_MS)
    return () => clearTimeout(t)
  }, [ensureController])

  const remember = () => { try { localStorage.setItem(DISMISS_KEY, '1') } catch {} }

  const playNow = () => {
    remember()
    setPhase('open')
    ensureController()
    if (controllerRef.current && ready) controllerRef.current.play()
    else pendingPlay.current = true
  }

  const dismiss = () => {
    remember()
    setPhase('closed')
  }

  const togglePanel = () => {
    ensureController()
    setPhase((p) => (p === 'open' ? 'closed' : 'open'))
  }

  useEffect(() => {
    if (phase !== 'open') return
    const onKey = (e) => e.key === 'Escape' && setPhase('closed')
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  const spring = { type: 'spring', stiffness: 380, damping: 30 }

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-3"
      style={{
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      {/* Player panel — always in the DOM once rendered so audio survives minimising. */}
      <motion.div
        initial={false}
        animate={phase === 'open' ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.97 }}
        transition={spring}
        style={{ transformOrigin: 'bottom right' }}
        className={`w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface p-2 [box-shadow:0_8px_24px_rgba(0,0,0,0.04)] ${
          phase === 'open' ? '' : 'pointer-events-none invisible absolute bottom-16 right-0'
        }`}
        role="dialog"
        aria-label="Music player"
        aria-hidden={phase !== 'open'}
      >
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
            <Equalizer playing={playing} className="text-accent" />
            {playing ? 'Now playing' : 'Soundtrack'}
          </span>
          <button
            onClick={() => setPhase('closed')}
            aria-label="Minimise player"
            className="grid size-7 place-items-center rounded-md text-muted transition hover:bg-sunken hover:text-ink"
          >
            <Minus size={14} weight="bold" />
          </button>
        </div>
        <div ref={hostRef} className="relative h-[152px] overflow-hidden rounded-lg bg-sunken">
          {!ready && (
            <div className="absolute inset-0 grid place-items-center font-mono text-xs text-muted">
              Loading Spotify…
            </div>
          )}
        </div>
      </motion.div>

      {/* One-time prompt */}
      <AnimatePresence>
        {phase === 'prompt' && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={spring}
            style={{ transformOrigin: 'bottom right' }}
            className="w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-line bg-surface p-5 [box-shadow:0_8px_24px_rgba(0,0,0,0.04)]"
            role="dialog"
            aria-label="Play music?"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                <VinylRecord size={20} weight="bold" className="animate-[spin_4s_linear_infinite]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">Soundtrack for the scroll?</p>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {song.title} — {song.artist}
                </p>
              </div>
              <button onClick={dismiss} aria-label="Dismiss" className="-mr-1 -mt-1 grid size-7 place-items-center rounded-md text-faint transition hover:text-ink">
                <X size={14} weight="bold" />
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={playNow}
                className="btn btn-primary flex-1 justify-center !py-2"
              >
                <Play size={13} weight="fill" /> Play
              </button>
              <button
                onClick={dismiss}
                className="btn btn-ghost flex-1 justify-center !py-2 !text-muted"
              >
                Not now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill: icon-only on phones, shows the track on larger screens */}
      <AnimatePresence>
        {phase !== 'idle' && phase !== 'prompt' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={spring}
            onClick={togglePanel}
            aria-expanded={phase === 'open'}
            aria-label={phase === 'open' ? 'Hide music player' : 'Show music player'}
            className="group flex h-12 items-center gap-2.5 rounded-lg border border-line bg-surface/90 pl-3.5 pr-3.5 [box-shadow:0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-md transition hover:border-faint active:scale-[0.98] sm:pr-4"
          >
            <span className={`grid size-6 place-items-center rounded-md ${playing ? 'text-accent' : 'text-ink'}`}>
              {playing ? <Equalizer playing /> : <MusicNotes size={16} weight="bold" />}
            </span>
            <span className="hidden max-w-[11rem] truncate text-left text-xs sm:block">
              <span className="block font-medium text-ink">{song.title}</span>
              <span className="block text-muted">{playing ? 'Playing' : song.artist}</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
