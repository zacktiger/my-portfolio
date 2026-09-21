// Tile cover: a small window frame holding either a real screenshot
// (`project.image`) or a line illustration of what the project does. The
// illustrations use theme variables, so they follow light/dark mode.

const ink = 'var(--ink)'
const muted = 'var(--faint)'
const line = 'var(--line)'
const accent = 'var(--accent)'
const soft = 'var(--accent-soft)'

const Bars = ({ x, y, widths, h = 5, gap = 10, fill = line }) =>
  widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={fill} />)

const illustrations = {
  // one write fans out to many follower feeds
  pulse: (
    <>
      {[28, 54, 80, 106, 132, 158].map((y, i) => (
        <g key={y}>
          <path d={`M78 93 C 140 93, 140 ${y}, 196 ${y}`} fill="none" stroke={muted} strokeWidth="1.2" />
          <circle cx="200" cy={y} r="5" fill={i === 2 ? accent : 'none'} stroke={i === 2 ? accent : ink} strokeWidth="1.5" />
          <Bars x={214} y={y - 5} widths={[64 - i * 5, 40 + i * 3]} h={4} gap={7} />
        </g>
      ))}
      <circle cx="70" cy="93" r="13" fill={accent} />
      <text x="70" y="124" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill={muted}>ZADD</text>
    </>
  ),

  // a filing page with the cited line highlighted
  filingsiq: (
    <>
      <rect x="84" y="14" width="124" height="170" rx="4" fill="var(--bg)" stroke={line} />
      <Bars x={98} y={30} widths={[70, 92, 84, 96]} />
      <rect x="93" y="72" width="106" height="15" rx="3" fill={soft} />
      <rect x="98" y="77" width="88" height="5" rx="2.5" fill={accent} />
      <Bars x={98} y={98} widths={[90, 78, 94, 60, 86, 72]} />
      <path d="M199 80 H 222" stroke={accent} strokeWidth="1.5" />
      <rect x="222" y="68" width="54" height="24" rx="12" fill={accent} />
      <text x="249" y="84" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--bg)">p. 56</text>
    </>
  ),

  // orthographic globe with matched regions
  atlasql: (
    <>
      <circle cx="160" cy="97" r="76" fill="none" stroke={ink} strokeWidth="1.5" />
      {[26, 52].map((rx) => (
        <ellipse key={rx} cx="160" cy="97" rx={rx} ry="76" fill="none" stroke={muted} strokeWidth="1" />
      ))}
      {[-44, 0, 44].map((dy) => {
        const half = Math.sqrt(76 * 76 - dy * dy)
        return <line key={dy} x1={160 - half} x2={160 + half} y1={97 + dy} y2={97 + dy} stroke={muted} strokeWidth="1" />
      })}
      {[[128, 62], [186, 80], [142, 118], [198, 128], [170, 50]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i < 3 ? 5 : 3.5} fill={i < 3 ? accent : ink} />
      ))}
    </>
  ),

  // a note coming back with its one question
  dailynote: (
    <>
      <rect x="54" y="22" width="212" height="150" rx="10" fill="var(--bg)" stroke={line} />
      <Bars x={72} y={42} widths={[150, 118]} />
      <text x="72" y="92" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="17" fill={ink}>
        anything come of this?
      </text>
      {[['Not yet', 72, 44], ['Update', 122, 46], ['Done', 174, 38], ['Let go', 218, 34]].map(([t, x, w]) => (
        <g key={t}>
          <rect x={x} y="118" width={w} height="22" rx="11" fill={t === 'Done' ? accent : 'none'} stroke={t === 'Done' ? accent : line} />
          <text x={x + w / 2} y="132.5" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="8.5" fill={t === 'Done' ? 'var(--bg)' : ink}>
            {t}
          </text>
        </g>
      ))}
    </>
  ),

  // a forecast that only moves when evidence arrives
  policast: (
    <>
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="30" x2="290" y1={y} y2={y} stroke={line} strokeDasharray="3 4" />
      ))}
      <path d="M30 130 H 90 L 104 112 H 160 L 172 118 H 206 L 222 78 H 262" fill="none" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      {[[104, 112], [172, 118], [222, 78]].map(([x, y]) => (
        <line key={x} x1={x} x2={x} y1="30" y2="170" stroke={accent} strokeOpacity=".35" />
      ))}
      <circle cx="262" cy="78" r="5" fill={accent} />
      <text x="262" y="64" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill={accent}>62%</text>
    </>
  ),
}

export default function ProjectCover({ project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex h-6 items-center gap-1.5 border-b border-line px-3">
        {[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-line" />)}
      </div>
      <div className="absolute inset-x-0 bottom-0 top-6 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} screenshot`}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <svg
            viewBox="0 0 320 194"
            role="img"
            aria-label={`${project.name} illustration`}
            className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          >
            {illustrations[project.slug]}
          </svg>
        )}
      </div>
    </div>
  )
}
