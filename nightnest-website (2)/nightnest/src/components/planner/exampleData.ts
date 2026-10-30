import { addDays, startOfWeek, todayISO } from '../../lib/dates'
import { newId, type PlannerData } from './types'

/** Illustrative example week so visitors can see a filled-in planner. Clearly labelled as example data in the UI. */
export function buildExampleWeek(): PlannerData {
  const monday = startOfWeek(todayISO())
  const d = (i: number) => addDays(monday, i)
  const sleepTimes: [string, string][] = [
    ['23:15', '07:30'], ['00:40', '08:00'], ['23:30', '07:30'], ['01:10', '08:15'], ['23:00', '07:15'], ['00:30', '09:30'], ['23:20', '08:30'],
  ]
  return {
    settings: { targetBed: '23:00', targetWake: '07:30' },
    sleep: sleepTimes.map(([bed, wake], i) => ({ date: d(i), bed, wake })),
    study: [
      { id: newId(), date: d(0), subject: 'Statistics problem set', start: '10:00', end: '11:30', done: true },
      { id: newId(), date: d(0), subject: 'Lecture notes review', start: '19:00', end: '20:00', done: true },
      { id: newId(), date: d(1), subject: 'Essay plan', start: '14:00', end: '15:30', done: true },
      { id: newId(), date: d(2), subject: 'Flashcards: key terms', start: '16:00', end: '17:00', done: false },
      { id: newId(), date: d(3), subject: 'Past paper (timed)', start: '09:30', end: '11:30', done: false },
      { id: newId(), date: d(3), subject: 'Group project', start: '21:00', end: '22:30', done: false },
      { id: newId(), date: d(4), subject: 'Essay draft', start: '13:00', end: '15:00', done: false },
    ],
    exams: [
      { id: newId(), name: 'Statistics exam', date: addDays(todayISO(), 12) },
      { id: newId(), name: 'Essay deadline', date: addDays(todayISO(), 19) },
      { id: newId(), name: 'Economics exam', date: addDays(todayISO(), 26) },
    ],
    moods: [
      { date: d(0), mood: 4, note: '' },
      { date: d(1), mood: 2, note: 'Late night, tired in lecture' },
      { date: d(2), mood: 4, note: '' },
      { date: d(3), mood: 2, note: 'Noisy corridor' },
      { date: d(4), mood: 5, note: 'Good sleep, productive' },
    ],
  }
}
