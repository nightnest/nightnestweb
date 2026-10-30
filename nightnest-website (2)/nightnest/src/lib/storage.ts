/** Safe wrappers around localStorage: private windows and blocked storage must never crash the page. */
const PREFIX = 'nightnest:'

export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeStore<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage unavailable: the in-memory state still works for this visit.
  }
}

export function removeStore(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch {
    // ignore
  }
}
