import { readStore, writeStore } from './storage'

/**
 * The A/B message test from the NightNest plan:
 * A = "Sleep better in halls" (noise, light, rest)
 * B = "Study smarter this exam season" (grades, focus, planning)
 * Visitors are assigned once and keep their variant. `?v=a` or `?v=b` forces one,
 * so social posts can link to a specific message.
 */
export type Variant = 'a' | 'b'

const KEY = 'experiment:variant'

export function getVariant(): Variant {
  try {
    const forced = new URLSearchParams(window.location.search).get('v')?.toLowerCase()
    if (forced === 'a' || forced === 'b') {
      writeStore(KEY, forced)
      return forced
    }
  } catch {
    // ignore
  }
  const stored = readStore<Variant | null>(KEY, null)
  if (stored === 'a' || stored === 'b') return stored
  const assigned: Variant = Math.random() < 0.5 ? 'a' : 'b'
  writeStore(KEY, assigned)
  return assigned
}

export const variantCopy: Record<Variant, { label: string; headline: string; focus: string }> = {
  a: { label: 'A', headline: 'Sleep better in halls', focus: 'Noise, light and rest' },
  b: { label: 'B', headline: 'Study smarter this exam season', focus: 'Grades, focus and planning' },
}
