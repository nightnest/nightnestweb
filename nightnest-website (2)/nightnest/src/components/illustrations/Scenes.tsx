/**
 * Original scene illustrations in the NightNest palette (Midnight, Lavender, Moonlight).
 * They stand in for photography until real kit samples are photographed for launch.
 */
import { useId } from 'react'
import { EarplugCaseShape, MaskShape, PlannerShape, PouchShape } from './KitShapes'

interface SceneProps {
  className?: string
  title: string
}

function Stars({ points }: { points: [number, number, number][] }) {
  return (
    <g fill="#F7F3FF">
      {points.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          className="animate-twinkle"
          style={{ animationDelay: `${(i * 0.7) % 4}s`, transformBox: 'fill-box' }}
        />
      ))}
    </g>
  )
}

function Moon({ cx, cy, r, id }: { cx: number; cy: number; r: number; id: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 2.1} fill={`url(#${id}-glow)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-moon)`} />
      <circle cx={cx + r * 0.3} cy={cy + r * 0.25} r={r * 0.14} fill="#E8C677" opacity="0.5" />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.1} r={r * 0.09} fill="#E8C677" opacity="0.45" />
    </g>
  )
}

function MoonDefs({ id }: { id: string }) {
  return (
    <>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0%" stopColor="#F4D58D" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#F4D58D" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-moon`} cx="0.38" cy="0.35" r="0.75">
        <stop offset="0%" stopColor="#FCEFC7" />
        <stop offset="100%" stopColor="#F0CC78" />
      </radialGradient>
    </>
  )
}

/** A halls bedroom at night: window with moon, desk with lamp and planner, bed with the kit. */
export function HallsRoomScene({ className, title }: SceneProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 640 560" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <MoonDefs id={id} />
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1430" />
          <stop offset="100%" stopColor="#2B2F6E" />
        </linearGradient>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1B2A57" />
          <stop offset="100%" stopColor="#14214A" />
        </linearGradient>
        <linearGradient id={`${id}-lamp`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4D58D" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F4D58D" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-room`}>
          <rect width="640" height="560" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-room)`}>
        <rect width="640" height="560" fill={`url(#${id}-wall)`} />
        {/* floor */}
        <rect y="440" width="640" height="120" fill="#101B3E" />
        <path d="M0 440 H640" stroke="#2A3B72" strokeWidth="2" />

        {/* window */}
        <rect x="318" y="46" width="270" height="244" rx="14" fill="#0A1229" />
        <rect x="330" y="58" width="246" height="220" rx="8" fill={`url(#${id}-sky)`} />
        <Stars
          points={[
            [352, 86, 1.6], [400, 120, 1.2], [372, 186, 1.4], [540, 92, 1.4], [556, 210, 1.2],
            [430, 240, 1.5], [508, 250, 1], [350, 250, 1.1], [560, 150, 1.6], [420, 76, 1],
          ]}
        />
        <Moon cx={478} cy={142} r={40} id={id} />
        <path d="M453 58 V278 M330 168 H576" stroke="#0A1229" strokeWidth="7" />
        <rect x="312" y="286" width="282" height="12" rx="4" fill="#2A3B72" />
        {/* curtains */}
        <path d="M300 34 H336 C 330 120, 342 220, 326 312 H300 Z" fill="#8F80D8" />
        <path d="M312 34 C 316 120, 312 220, 318 312" stroke="#7B6CC8" strokeWidth="3" fill="none" />
        <path d="M606 34 H570 C 576 120, 564 220, 580 312 H606 Z" fill="#8F80D8" />
        <path d="M594 34 C 590 120, 594 220, 588 312" stroke="#7B6CC8" strokeWidth="3" fill="none" />
        <rect x="290" y="28" width="326" height="8" rx="4" fill="#34477C" />

        {/* shelf with books */}
        <rect x="46" y="118" width="196" height="8" rx="3" fill="#34477C" />
        <rect x="62" y="70" width="14" height="48" rx="2" fill="#A99BE8" />
        <rect x="78" y="78" width="12" height="40" rx="2" fill="#F4D58D" />
        <rect x="92" y="74" width="16" height="44" rx="2" fill="#5B6BA8" />
        <rect x="112" y="84" width="40" height="34" rx="3" fill="#2F4384" transform="rotate(-8 132 101)" />
        <circle cx="210" cy="104" r="14" fill="#6FA287" />
        <rect x="200" y="104" width="20" height="14" rx="3" fill="#E9E1D0" />

        {/* desk lamp light */}
        <path d="M136 210 L56 330 H246 Z" fill={`url(#${id}-lamp)`} />
        {/* desk */}
        <rect x="34" y="326" width="236" height="14" rx="4" fill="#3B4F8A" />
        <rect x="46" y="340" width="10" height="100" fill="#2A3B72" />
        <rect x="248" y="340" width="10" height="100" fill="#2A3B72" />
        <rect x="170" y="340" width="88" height="56" rx="4" fill="#2F4384" />
        <rect x="200" y="364" width="28" height="4" rx="2" fill="#A99BE8" />
        {/* lamp */}
        <rect x="70" y="318" width="40" height="8" rx="4" fill="#0A1229" />
        <path d="M90 318 L120 252 L140 214" stroke="#0A1229" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M118 206 L160 196 L150 232 Z" fill="#0A1229" />
        <circle cx="146" cy="222" r="6" fill="#F4D58D" />
        {/* planner on desk */}
        <g transform="translate(128 262) scale(0.62) rotate(-6 80 55)">
          <PlannerShape />
        </g>
        {/* mug */}
        <rect x="222" y="300" width="22" height="26" rx="5" fill="#E9E1D0" />
        <path d="M244 306 q10 0 10 8 q0 8 -10 8" stroke="#E9E1D0" strokeWidth="4" fill="none" />
        <path d="M228 292 q4 -6 0 -12 M238 292 q4 -6 0 -12" stroke="#A99BE8" strokeOpacity="0.6" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* bed */}
        <ellipse cx="470" cy="508" rx="190" ry="16" fill="#0A1229" opacity="0.6" />
        <rect x="292" y="336" width="18" height="160" rx="6" fill="#2A3B72" />
        <rect x="300" y="420" width="330" height="70" rx="10" fill="#2A3B72" />
        <rect x="306" y="392" width="324" height="40" rx="12" fill="#E9E1D0" />
        <rect x="318" y="366" width="96" height="40" rx="16" fill="#F7F3EC" />
        {/* duvet */}
        <path d="M384 388 H640 V454 H392 Q376 454 376 438 V398 Q376 388 384 388 Z" fill="#A99BE8" />
        <path d="M420 388 C 440 408, 480 412, 520 404 C 560 396, 600 404, 640 412" stroke="#8F80D8" strokeWidth="3" fill="none" />
        <path d="M376 430 H640" stroke="#8F80D8" strokeWidth="2" opacity="0.6" />
        {/* kit on the bed */}
        <g transform="translate(440 318) scale(0.62) rotate(8 80 55)">
          <PouchShape />
        </g>
        <g transform="translate(322 352) scale(0.56) rotate(-4 80 55)">
          <MaskShape />
        </g>
        <g transform="translate(540 344) scale(0.44)">
          <EarplugCaseShape />
        </g>

        {/* rug */}
        <ellipse cx="190" cy="500" rx="120" ry="20" fill="#2F4384" />
        <ellipse cx="190" cy="500" rx="96" ry="14" fill="none" stroke="#A99BE8" strokeOpacity="0.5" strokeDasharray="4 5" />
      </g>
    </svg>
  )
}

/** Top-down flat lay of the four kit items on a cream surface. */
export function KitFlatLay({ className, title }: SceneProps) {
  return (
    <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="560" height="420" fill="#EBE6DA" />
      <g opacity="0.5" stroke="#DED7C6" strokeWidth="1">
        {Array.from({ length: 13 }).map((_, i) => (
          <path key={i} d={`M0 ${i * 34} H560`} />
        ))}
      </g>
      <g transform="translate(36 40) scale(1.5) rotate(-6 80 55)">
        <MaskShape />
      </g>
      <g transform="translate(300 28) scale(1.45) rotate(5 80 55)">
        <PlannerShape />
      </g>
      <g transform="translate(40 220) scale(1.35) rotate(4 80 55)">
        <PouchShape />
      </g>
      <g transform="translate(290 250) scale(1.15) rotate(-10 80 55)">
        <EarplugCaseShape />
      </g>
      {/* pencil */}
      <g transform="rotate(-28 470 360)">
        <rect x="400" y="356" width="120" height="10" rx="2" fill="#F4D58D" />
        <path d="M520 356 l16 5 l-16 5 z" fill="#E9E1D0" />
        <rect x="392" y="356" width="10" height="10" rx="2" fill="#A99BE8" />
      </g>
    </svg>
  )
}

/** Late-night desk: laptop, open planner, lamp glow. Used for the study side of the kit. */
export function DeskScene({ className, title }: SceneProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <radialGradient id={`${id}-glow`} cx="0.3" cy="0.25" r="0.7">
          <stop offset="0%" stopColor="#F4D58D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F4D58D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="560" height="420" fill="#17264F" />
      <rect width="560" height="420" fill={`url(#${id}-glow)`} />
      <rect y="300" width="560" height="120" fill="#223466" />
      <path d="M0 300 H560" stroke="#34477C" strokeWidth="3" />
      {/* lamp */}
      <path d="M70 300 h60 v-8 h-60 z" fill="#0A1229" />
      <path d="M100 292 L 130 190 L 175 150" stroke="#0A1229" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M150 136 L 206 140 L 182 182 Z" fill="#0A1229" />
      <circle cx="186" cy="168" r="7" fill="#F4D58D" />
      {/* laptop */}
      <rect x="230" y="150" width="200" height="130" rx="10" fill="#0A1229" />
      <rect x="240" y="160" width="180" height="110" rx="5" fill="#2B3D78" />
      <rect x="254" y="176" width="90" height="8" rx="4" fill="#A99BE8" />
      <rect x="254" y="194" width="140" height="6" rx="3" fill="#5B6BA8" />
      <rect x="254" y="208" width="120" height="6" rx="3" fill="#5B6BA8" />
      <rect x="254" y="222" width="130" height="6" rx="3" fill="#5B6BA8" />
      <rect x="254" y="242" width="50" height="14" rx="7" fill="#F4D58D" />
      <path d="M212 280 H448 L460 296 H200 Z" fill="#34477C" />
      {/* open planner spread */}
      <g transform="translate(60 312) rotate(-4)">
        <rect width="220" height="96" rx="6" fill="#F7F3EC" />
        <path d="M110 0 V96" stroke="#DED7C6" strokeWidth="2" />
        <rect x="14" y="14" width="60" height="6" rx="3" fill="#0F1B3D" />
        {[30, 44, 58, 72].map((y) => (
          <rect key={y} x="14" y={y} width="80" height="4" rx="2" fill="#A99BE8" opacity="0.7" />
        ))}
        <circle cx="140" cy="30" r="10" fill="#F4D58D" />
        <rect x="126" y="50" width="70" height="4" rx="2" fill="#0F1B3D" opacity="0.5" />
        <rect x="126" y="62" width="56" height="4" rx="2" fill="#0F1B3D" opacity="0.5" />
        <rect x="126" y="74" width="62" height="4" rx="2" fill="#0F1B3D" opacity="0.5" />
      </g>
      {/* mug + earplug case */}
      <rect x="440" y="250" width="34" height="44" rx="7" fill="#A99BE8" />
      <path d="M474 260 q14 0 14 12 q0 12 -14 12" stroke="#A99BE8" strokeWidth="5" fill="none" />
      <g transform="translate(330 318) scale(0.7)">
        <EarplugCaseShape />
      </g>
      <g transform="translate(456 64)">
        <circle r="26" fill="#F4D58D" />
        <circle cx="10" cy="-8" r="22" fill="#17264F" />
      </g>
    </svg>
  )
}

/** Train window at dusk with the kit ready for the journey home. */
export function TravelScene({ className, title }: SceneProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <MoonDefs id={id} />
        <linearGradient id={`${id}-dusk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B2A57" />
          <stop offset="70%" stopColor="#5B4F9E" />
          <stop offset="100%" stopColor="#C9A5C9" />
        </linearGradient>
      </defs>
      <rect width="560" height="420" fill="#2A3B72" />
      <rect x="40" y="36" width="480" height="230" rx="44" fill="#0A1229" />
      <rect x="54" y="50" width="452" height="202" rx="34" fill={`url(#${id}-dusk)`} />
      <Stars points={[[110, 86, 1.4], [180, 70, 1.1], [300, 96, 1.3], [440, 80, 1.2], [250, 120, 1]]} />
      <Moon cx={392} cy={110} r={26} id={id} />
      {/* hills */}
      <path d="M54 210 C 140 170, 220 200, 300 180 C 380 160, 440 190, 506 176 V252 H54 Z" fill="#2B2F6E" />
      <path d="M54 232 C 160 210, 260 236, 360 216 C 420 204, 470 214, 506 210 V252 H54 Z" fill="#1B2A57" />
      {/* table */}
      <rect x="20" y="296" width="520" height="22" rx="8" fill="#0F1B3D" />
      <rect x="250" y="318" width="60" height="102" fill="#0F1B3D" />
      <g transform="translate(70 214) scale(0.9) rotate(-6 80 55)">
        <PouchShape />
      </g>
      <g transform="translate(300 230) scale(0.8) rotate(4 80 55)">
        <MaskShape />
      </g>
    </svg>
  )
}

/** Ready-to-give gift box with the pouch peeking out. */
export function GiftScene({ className, title }: SceneProps) {
  return (
    <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <rect width="560" height="420" fill="#ECE9FA" />
      <circle cx="460" cy="90" r="46" fill="#F4D58D" opacity="0.55" />
      <ellipse cx="280" cy="360" rx="170" ry="16" fill="#0F1B3D" opacity="0.08" />
      {/* box */}
      <rect x="140" y="190" width="280" height="166" rx="12" fill="#0F1B3D" />
      <rect x="126" y="160" width="308" height="46" rx="10" fill="#17264F" />
      <rect x="264" y="160" width="32" height="196" fill="#F4D58D" />
      {/* bow */}
      <path d="M280 160 C 230 110, 196 140, 222 160 Z" fill="#F4D58D" />
      <path d="M280 160 C 330 110, 364 140, 338 160 Z" fill="#F4D58D" />
      <circle cx="280" cy="158" r="10" fill="#E8BE5C" />
      {/* gift tag */}
      <path d="M392 230 l46 -14 l10 34 l-46 14 z" fill="#F7F3EC" />
      <circle cx="400" cy="236" r="3" fill="#0F1B3D" />
      <rect x="410" y="232" width="24" height="3" rx="1.5" fill="#5F4DBF" transform="rotate(-16 422 233)" />
      <rect x="412" y="242" width="18" height="3" rx="1.5" fill="#5F4DBF" transform="rotate(-16 421 243)" />
      {/* pouch beside box */}
      <g transform="translate(40 250) scale(0.75) rotate(-8 80 55)">
        <PouchShape />
      </g>
      {/* sparkles */}
      {[[110, 120], [470, 180], [200, 70], [420, 320]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 8} L${x + 2} ${y - 2} L${x + 8} ${y} L${x + 2} ${y + 2} L${x} ${y + 8} L${x - 2} ${y + 2} L${x - 8} ${y} L${x - 2} ${y - 2} Z`} fill="#A99BE8" />
      ))}
    </svg>
  )
}

/** The halls problem: thin wall with noise, a door with corridor light leaking under it. */
export function NoiseLightScene({ className, title }: SceneProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 560 420" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <defs>
        <linearGradient id={`${id}-leak`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4D58D" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F4D58D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="560" height="420" fill="#0F1B3D" />
      <rect y="330" width="560" height="90" fill="#0A1229" />
      {/* door */}
      <rect x="70" y="70" width="150" height="260" rx="6" fill="#223466" />
      <rect x="86" y="90" width="118" height="100" rx="4" fill="none" stroke="#34477C" strokeWidth="3" />
      <rect x="86" y="206" width="118" height="100" rx="4" fill="none" stroke="#34477C" strokeWidth="3" />
      <circle cx="198" cy="206" r="6" fill="#A99BE8" />
      <rect x="64" y="326" width="162" height="6" fill="#F4D58D" />
      <path d="M64 332 L20 420 H270 L226 332 Z" fill={`url(#${id}-leak)`} />
      {/* fire-door sign */}
      <rect x="110" y="40" width="70" height="20" rx="4" fill="#3FAE7A" />
      <rect x="122" y="48" width="46" height="4" rx="2" fill="#F7F3EC" />
      {/* shared wall with sound waves */}
      <rect x="300" y="40" width="20" height="290" fill="#223466" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${340 + i * 28} 140 q 18 45 0 90`}
          stroke="#A99BE8"
          strokeOpacity={0.9 - i * 0.25}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      {/* music notes */}
      <g fill="#A99BE8">
        <circle cx="470" cy="150" r="9" />
        <rect x="477" y="104" width="4" height="46" />
        <path d="M481 104 q20 6 20 24 q-6 -12 -20 -12 z" />
        <circle cx="440" cy="246" r="7" />
        <rect x="445" y="212" width="3.5" height="34" />
      </g>
      <text x="450" y="312" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="700" fontSize="26" fill="#F4D58D">
        2:14am
      </text>
    </svg>
  )
}
