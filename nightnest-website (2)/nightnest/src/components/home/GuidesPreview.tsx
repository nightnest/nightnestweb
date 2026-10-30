import { guides } from '../../data/guides'
import { GuideCard } from '../GuideCard'
import { LinkButton } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function GuidesPreview() {
  return (
    <section className="py-20 lg:py-28" aria-label="Sleep guides">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Sleep guides"
              title="Halls survival tips and exam-week routines."
              intro="Practical, student-specific advice. Free to read, no sign-up."
            />
          </Reveal>
          <LinkButton to="/guides" variant="secondary">
            All guides
          </LinkButton>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {guides.slice(0, 3).map((g, i) => (
            <Reveal key={g.slug} delay={i * 90}>
              <GuideCard guide={g} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
