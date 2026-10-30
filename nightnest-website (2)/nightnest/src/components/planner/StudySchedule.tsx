import { AlertTriangle, Check, Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { formatDay, startOfWeek, todayISO, toMinutes, weekDates } from '../../lib/dates'
import { buttonClasses } from '../ui/Button'
import { newId, type PlannerData } from './types'

interface Props {
  data: PlannerData
  onChange: (updater: (d: PlannerData) => PlannerData) => void
}

/** Minutes before target bedtime by which study should end. */
const WIND_DOWN = 60

export function StudySchedule({ data, onChange }: Props) {
  const monday = startOfWeek(todayISO())
  const days = weekDates(monday)
  const [form, setForm] = useState({ date: todayISO(), subject: '', start: '18:00', end: '19:30' })
  const [error, setError] = useState('')

  const bedMinutes = toMinutes(data.settings.targetBed)
  // Treat early-morning bedtimes (e.g. 00:30) as "late evening" for the cut-off.
  const cutOff = (bedMinutes < 12 * 60 ? bedMinutes + 24 * 60 : bedMinutes) - WIND_DOWN
  const pushesBedtime = (end: string) => toMinutes(end) > cutOff

  function add(e: FormEvent) {
    e.preventDefault()
    if (!form.subject.trim()) return setError('Add what you will study, e.g. “Past paper”.')
    if (toMinutes(form.end) <= toMinutes(form.start)) return setError('The end time must be after the start time.')
    setError('')
    onChange((d) => ({ ...d, study: [...d.study, { id: newId(), ...form, subject: form.subject.trim(), done: false }] }))
    setForm((f) => ({ ...f, subject: '' }))
  }

  const toggle = (id: string) =>
    onChange((d) => ({ ...d, study: d.study.map((b) => (b.id === id ? { ...b, done: !b.done } : b)) }))
  const remove = (id: string) => onChange((d) => ({ ...d, study: d.study.filter((b) => b.id !== id) }))

  const weekBlocks = data.study.filter((b) => days.includes(b.date))
  const done = weekBlocks.filter((b) => b.done).length
  const hours = weekBlocks.reduce((sum, b) => sum + (toMinutes(b.end) - toMinutes(b.start)) / 60, 0)

  return (
    <div className="space-y-6">
      <form onSubmit={add} noValidate className="card grid gap-4 p-5 sm:p-6 md:grid-cols-[1.4fr_2fr_1fr_1fr_auto] md:items-end no-print">
        <div>
          <label htmlFor="block-day" className="field-label">Day</label>
          <select id="block-day" className="field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}>
            {days.map((d) => (
              <option key={d} value={d}>{formatDay(d)}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="block-subject" className="field-label">Study block</label>
          <input
            id="block-subject"
            className="field"
            placeholder="e.g. Past paper, essay plan"
            value={form.subject}
            maxLength={60}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'block-error' : undefined}
          />
        </div>
        <div>
          <label htmlFor="block-start" className="field-label">Start</label>
          <input id="block-start" type="time" className="field" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
        </div>
        <div>
          <label htmlFor="block-end" className="field-label">End</label>
          <input id="block-end" type="time" className="field" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
        </div>
        <button type="submit" className={buttonClasses('primary', 'md', 'h-[50px]')}>
          <Plus aria-hidden className="size-4" /> Add
        </button>
        {error && (
          <p id="block-error" role="alert" className="text-sm font-medium text-danger md:col-span-5">{error}</p>
        )}
        {!error && pushesBedtime(form.end) && (
          <p className="flex items-center gap-2 text-sm text-[#7a5307] md:col-span-5">
            <AlertTriangle aria-hidden className="size-4" /> This block ends within an hour of your {data.settings.targetBed} target bedtime.
          </p>
        )}
      </form>

      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-white px-4 py-2 shadow-card"><strong>{weekBlocks.length}</strong> blocks this week</span>
        <span className="rounded-full bg-white px-4 py-2 shadow-card"><strong>{hours.toFixed(1)}h</strong> planned</span>
        <span className="rounded-full bg-white px-4 py-2 shadow-card"><strong>{done}</strong> completed</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {days.map((date) => {
          const blocks = data.study.filter((b) => b.date === date).sort((a, b) => a.start.localeCompare(b.start))
          const isToday = date === todayISO()
          return (
            <section key={date} aria-label={formatDay(date, { weekday: 'long', day: 'numeric', month: 'long' })} className={`rounded-2xl p-3 ${isToday ? 'bg-lavender-soft ring-2 ring-lavender' : 'bg-white/70 ring-1 ring-line'}`}>
              <h3 className="px-1 font-sans text-sm font-semibold">
                {formatDay(date, { weekday: 'short' })} <span className="font-normal text-muted">{formatDay(date, { day: 'numeric' })}</span>
              </h3>
              {blocks.length === 0 ? (
                <p className="mt-2 px-1 text-xs text-muted">No study blocks</p>
              ) : (
                <ul className="mt-2 space-y-2">
                  {blocks.map((b) => (
                    <li key={b.id} className={`group rounded-xl bg-white p-2.5 text-sm shadow-card ${b.done ? 'opacity-60' : ''}`}>
                      <div className="flex items-start gap-2">
                        <button
                          type="button"
                          onClick={() => toggle(b.id)}
                          aria-pressed={b.done}
                          aria-label={`Mark “${b.subject}” as ${b.done ? 'not done' : 'done'}`}
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 ${b.done ? 'border-lavender-deep bg-lavender-deep text-white' : 'border-line'}`}
                        >
                          {b.done && <Check aria-hidden className="size-3.5" />}
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className={`font-medium [overflow-wrap:anywhere] ${b.done ? 'line-through' : ''}`}>{b.subject}</p>
                          <p className={`text-xs tabular-nums ${pushesBedtime(b.end) ? 'font-semibold text-[#7a5307]' : 'text-muted'}`}>
                            {b.start}&ndash;{b.end}
                            {pushesBedtime(b.end) && ' · late'}
                          </p>
                        </div>
                        <button type="button" onClick={() => remove(b.id)} aria-label={`Delete “${b.subject}”`} className="rounded p-1 text-muted hover:bg-danger/10 hover:text-danger no-print">
                          <Trash2 aria-hidden className="size-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
