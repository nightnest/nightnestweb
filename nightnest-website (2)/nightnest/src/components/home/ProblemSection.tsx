import { BrainCircuit, Lightbulb, Volume2 } from 'lucide-react'
import { NoiseLightScene } from '../illustrations/Scenes'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const problems = [
  {
    icon: Volume2,
    title: 'Noise through shared walls',
    body: 'Fire doors, corridor chats, kitchen music and flatmates who sleep at a different time.',
  },
  {
    icon: Lightbulb,
    title: 'Light you can’t switch off',
    body: 'Thin curtains, sensor lights in the corridor and early summer sunrises.',
  },
  {
    icon: BrainCircuit,
    title: 'New places and exam stress',
    body: 'Unfamiliar rooms and exam pressure push bedtime later. Poor sleep then hurts focus and grades.',
  },
]

export function ProblemSection() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="problem-heading">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <NoiseLightScene
            className="w-full overflow-hidden rounded-[28px] shadow-lift"
            title="Illustration of a halls room at 2:14am: corridor light leaking under the door and music coming through a shared wall"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading
              eyebrow="The customer problem"
              title={<span id="problem-heading">Halls weren&rsquo;t built for a good night&rsquo;s sleep.</span>}
              intro="University students in halls and shared flats need to rest properly around noise, light and unfamiliar surroundings. Most sleep products ignore the way student life actually works."
            />
          </Reveal>
          <ul className="mt-10 space-y-5">
            {problems.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 90} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lavender-soft text-lavender-deep">
                  <p.icon aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
