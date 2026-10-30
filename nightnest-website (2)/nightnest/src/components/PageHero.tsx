import type { ReactNode } from 'react'
import { StarField } from './home/StarField'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  art?: ReactNode
  dark?: boolean
}

export function PageHero({ eyebrow, title, intro, children, art, dark = false }: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-midnight text-white on-dark' : 'bg-cream'}`}>
      {dark && <StarField />}
      <div
        className={`container-page relative grid items-center gap-10 py-14 sm:py-16 lg:py-20 ${art ? 'lg:grid-cols-[1.1fr_1fr] lg:gap-16' : ''}`}
      >
        <div className="max-w-3xl">
          <p className={`eyebrow ${dark ? 'text-moon' : 'text-lavender-deep'}`}>{eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {intro && <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-muted'}`}>{intro}</p>}
          {children}
        </div>
        {art && <div>{art}</div>}
      </div>
    </section>
  )
}
