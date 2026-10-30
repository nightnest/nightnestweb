/**
 * Concept drawings of the four Rest Kit items. Each shape draws inside a 160 x 110 box
 * so scenes can place and rotate them with a <g transform>.
 * These are illustrations, not product photographs.
 */
import type { SVGProps } from 'react'
import type { KitItemId } from '../../data/products'

type G = SVGProps<SVGGElement>

export function MaskShape(props: G) {
  return (
    <g {...props}>
      {/* strap */}
      <path d="M2 52 C 20 46, 22 46, 30 48" stroke="#A99BE8" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M130 48 C 140 46, 142 46, 158 52" stroke="#A99BE8" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* body */}
      <path
        d="M80 18 C 118 18, 136 30, 136 52 C 136 76, 116 88, 98 84 C 90 82, 86 74, 80 74 C 74 74, 70 82, 62 84 C 44 88, 24 76, 24 52 C 24 30, 42 18, 80 18 Z"
        fill="#24366E"
      />
      <path
        d="M80 18 C 118 18, 136 30, 136 52 C 136 58, 135 63, 133 67 C 120 40, 100 30, 80 30 C 60 30, 40 40, 27 67 C 25 63, 24 58, 24 52 C 24 30, 42 18, 80 18 Z"
        fill="#2F4384"
      />
      {/* stitching */}
      <path
        d="M80 25 C 112 25, 129 35, 129 52 C 129 71, 113 80, 98 77 C 91 75, 87 67, 80 67 C 73 67, 69 75, 62 77 C 47 80, 31 71, 31 52 C 31 35, 48 25, 80 25 Z"
        fill="none"
        stroke="#A99BE8"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />
      {/* moon logo */}
      <circle cx="80" cy="46" r="7" fill="#F4D58D" />
      <circle cx="83.5" cy="43.5" r="6" fill="#2F4384" />
    </g>
  )
}

export function EarplugCaseShape(props: G) {
  return (
    <g {...props}>
      <rect x="30" y="22" width="100" height="66" rx="33" fill="#A99BE8" />
      <rect x="30" y="22" width="100" height="30" rx="15" fill="#B9AEF0" />
      <path d="M36 55 H124" stroke="#8C7DD6" strokeWidth="2" />
      {/* windows showing the earplugs */}
      <rect x="48" y="40" width="64" height="30" rx="15" fill="#F7F3FF" />
      <circle cx="66" cy="55" r="9" fill="#F4D58D" />
      <circle cx="66" cy="55" r="4" fill="#E8BE5C" />
      <circle cx="94" cy="55" r="9" fill="#F4D58D" />
      <circle cx="94" cy="55" r="4" fill="#E8BE5C" />
      {/* hinge */}
      <rect x="72" y="84" width="16" height="6" rx="3" fill="#8C7DD6" />
    </g>
  )
}

export function PouchShape(props: G) {
  return (
    <g {...props}>
      <path d="M22 32 H138 L130 98 Q129 104 122 104 H38 Q31 104 30 98 Z" fill="#F4D58D" />
      <path d="M22 32 H138 L136 48 H24 Z" fill="#EFC86E" />
      {/* zip */}
      <path d="M26 36 H134" stroke="#0F1B3D" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 36 H134" stroke="#F4D58D" strokeWidth="1" strokeDasharray="2 3" />
      <rect x="108" y="33" width="9" height="14" rx="3" fill="#0F1B3D" />
      <path d="M112.5 47 v8" stroke="#0F1B3D" strokeWidth="2.5" strokeLinecap="round" />
      {/* label */}
      <rect x="58" y="64" width="44" height="16" rx="8" fill="#0F1B3D" />
      <circle cx="68" cy="72" r="4" fill="#F4D58D" />
      <circle cx="70" cy="70.5" r="3.4" fill="#0F1B3D" />
      <rect x="76" y="70" width="20" height="3.5" rx="1.75" fill="#F4D58D" />
    </g>
  )
}

export function PlannerShape(props: G) {
  return (
    <g {...props}>
      <rect x="44" y="4" width="76" height="102" rx="7" fill="#0F1B3D" />
      <rect x="50" y="10" width="64" height="90" rx="4" fill="#17264F" />
      {/* spiral */}
      {[16, 30, 44, 58, 72, 86].map((y) => (
        <rect key={y} x="39" y={y} width="12" height="5" rx="2.5" fill="#A99BE8" />
      ))}
      {/* header */}
      <circle cx="102" cy="22" r="6" fill="#F4D58D" />
      <circle cx="105" cy="19.5" r="5" fill="#17264F" />
      <rect x="58" y="18" width="30" height="4" rx="2" fill="#F4D58D" />
      {/* lines */}
      <rect x="58" y="34" width="48" height="3" rx="1.5" fill="#A99BE8" />
      <rect x="58" y="42" width="40" height="3" rx="1.5" fill="#A99BE8" opacity="0.7" />
      <rect x="58" y="50" width="44" height="3" rx="1.5" fill="#A99BE8" opacity="0.7" />
      {/* mini week grid */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x={58 + i * 7}
          y={62}
          width="5"
          height={[14, 20, 10, 24, 16, 22, 18][i]}
          rx="1.5"
          fill={i === 3 ? '#F4D58D' : '#34477C'}
          transform={`translate(0 ${24 - [14, 20, 10, 24, 16, 22, 18][i]})`}
        />
      ))}
      {/* ribbon */}
      <path d="M108 100 v10 l4 -3 l4 3 v-10" fill="#F4D58D" />
    </g>
  )
}

const shapes: Record<KitItemId, (props: G) => React.JSX.Element> = {
  mask: MaskShape,
  earplugs: EarplugCaseShape,
  pouch: PouchShape,
  planner: PlannerShape,
}

/** A single kit item on its own soft card background. */
export function KitItemArt({ id, className, title }: { id: KitItemId; className?: string; title: string }) {
  const Shape = shapes[id]
  return (
    <svg viewBox="0 0 200 150" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <ellipse cx="100" cy="126" rx="58" ry="7" fill="#0F1B3D" opacity="0.08" />
      <Shape transform="translate(20 14)" />
    </svg>
  )
}
