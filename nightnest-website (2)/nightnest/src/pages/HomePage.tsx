import { Accordion } from '../components/ui/Accordion'
import { Audiences } from '../components/home/Audiences'
import { Differentiation } from '../components/home/Differentiation'
import { FinalCta } from '../components/home/FinalCta'
import { GuidesPreview } from '../components/home/GuidesPreview'
import { Hero } from '../components/home/Hero'
import { Journey } from '../components/home/Journey'
import { KitSection } from '../components/home/KitSection'
import { PlannerTeaser } from '../components/home/PlannerTeaser'
import { ProblemSection } from '../components/home/ProblemSection'
import { RoutineSheetSignup } from '../components/RoutineSheetSignup'
import { LinkButton } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { faqs } from '../data/faqs'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const homeFaqs = [0, 6, 7, 10].map((i) => faqs[i])

export function HomePage() {
  useDocumentTitle('', 'NightNest Student Rest Kit: a sleep mask, earplug case, pouch and sleep-and-study planner for students in halls and shared flats.')
  return (
    <>
      <Hero />
      <ProblemSection />
      <KitSection />
      <Differentiation />
      <PlannerTeaser />
      <Audiences />
      <Journey />
      <GuidesPreview />
      <section className="container-page pb-20 lg:pb-28" aria-label="Free sleep-routine sheet">
        <Reveal>
          <RoutineSheetSignup />
        </Reveal>
      </section>
      <section className="container-page grid gap-10 pb-20 lg:grid-cols-[1fr_1.5fr] lg:pb-28" aria-label="Frequently asked questions">
        <Reveal>
          <SectionHeading eyebrow="FAQs" title="Questions before launch" intro="Straight answers about the kit, pricing and what pre-launch means." />
          <LinkButton to="/faq" variant="secondary" className="mt-8">
            All FAQs
          </LinkButton>
        </Reveal>
        <Reveal delay={100}>
          <Accordion items={homeFaqs.map((f, i) => ({ id: `home-faq-${i}`, title: f.q, content: f.a }))} defaultOpen="home-faq-0" />
        </Reveal>
      </section>
      <FinalCta />
    </>
  )
}
