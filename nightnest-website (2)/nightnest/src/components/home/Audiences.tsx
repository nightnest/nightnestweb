import { audiences, type Audience } from '../../data/audiences'
import { GiftScene, HallsRoomScene, TravelScene } from '../illustrations/Scenes'
import { Badge } from '../ui/Badge'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function AudienceArt({ id }: { id: Audience['id'] }) {
  const cls = 'block aspect-[4/3] w-full'
  if (id === 'students') return <HallsRoomScene className={cls} title="Illustration of a halls bedroom at night" />
  if (id === 'travellers') return <TravelScene className={cls} title="Illustration of a train window at dusk with the mask and pouch on the table" />
  return <GiftScene className={cls} title="Illustration of a wrapped gift box with the NightNest pouch beside it" />
}

export function Audiences() {
  return (
    <section className="py-20 lg:py-28" aria-label="Who NightNest is for">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Who it’s for"
            title="Made for halls. Handy for the journey. Easy to give."
            intro="We are focusing first on students in shared accommodation, with travellers and gift-buying parents close behind."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.id} delay={i * 90}>
              <article
                className={`card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift ${
                  i === 0 ? 'ring-2 ring-moon' : ''
                }`}
              >
                <div className="overflow-hidden bg-midnight">
                  <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                    <AudienceArt id={a.id} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <Badge tone={i === 0 ? 'midnight' : 'lavender'} className="self-start">
                    {a.tag}
                  </Badge>
                  <h3 className="mt-4 text-2xl font-semibold">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{a.body}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-ink/80">
                    {a.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lavender-deep" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
