import { CalendarClock, MoonStar, Smile, Timer } from 'lucide-react'
import { DeskScene } from '../illustrations/Scenes'
import { LinkButton } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { StarField } from './StarField'

const features = [
  { icon: MoonStar, title: 'Bedtime tracker', body: 'Log bed and wake times and see your weekly average.' },
  { icon: CalendarClock, title: 'Weekly study schedule', body: 'Plan revision blocks that finish before bedtime.' },
  { icon: Timer, title: 'Exam countdown', body: 'Every exam and deadline, counted down in days.' },
  { icon: Smile, title: 'Mood check-in', body: 'One tap a day to spot how sleep and mood connect.' },
]

export function PlannerTeaser() {
  return (
    <section className="relative overflow-hidden bg-midnight py-20 text-white on-dark lg:py-28" aria-label="The planner">
      <StarField />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading
              dark
              eyebrow="The sleep-and-study planner"
              title="Connect bedtime to the study week."
              intro="The planner is what turns a sleep kit into a routine. Try the online version free today; it saves to your browser and prints on one page."
            />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 80} className="rounded-2xl bg-white/6 p-5 ring-1 ring-white/10">
                <f.icon aria-hidden className="size-6 text-moon" />
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-white/70">{f.body}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/planner" variant="moon" size="lg" trackLabel="home_try_planner">
              Try the planner free
            </LinkButton>
            <LinkButton to="/guides/planner-walkthrough" variant="ghost-dark" size="lg">
              Read the walk-through
            </LinkButton>
          </div>
        </div>
        <Reveal delay={100}>
          <DeskScene
            className="w-full overflow-hidden rounded-[28px] shadow-2xl ring-1 ring-white/10"
            title="Illustration of a desk at night with a laptop, the open planner, a lamp and the earplug case"
          />
        </Reveal>
      </div>
    </section>
  )
}
