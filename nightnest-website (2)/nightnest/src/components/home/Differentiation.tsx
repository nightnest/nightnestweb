import { Check, Minus } from 'lucide-react'
import { comparison } from '../../data/products'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Differentiation() {
  return (
    <section className="py-20 lg:py-28" aria-label="What makes NightNest different">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="What makes NightNest different"
            title={
              <>
                Not just a sleep mask: a{' '}
                <span className="rounded-lg bg-moon px-2 text-midnight [box-decoration-break:clone]">sleep-and-study system</span>{' '}
                for shared accommodation.
              </>
            }
          />
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-3xl bg-lavender-soft p-8 lg:p-10">
            <h3 className="eyebrow text-muted">Generic sleep masks</h3>
            <ul className="mt-6 space-y-4">
              {comparison.generic.map((item) => (
                <li key={item} className="flex gap-3 text-ink/80">
                  <Minus aria-hidden className="mt-0.5 size-5 shrink-0 text-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-3xl bg-midnight p-8 text-white shadow-lift lg:p-10">
            <h3 className="eyebrow text-moon">NightNest Rest Kit</h3>
            <ul className="mt-6 space-y-4">
              {comparison.nightnest.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-moon">
                    <Check aria-hidden className="size-4 text-midnight" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
