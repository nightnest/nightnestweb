import { useState } from 'react'
import { addDays, formatDay, formatHours, sleepHours, todayISO } from '../../lib/dates'
import { buttonClasses } from '../ui/Button'
import { moodScale, type MoodLevel, type PlannerData } from './types'

interface Props {
  data: PlannerData
  onChange: (updater: (d: PlannerData) => PlannerData) => void
}

export function MoodCheckin({ data, onChange }: Props) {
  const today = todayISO()
  const existing = data.moods.find((m) => m.date === today)
  const [mood, setMood] = useState<MoodLevel | null>(existing?.mood ?? null)
  const [note, setNote] = useState(existing?.note ?? '')
  const [saved, setSaved] = useState(false)

  function save() {
    if (!mood) return
    onChange((d) => ({ ...d, moods: [...d.moods.filter((m) => m.date !== today), { date: today, mood, note: note.trim() }] }))
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  const history = Array.from({ length: 14 }, (_, i) => addDays(today, i - 13))
  const moodByDate = new Map(data.moods.map((m) => [m.date, m]))
  const sleepByDate = new Map(data.sleep.map((s) => [s.date, s]))

  // Compare last night's sleep on good vs low mood days.
  const pairs = data.moods
    .map((m) => {
      const night = sleepByDate.get(addDays(m.date, -1)) ?? sleepByDate.get(m.date)
      return night ? { mood: m.mood, hours: sleepHours(night.bed, night.wake) } : null
    })
    .filter((p): p is { mood: MoodLevel; hours: number } => Boolean(p))
  const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null)
  const good = avg(pairs.filter((p) => p.mood >= 4).map((p) => p.hours))
  const low = avg(pairs.filter((p) => p.mood <= 2).map((p) => p.hours))

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="card p-6">
        <h3 className="text-lg font-semibold">How are you feeling today?</h3>
        <p className="mt-1 text-sm text-muted">{formatDay(today, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <div role="radiogroup" aria-label="Today's mood" className="mt-5 grid grid-cols-5 gap-2">
          {moodScale.map((m) => {
            const active = mood === m.level
            return (
              <button
                key={m.level}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setMood(m.level)}
                className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-3 transition-all ${
                  active ? 'bg-midnight text-white shadow-lift' : 'bg-cream hover:bg-lavender-soft'
                }`}
              >
                <span aria-hidden className="text-2xl sm:text-3xl">{m.emoji}</span>
                <span className="text-xs font-semibold">{m.label}</span>
              </button>
            )
          })}
        </div>
        <label htmlFor="mood-note" className="field-label mt-5">
          Note <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id="mood-note" rows={3} maxLength={200} className="field resize-none" placeholder="e.g. Noisy corridor, slept badly" value={note} onChange={(e) => setNote(e.target.value)} />
        <div className="mt-4 flex items-center gap-4">
          <button type="button" onClick={save} disabled={!mood} className={buttonClasses('primary')}>
            {existing ? 'Update check-in' : 'Save check-in'}
          </button>
          <p role="status" className="text-sm font-medium text-success">{saved ? 'Saved.' : ''}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Last 14 days</h3>
          <ol className="mt-4 grid grid-cols-7 gap-2">
            {history.map((d) => {
              const m = moodByDate.get(d)
              const scale = m ? moodScale[m.mood - 1] : null
              return (
                <li key={d} className="text-center" title={m?.note || undefined}>
                  <span className={`flex aspect-square items-center justify-center rounded-xl text-lg ${m ? 'bg-lavender-soft' : 'bg-cream-dark/60'}`}>
                    {scale ? <span role="img" aria-label={scale.label}>{scale.emoji}</span> : <span className="sr-only">No check-in</span>}
                  </span>
                  <span className="mt-1 block text-[10px] text-muted">{formatDay(d, { day: 'numeric', month: 'numeric' })}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="rounded-2xl bg-moon-soft p-6 ring-1 ring-moon/60">
          <h3 className="font-sans font-semibold">Sleep and mood</h3>
          {good !== null && low !== null ? (
            <p className="mt-2 text-[15px] text-ink/80">
              Before good days you slept <strong>{formatHours(good)}</strong> on average; before low days,{' '}
              <strong>{formatHours(low)}</strong>.
            </p>
          ) : (
            <p className="mt-2 text-[15px] text-ink/80">
              Log a few nights of sleep and mood check-ins, including at least one good and one low day, to compare them here.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
