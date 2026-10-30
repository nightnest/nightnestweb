import { ClipboardCheck, Compass, Package, Sparkles } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const steps = [
  { icon: Compass, title: 'Discover', body: 'Read a halls survival guide or try the free planner and sleep-routine sheet.' },
  { icon: Sparkles, title: 'Explore the kit', body: 'See what’s in the Rest Kit and how the planner connects sleep to study.' },
  { icon: ClipboardCheck, title: 'Check details', body: 'Target pricing, the student discount, delivery and FAQs, all in one place.' },
  { icon: Package, title: 'Register interest', body: 'Reserve a place for the first small batch. No payment is taken yet.' },
]

export function Journey() {
  return (
    <section className="bg-white/60 py-20 lg:py-28" aria-label="How it works">
      <div className="container-page">
        <Reveal>
          <SectionHeading align="center" eyebrow="How it works" title="From first look to first batch." />
        </Reveal>
        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-lavender via-lavender to-moon lg:block" />
          {steps.map((s, i) => {
            const last = i === steps.length - 1
            return (
              <Reveal as="li" key={s.title} delay={i * 100} className="relative text-center">
                <span
                  className={`relative mx-auto flex size-16 items-center justify-center rounded-2xl shadow-card ${
                    last ? 'bg-moon text-midnight' : 'bg-midnight text-moon'
                  }`}
                >
                  <s.icon aria-hidden className="size-7" />
                </span>
                <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-lavender-deep uppercase">Step {i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-64 text-[15px] text-muted">{s.body}</p>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
