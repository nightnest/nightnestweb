import { Planner } from '../components/planner/Planner'
import { RoutineSheetSignup } from '../components/RoutineSheetSignup'
import { PageHero } from '../components/PageHero'
import { LinkButton } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function PlannerPage() {
  useDocumentTitle('Sleep-and-study planner', 'A free student sleep planner: bedtime tracker, weekly study schedule, exam countdown and mood check-in.')
  return (
    <>
      <div className="no-print">
        <PageHero
          eyebrow="Free to try"
          title="The sleep-and-study planner"
          intro="The same four sections as the printed planner in the Rest Kit: bedtime tracker, weekly study schedule, exam countdown and mood check-in. Use it now, free."
        >
        </PageHero>
      </div>
      <section className="container-page pb-16" aria-label="Planner">
        <Planner />
      </section>
      <section className="container-page pb-20 no-print" aria-label="Routine sheet and kit">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <RoutineSheetSignup compact />
          <div className="flex flex-col justify-between rounded-3xl bg-midnight p-8 text-white on-dark">
            <div>
              <p className="eyebrow text-moon">Prefer paper?</p>
              <h2 className="mt-3 text-2xl font-bold">The printed planner comes in the Rest Kit</h2>
              <p className="mt-3 text-white/70">
                Alongside the sleep mask, earplug case and pouch. A printable digital version is planned for launch too.
              </p>
            </div>
            <LinkButton to="/kit" variant="moon" className="mt-6 self-start" trackLabel="planner_to_kit">
              See the kit
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}
