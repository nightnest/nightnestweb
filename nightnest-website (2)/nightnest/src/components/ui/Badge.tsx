import type { ReactNode } from 'react'

type Tone = 'midnight' | 'lavender' | 'moon' | 'outline'

const tones: Record<Tone, string> = {
  midnight: 'bg-midnight text-moon',
  lavender: 'bg-lavender-soft text-midnight',
  moon: 'bg-moon-soft text-[#6b4a06]',
  outline: 'ring-1 ring-white/25 text-white/85',
}

export function Badge({ children, tone = 'lavender', className = '' }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
