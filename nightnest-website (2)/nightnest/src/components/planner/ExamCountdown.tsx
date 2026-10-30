import { CalendarPlus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { daysBetween, formatDay, todayISO } from '../../lib/dates'
import { buttonClasses } from '../ui/Button'
import { newId, type PlannerData } from './types'

interface Props {
  data: PlannerData
  onChange: (updater: (d: PlannerData) => PlannerData) => void
}

export function ExamCountdown({ data, onChange }: Props) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({})
  const today = todayISO()

  function add(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!name.trim()) next.name = 'Give the exam or deadline a name.'
    if (!date) next.date = 'Choose a date.'
    else if (date < today) next.date = 'Choose today or a future date.'
    setErrors(next)
    if (Object.keys(next).length) return
    onChange((d) => ({ ...d, exams: [...d.exams, { id: newId(), name: name.trim(), date }] }))
    setName('')
    setDate('')
  }

  const remove = (id: string) => onChange((d) => ({ ...d, exams: d.exams.filter((x) => x.id !== id) }))
  const sorted = [...data.exams].sort((a, b) => a.date.localeCompare(b.date))
  const upcoming = sorted.filter((x) => x.date >= today)
  const past = sorted.filter((x) => x.date < today)
  const next = upcoming[0]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div className="space-y-6">
        <div className="rounded-2xl bg-midnight p-6 text-white on-dark">
          <p className="eyebrow text-moon">Next up</p>
          {next ? (
            <>
              <p className="mt-3 font-display text-5xl font-bold tabular-nums">
                {daysBetween(today, next.date)}
                <span className="ml-2 text-lg font-medium text-white/70">{daysBetween(today, next.date) === 1 ? 'day' : 'days'}</span>
              </p>
              <p className="mt-2 text-lg font-semibold">{next.name}</p>
              <p className="text-sm text-white/65">{formatDay(next.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="mt-4 text-sm text-white/70">
                That is about <strong className="text-white">{Math.max(0, daysBetween(today, next.date)) * 2}</strong> study blocks at two a day. Plan them now, not the night before.
              </p>
            </>
          ) : (
            <p className="mt-3 text-white/70">No upcoming exams yet. Add your first one to start the countdown.</p>
          )}
        </div>
        <form onSubmit={add} noValidate className="card space-y-4 p-6 no-print">
          <div>
            <label htmlFor="exam-name" className="field-label">Exam or deadline</label>
            <input id="exam-name" className="field" placeholder="e.g. Statistics exam" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'exam-name-error' : undefined} />
            {errors.name && <p id="exam-name-error" role="alert" className="mt-1.5 text-[13px] font-medium text-danger">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="exam-date" className="field-label">Date</label>
            <input id="exam-date" type="date" min={today} className="field" value={date} onChange={(e) => setDate(e.target.value)} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'exam-date-error' : undefined} />
            {errors.date && <p id="exam-date-error" role="alert" className="mt-1.5 text-[13px] font-medium text-danger">{errors.date}</p>}
          </div>
          <button type="submit" className={buttonClasses('primary', 'md', 'w-full')}>
            <CalendarPlus aria-hidden className="size-4" /> Add to countdown
          </button>
        </form>
      </div>

      <div className="card p-5 sm:p-6">
        <h3 className="text-lg font-semibold">All exams and deadlines</h3>
        {sorted.length === 0 ? (
          <div className="mt-6 rounded-xl border-2 border-dashed border-line p-8 text-center text-muted">
            Your countdown is empty. Add exams and coursework deadlines to see them here.
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {[...upcoming, ...past].map((x) => {
              const days = daysBetween(today, x.date)
              const isPast = days < 0
              const urgent = !isPast && days <= 7
              return (
                <li key={x.id} className={`flex items-center gap-4 rounded-xl p-3 ring-1 ring-line ${isPast ? 'opacity-55' : ''}`}>
                  <span className={`flex size-14 shrink-0 flex-col items-center justify-center rounded-xl font-display ${urgent ? 'bg-moon text-midnight' : isPast ? 'bg-cream-dark' : 'bg-lavender-soft text-midnight'}`}>
                    <span className="text-lg leading-none font-bold tabular-nums">{isPast ? '✓' : days}</span>
                    {!isPast && <span className="text-[10px] font-semibold uppercase">{days === 1 ? 'day' : 'days'}</span>}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{x.name}</p>
                    <p className="text-sm text-muted">
                      {formatDay(x.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      {days === 0 && ' · Today, good luck!'}
                      {isPast && ' · Done'}
                    </p>
                  </div>
                  <button type="button" onClick={() => remove(x.id)} aria-label={`Remove ${x.name}`} className="rounded-full p-2 text-muted hover:bg-danger/10 hover:text-danger no-print">
                    <Trash2 aria-hidden className="size-4" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
