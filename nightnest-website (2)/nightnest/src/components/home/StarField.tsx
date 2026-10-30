/** Decorative twinkling stars for dark sections. Positions are fixed so renders are stable. */
const STARS: [number, number, number][] = [
  [6, 12, 2], [14, 68, 1.5], [22, 30, 1], [31, 84, 2], [38, 16, 1.5], [47, 54, 1], [55, 8, 1.5],
  [61, 92, 1], [68, 40, 2], [74, 74, 1], [81, 20, 1.5], [88, 58, 1], [94, 88, 2], [97, 34, 1],
  [10, 45, 1], [52, 72, 1.5], [84, 6, 1],
]

export function StarField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map(([left, top, size], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{ left: `${left}%`, top: `${top}%`, width: size * 2, height: size * 2, animationDelay: `${(i * 0.53) % 4}s` }}
        />
      ))}
    </div>
  )
}
