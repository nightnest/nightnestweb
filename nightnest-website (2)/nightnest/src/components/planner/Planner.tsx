import { CalendarClock, MoonStar, Printer, RotateCcw, Smile, Sparkles, Timer } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { usePersistentState } from '../../hooks/usePersistentState'
import { track } from '../../lib/analytics'
import { Button } from '../ui/Button'
import { BedtimeTracker } from './BedtimeTracker'
import { ExamCountdown } from './ExamCountdown'
import { buildExampleWeek } from './exampleData'
import { MoodCheckin } from './MoodCheckin'
import { StudySchedule } from './StudySchedule'
import { emptyPlanner, type PlannerData } from './types'

const tabs = [
  { id: 'sleep', label: 'Bedtime tracker', icon: MoonStar },
  { id: 'study', label: 'Study week', icon: CalendarClock },
  { id: 'exams', label: 'Exam countdown', icon: Timer },
  { id: 'mood', label: 'Mood check-in', icon: Smile },
] as const

type TabId = (typeof tabs)[number]['id']

export function Planner() {
  const [data, setData] = usePersistentState<PlannerData>('planner', emptyPlanner)
  const [active, setActive] = usePersistentState<TabId>('planner:tab', 'sleep')
  const [isExample, setIsExample] = usePersistentState('planner:example', false)
  const [confirmReset, setConfirmReset] = useState(false)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const tracked = useRef(false)

  const isEmpty = !data.sleep.length && !data.study.length && !data.exams.length && !data.moods.length

  const onChange = (updater: (d: PlannerData) => PlannerData) => {
    setData((d) => updater({ ...emptyPlanner, ...d }))
    if (!tracked.current) {
      track('planner_used')
      tracked.current = true
    }
  }

  useEffect(() => {
    if (!confirmReset) return
    const t = window.setTimeout(() => setConfirmReset(false), 4000)
    return () => window.clearTimeout(t)
  }, [confirmReset])

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return
    e.preventDefault()
    setActive(tabs[next].id)
    tabRefs.current[tabs[next].id]?.focus()
  }

  function reset() {
    if (!confirmReset) return setConfirmReset(true)
    setData(emptyPlanner)
    setIsExample(false)
    setConfirmReset(false)
  }

  const safeData = { ...emptyPlanner, ...data }

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between no-print">
        <div role="tablist" aria-label="Planner sections" className="flex gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-card">
          {tabs.map((t, i) => {
            const selected = active === t.id
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[t.id] = el
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                  selected ? 'bg-midnight text-white' : 'text-ink/70 hover:bg-cream'
                }`}
              >
                <t.icon aria-hidden className={`size-4 ${selected ? 'text-moon' : ''}`} />
                {t.label}
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {isEmpty && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setData(buildExampleWeek())
                setIsExample(true)
              }}
            >
              <Sparkles aria-hidden className="size-4" /> Load example week
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={() => window.print()}>
            <Printer aria-hidden className="size-4" /> Print
          </Button>
          {!isEmpty && (
            <Button variant={confirmReset ? 'primary' : 'ghost'} size="sm" onClick={reset} className={confirmReset ? '!bg-danger' : ''}>
              <RotateCcw aria-hidden className="size-4" /> {confirmReset ? 'Click again to clear all' : 'Clear data'}
            </Button>
          )}
        </div>
      </div>

      {isExample && !isEmpty && (
        <p className="mt-4 rounded-xl bg-lavender-soft px-4 py-3 text-sm text-ink/80 no-print">
          You&rsquo;re viewing an <strong>example week</strong> with made-up entries. Edit it, or clear it to start your own.
        </p>
      )}

      <div className="mt-6">
        {tabs.map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={active !== t.id}
            tabIndex={0}
            className="focus-visible:outline-offset-8"
          >
            <h2 className="print-only mb-4 text-xl font-bold">{t.label}</h2>
            {active === t.id && t.id === 'sleep' && <BedtimeTracker data={safeData} onChange={onChange} />}
            {active === t.id && t.id === 'study' && <StudySchedule data={safeData} onChange={onChange} />}
            {active === t.id && t.id === 'exams' && <ExamCountdown data={safeData} onChange={onChange} />}
            {active === t.id && t.id === 'mood' && <MoodCheckin data={safeData} onChange={onChange} />}
          </div>
        ))}
      </div>
    </div>
  )
}
