import { ArrowRight } from 'lucide-react'
import { LinkButton } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { KitGrid } from './KitGrid'

export function KitSection() {
  return (
    <section className="bg-white/60 py-20 lg:py-28" aria-label="The Student Rest Kit">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The Student Rest Kit"
              title="One kit that links sleep habits with study planning."
              intro="A sleep mask, earplug case, accessory pouch and a sleep-and-study planner, made for student life."
            />
          </Reveal>
          <Reveal>
            <LinkButton to="/kit" variant="secondary" trackLabel="home_kit_details">
              See kit details <ArrowRight aria-hidden className="size-4" />
            </LinkButton>
          </Reveal>
        </div>
        <div className="mt-12">
          <KitGrid />
        </div>
        <div className="mt-8 rounded-2xl bg-midnight px-6 py-4 text-[15px] text-white/85">
          <span className="font-semibold text-moon">Everything in one pouch:</span> the full kit plus a printable digital
          planner, made for halls, shared flats and exam season.
        </div>
      </div>
    </section>
  )
}
