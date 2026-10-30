import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { getVariant, type Variant } from '../../lib/experiment'
import { HallsRoomScene } from '../illustrations/Scenes'
import { LinkButton } from '../ui/Button'
import { StarField } from './StarField'

const copy: Record<Variant, { headline: string; body: string }> = {
  a: {
    headline: 'Sleep better in halls.',
    body: 'Thin walls, corridor lights and flatmates on different schedules. The NightNest Student Rest Kit blocks out the noise and light, and a planner helps you protect the hours you need.',
  },
  b: {
    headline: 'Study smarter this exam season.',
    body: 'Good revision needs good sleep. The NightNest Student Rest Kit pairs sleep essentials with a planner that fits bedtime around your study week, exam countdown and all.',
  },
}

const points = ['Four sleep and study essentials in one pouch', '£16–18 per kit, with a student discount', 'Free online planner you can use today']

export function Hero() {
  const [variant] = useState(getVariant)
  const { headline, body } = copy[variant]

  return (
    <section className="relative overflow-hidden bg-midnight text-white on-dark" data-variant={variant}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(169,155,232,0.18),transparent_55%)]" />
      <StarField />
      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="eyebrow text-moon">Sleep well &middot; Study better</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-bold sm:text-6xl lg:text-[4.1rem]">{headline}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/register-interest" variant="moon" size="lg" trackLabel={`hero_register_${variant}`}>
              Register interest <ArrowRight aria-hidden className="size-4" />
            </LinkButton>
            <LinkButton to="/kit" variant="ghost-dark" size="lg" trackLabel={`hero_explore_${variant}`}>
              Explore the kit
            </LinkButton>
          </div>
          <ul className="mt-10 grid gap-2.5 text-[15px] text-white/80">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-moon/15">
                  <Check aria-hidden className="size-3.5 text-moon" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-lavender/10 blur-2xl" />
          <HallsRoomScene
            className="relative w-full overflow-hidden rounded-[32px] shadow-2xl"
            title="A student halls bedroom at night: the moon through the window, a desk lamp over the planner, and the sleep mask, earplug case and pouch on the bed"
          />
        </div>
      </div>
    </section>
  )
}
