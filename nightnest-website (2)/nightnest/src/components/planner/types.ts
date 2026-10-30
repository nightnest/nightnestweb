export interface SleepEntry {
  /** The night's date: the evening you went to bed. */
  date: string
  bed: string
  wake: string
}

export interface StudyBlock {
  id: string
  date: string
  subject: string
  start: string
  end: string
  done: boolean
}

export interface Exam {
  id: string
  name: string
  date: string
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5

export interface MoodEntry {
  date: string
  mood: MoodLevel
  note: string
}

export interface PlannerSettings {
  targetBed: string
  targetWake: string
}

export interface PlannerData {
  sleep: SleepEntry[]
  study: StudyBlock[]
  exams: Exam[]
  moods: MoodEntry[]
  settings: PlannerSettings
}

export const emptyPlanner: PlannerData = {
  sleep: [],
  study: [],
  exams: [],
  moods: [],
  settings: { targetBed: '23:00', targetWake: '07:30' },
}

export const moodScale: { level: MoodLevel; emoji: string; label: string }[] = [
  { level: 1, emoji: '\u{1F629}', label: 'Rough' },
  { level: 2, emoji: '\u{1F615}', label: 'Low' },
  { level: 3, emoji: '\u{1F610}', label: 'Okay' },
  { level: 4, emoji: '\u{1F642}', label: 'Good' },
  { level: 5, emoji: '\u{1F604}', label: 'Great' },
]

export const newId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)
