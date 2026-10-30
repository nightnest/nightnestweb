import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
  as?: 'h1' | 'h2'
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', dark = false, as: H = 'h2' }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${dark ? 'text-moon' : 'text-lavender-deep'}`}>
          {eyebrow}
        </p>
      )}
      <H className={`text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </H>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-muted'}`}>{intro}</p>}
    </div>
  )
}
