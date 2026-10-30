/** Local-date helpers. Dates are stored as YYYY-MM-DD strings in the visitor's local time. */

export const toISODate = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export const fromISODate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const todayISO = () => toISODate(new Date())

export const addDays = (iso: string, days: number) => {
  const d = fromISODate(iso)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

/** Monday of the week containing the given date. */
export const startOfWeek = (iso: string) => {
  const d = fromISODate(iso)
  const offset = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - offset)
  return toISODate(d)
}

export const weekDates = (mondayISO: string) => Array.from({ length: 7 }, (_, i) => addDays(mondayISO, i))

export const daysBetween = (fromISO: string, toISO: string) =>
  Math.round((fromISODate(toISO).getTime() - fromISODate(fromISO).getTime()) / 86_400_000)

export const formatDay = (iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }) =>
  fromISODate(iso).toLocaleDateString('en-GB', opts)

/** "HH:MM" to minutes after midnight. */
export const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/** Sleep duration in hours between a bedtime and wake time, crossing midnight when needed. */
export const sleepHours = (bed: string, wake: string) => {
  let diff = toMinutes(wake) - toMinutes(bed)
  if (diff <= 0) diff += 24 * 60
  return diff / 60
}

export const formatHours = (hours: number) => {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return m === 0 ? `${h}h` : `${h}h ${String(m).padStart(2, '0')}m`
}
