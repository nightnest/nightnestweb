import { ArrowLeft, Printer } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoMark } from '../components/layout/Logo'
import { RoutineSheetSignup } from '../components/RoutineSheetSignup'
import { Button } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { readStore } from '../lib/storage'

const windDown = [
  { time: '−60 min', title: 'Stop new work', body: 'Finish the study block. Write tomorrow’s first task on paper.' },
  { time: '−45 min', title: 'Dim the room', body: 'Lamp on, main light off. Screens down or on night mode.' },
  { time: '−30 min', title: 'Get ready', body: 'Wash, water by the bed, phone charging away from the pillow.' },
  { time: '−15 min', title: 'Kit out', body: 'Mask and earplugs out of the pouch and within reach.' },
  { time: 'Bedtime', title: 'Lights out', body: 'Same time as your planner target, give or take 30 minutes.' },
]

const checklist = [
  'Wake-up time set and the same as yesterday',
  'Tomorrow’s first task written down',
  'Mood check-in done',
  'Earplugs and mask within reach',
  'Door gap and standby lights covered',
  'No caffeine after mid-afternoon',
]

export function RoutineSheetPage() {
  useDocumentTitle('Sleep-routine sheet')
  const [unlocked, setUnlocked] = useState(() => readStore('routine-sheet:unlocked', false))

  if (!unlocked) {
    return (
      <section className="container-page py-16 lg:py-24">
        <RoutineSheetSignup onUnlock={() => setUnlocked(true)} />
      </section>
    )
  }

  return (
    <section className="container-page py-10 lg:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 no-print">
        <Link to="/planner" className="inline-flex items-center gap-2 text-sm font-semibold text-lavender-deep hover:underline">
          <ArrowLeft aria-hidden className="size-4" /> Back to the planner
        </Link>
        <Button onClick={() => window.print()}>
          <Printer aria-hidden className="size-4" /> Print or save as PDF
        </Button>
      </div>
      <article className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lift sm:p-12 print:shadow-none">
        <header className="flex items-center justify-between border-b border-line pb-6">
          <div>
            <p className="eyebrow text-lavender-deep">NightNest</p>
            <h1 className="mt-2 text-3xl font-bold">My sleep routine</h1>
            <p className="mt-1 text-muted">For halls, shared flats and exam weeks</p>
          </div>
          <LogoMark className="size-14" />
        </header>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {['Target bedtime', 'Target wake-up'].map((label) => (
            <div key={label} className="rounded-2xl border-2 border-dashed border-line p-4">
              <p className="text-sm font-semibold text-muted">{label}</p>
              <p className="mt-6 border-b border-ink/30" />
            </div>
          ))}
        </div>
        <h2 className="mt-10 text-xl font-semibold">The 60-minute wind-down</h2>
        <ol className="mt-4 space-y-3">
          {windDown.map((s) => (
            <li key={s.time} className="flex gap-4 rounded-2xl bg-cream p-4">
              <span className="w-20 shrink-0 font-display font-bold text-lavender-deep">{s.time}</span>
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <h2 className="mt-10 text-xl font-semibold">Before lights out</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {checklist.map((c) => (
            <li key={c} className="flex items-start gap-3 text-[15px]">
              <span aria-hidden className="mt-0.5 size-5 shrink-0 rounded-md border-2 border-midnight/40" />
              {c}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
