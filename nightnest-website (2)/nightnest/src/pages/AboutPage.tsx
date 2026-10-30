import { Eye, HeartHandshake, Leaf, Target } from 'lucide-react'
import { FinalCta } from '../components/home/FinalCta'
import { HallsRoomScene } from '../components/illustrations/Scenes'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { site } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const principles = [
  { icon: Target, title: 'Built for student life', body: 'Halls, shared flats, freshers’ week and exam periods shape every decision, from the pouch size to the planner layout.' },
  { icon: HeartHandshake, title: 'Affordable by design', body: 'Online-only and bundle-first, with no shop costs, so the kit can sit at a student-friendly price.' },
  { icon: Eye, title: 'Honest at every stage', body: 'Straight answers on what&rsquo;s in the kit, what it costs and when it ships. No fake reviews, no hype.' },
  { icon: Leaf, title: 'Start small, learn fast', body: 'A small first batch and a printable planner let us learn from real students before scaling up.' },
]

const timeline = [
  { when: 'Weeks 1–2', body: 'Confirm product details, shortlist suppliers and request quotes. Draft the planner layout.' },
  { when: 'Weeks 3–4', body: 'Build this website, test analytics, and photograph real samples when ready.' },
  { when: 'Weeks 5–6', body: 'Publish exam-week and halls content. Record early responses and run the A/B message test.' },
  { when: 'Week 7 onward', body: 'Review results, adjust pricing, order the first batch and prepare for freshers’ week.' },
]

export function AboutPage() {
  useDocumentTitle('About NightNest', site.mission)
  return (
    <>
      <PageHero
        eyebrow="About NightNest"
        title="Rest well, so you can study better."
        intro="NightNest started from a simple observation: students in halls are told to sleep more and study harder, but nobody designs for the shared walls, corridor lights and exam weeks in between."
        art={<HallsRoomScene className="w-full overflow-hidden rounded-[28px] shadow-lift" title="A halls bedroom at night with the NightNest kit on the bed" />}
      />
      <section className="bg-midnight py-20 text-white on-dark lg:py-24">
        <div className="container-page max-w-4xl text-center">
          <p className="eyebrow text-moon">Our mission</p>
          <p className="mt-6 font-display text-3xl leading-snug font-light sm:text-4xl">{site.mission}</p>
        </div>
      </section>
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="What we believe" title="How we&rsquo;re building NightNest" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="card p-6">
                <p.icon aria-hidden className="size-7 text-lavender-deep" />
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white/60 py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Where we are" title="Our launch plan, in the open" intro="Here&rsquo;s the plan from here to the first batch." />
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.when} delay={i * 80} className={`card border-t-4 p-6 ${i === 3 ? 'border-moon' : 'border-lavender'}`}>
                <p className="eyebrow text-midnight">{t.when}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{t.body}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-6 rounded-2xl bg-midnight px-6 py-4 text-[15px] text-white/85">
            <span className="font-semibold text-moon">Seasonal anchors:</span> exam periods (winter and summer terms) and freshers&rsquo; week in September.
          </div>
        </div>
      </section>
      <div className="pt-20 lg:pt-24">
        <FinalCta />
      </div>
    </>
  )
}
