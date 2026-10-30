import { config } from './config'
import { getVariant } from './experiment'
import { readStore, writeStore } from './storage'

/**
 * Lightweight event tracking.
 * - Always records events in this browser so the /insights page can show the experiment funnel
 *   (this is local demo data, not real traffic).
 * - When VITE_PLAUSIBLE_DOMAIN is set, also sends the event to Plausible as a custom event.
 */
export type EventName =
  | 'page_view'
  | 'cta_click'
  | 'interest_submitted'
  | 'enquiry_submitted'
  | 'discount_signup'
  | 'routine_sheet_signup'
  | 'planner_used'

export interface TrackedEvent {
  name: EventName
  variant: 'a' | 'b'
  path: string
  label?: string
  source?: string
  at: string
}

const EVENTS_KEY = 'analytics:events'
const UTM_KEY = 'analytics:utm'
const MAX_EVENTS = 500

declare global {
  interface Window {
    plausible?: ((event: string, options?: { props?: Record<string, string> }) => void) & { q?: unknown[] }
  }
}

export function initAnalytics() {
  captureUtm()
  if (!config.plausibleDomain || document.querySelector('script[data-domain]')) return
  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = config.plausibleDomain
  script.src = 'https://plausible.io/js/script.manual.js'
  document.head.appendChild(script)
  window.plausible =
    window.plausible ||
    Object.assign((...args: unknown[]) => {
      ;(window.plausible!.q = window.plausible!.q || []).push(args)
    }, {})
}

function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search)
    const source = params.get('utm_source')
    if (source) {
      writeStore(UTM_KEY, {
        source,
        medium: params.get('utm_medium') ?? '',
        campaign: params.get('utm_campaign') ?? '',
      })
    }
  } catch {
    // ignore
  }
}

export function getUtmSource(): string {
  return readStore<{ source?: string } | null>(UTM_KEY, null)?.source ?? 'direct'
}

export function track(name: EventName, label?: string) {
  const event: TrackedEvent = {
    name,
    label,
    variant: getVariant(),
    path: window.location.pathname,
    source: getUtmSource(),
    at: new Date().toISOString(),
  }
  const events = readStore<TrackedEvent[]>(EVENTS_KEY, [])
  events.push(event)
  writeStore(EVENTS_KEY, events.slice(-MAX_EVENTS))

  if (config.plausibleDomain && window.plausible) {
    const props: Record<string, string> = { variant: event.variant, source: event.source ?? 'direct' }
    if (label) props.label = label
    if (name === 'page_view') window.plausible('pageview')
    else window.plausible(name, { props })
  }
}

export function getEvents(): TrackedEvent[] {
  return readStore<TrackedEvent[]>(EVENTS_KEY, [])
}

export function clearEvents() {
  writeStore(EVENTS_KEY, [])
}
