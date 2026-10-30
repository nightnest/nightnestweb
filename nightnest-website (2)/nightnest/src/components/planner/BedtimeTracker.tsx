import { ChevronLeft, ChevronRight, Moon, Sunrise } from 'lucide-react'
import { useState } from 'react'
import { addDays, formatDay, formatHours, sleepHours, startOfWeek, todayISO, toMinutes, weekDates } from '../../lib/dates'
import type { PlannerData, SleepEntry } from './types'

interface Props {
  data: PlannerData
  onChange: (updater: (d: PlannerData) => PlannerData) => void
}

const TARGET_HOURS = 8

export function BedtimeTracker({ data, onChange }: Props) {
  const [monday, setMonday] = useState(() => startOfWeek(todayISO()))
  const days = weekDates(monday)
  const byDate = new Map(data.sleep.map((s) => [s.date, s]))
  const logged = days.map((d) => byDate.get(d)).filter((s): s is SleepEntry => Boolean(s))
  const avg = logged.length ? logged.reduce((sum, s) => sum + sleepHours(s.bed, s.wake), 0) / logged.length : 0
  const lateNights = logged.filter((s) => {
    const bed = toMinutes(s.bed)
    const target = toMinutes(data.settings.targetBed)
    // Bedtimes after midnight count as late relative to an evening target.
    const normalise = (m: number) => (m < 12 * 60 ? m + 24 * 60 : m)
    return normalise(bed) - normalise(target) > 30
  }).length

  const update = (date: string, field: 'bed' | 'wake', value: string) =>
    onChange((d) => {
      const existing = d.sleep.find((s) => s.date === date)
      const entry: SleepEntry = existing
        ? { ...existing, [field]: value }
        : { date, bed: d.settings.targetBed, wake: d.settings.targetWake, [field]: value }
      return { ...d, sleep: [...d.sleep.filter((s) => s.date !== date), entry] }
    })

  const clear = (date: string) => onChange((d) => ({ ...d, sleep: d.sleep.filter((s) => s.date !== date) }))

  const setSetting = (field: 'targetBed' | 'targetWake', value: string) =>
    onChange((d) => ({ ...d, settings: { ...d.settings, [field]: value } }))

  const isThisWeek = monday === startOfWeek(todayISO())

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">
            Week of {formatDay(monday, { day: 'numeric', month: 'long' })}
          </h3>
          <div className="flex items-center gap-1 no-print">
            <button type="button" onClick={() => setMonday(addDays(monday, -7))} className="rounded-full p-2 hover:bg-cream" aria-label="Previous week">
              <ChevronLeft className="size-5" />
            </button>
            {!isThisWeek && (
              <button type="button" onClick={() => setMonday(startOfWeek(todayISO()))} className="rounded-full px-3 py-1.5 text-sm font-medium hover:bg-cream">
                This week
              </button>
            )}
            <button type="button" onClick={() => setMonday(addDays(monday, 7))} className="rounded-full p-2 hover:bg-cream" aria-label="Next week">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted">Log the night you went to bed. Times past midnight are handled automatically.</p>

        <ul className="mt-5 divide-y divide-line">
          {days.map((date) => {
            const entry = byDate.get(date)
            const hours = entry ? sleepHours(entry.bed, entry.wake) : 0
            const pct = Math.min(100, (hours / 10) * 100)
            const label = formatDay(date)
            return (
              <li key={date} className="grid grid-cols-[88px_1fr] items-center gap-x-3 gap-y-2 py-3 md:grid-cols-[100px_1fr_190px]">
                <span className={`text-sm font-semibold ${date === todayISO() ? 'text-lavender-deep' : ''}`}>{label}</span>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:flex">
                  <label className="sr-only" htmlFor={`bed-${date}`}>Bedtime on {label}</label>
                  <input
                    id={`bed-${date}`}
                    type="time"
                    value={entry?.bed ?? ''}
                    onChange={(e) => e.target.value && update(date, 'bed', e.target.value)}
                    className="field !px-2 !py-2 text-sm sm:w-[8.75rem] sm:!px-3"
                  />
                  <span aria-hidden className="text-muted">&rarr;</span>
                  <label className="sr-only" htmlFor={`wake-${date}`}>Wake time after {label}</label>
                  <input
                    id={`wake-${date}`}
                    type="time"
                    value={entry?.wake ?? ''}
                    onChange={(e) => e.target.value && update(date, 'wake', e.target.value)}
                    className="field !px-2 !py-2 text-sm sm:w-[8.75rem] sm:!px-3"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2 md:col-span-1">
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream-dark" aria-hidden>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${hours >= 7 ? 'bg-lavender-deep' : 'bg-moon'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm font-semibold tabular-nums">{entry ? formatHours(hours) : '—'}</span>
                  {entry && (
                    <button type="button" onClick={() => clear(date)} aria-label={`Clear ${label}`} className="text-xs font-medium text-muted underline-offset-2 hover:underline no-print">
                      Clear
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="space-y-4">
        <div className="rounded-2xl bg-midnight p-6 text-white on-dark">
          <p className="eyebrow text-moon">This week</p>
          <p className="mt-3 font-display text-4xl font-bold tabular-nums">{logged.length ? formatHours(avg) : '—'}</p>
          <p className="text-sm text-white/70">average sleep across {logged.length} logged night{logged.length === 1 ? '' : 's'}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-white/8 p-3">
              <dt className="text-white/60">Late nights</dt>
              <dd className="mt-0.5 text-lg font-semibold">{lateNights}</dd>
            </div>
            <div className="rounded-xl bg-white/8 p-3">
              <dt className="text-white/60">vs {TARGET_HOURS}h aim</dt>
              <dd className="mt-0.5 text-lg font-semibold">{logged.length ? `${avg >= TARGET_HOURS ? '+' : '−'}${formatHours(Math.abs(avg - TARGET_HOURS))}` : '—'}</dd>
            </div>
          </dl>
        </div>
        <div className="card p-6">
          <p className="font-semibold">Your targets</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="target-bed" className="mb-1 flex items-center gap-1.5 text-sm text-muted">
                <Moon aria-hidden className="size-4" /> Bedtime
              </label>
              <input id="target-bed" type="time" className="field !px-3 !py-2" value={data.settings.targetBed} onChange={(e) => e.target.value && setSetting('targetBed', e.target.value)} />
            </div>
            <div>
              <label htmlFor="target-wake" className="mb-1 flex items-center gap-1.5 text-sm text-muted">
                <Sunrise aria-hidden className="size-4" /> Wake-up
              </label>
              <input id="target-wake" type="time" className="field !px-3 !py-2" value={data.settings.targetWake} onChange={(e) => e.target.value && setSetting('targetWake', e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-sm text-muted">
            Target window: <strong className="text-ink">{formatHours(sleepHours(data.settings.targetBed, data.settings.targetWake))}</strong>
          </p>
        </div>
      </aside>
    </div>
  )
}
