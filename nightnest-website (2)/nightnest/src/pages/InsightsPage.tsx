import { RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { Button } from '../components/ui/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { clearEvents, getEvents, type TrackedEvent } from '../lib/analytics'
import { config } from '../lib/config'
import { getVariant, variantCopy, type Variant } from '../lib/experiment'

const CONVERSIONS: TrackedEvent['name'][] = ['interest_submitted', 'enquiry_submitted', 'discount_signup', 'routine_sheet_signup']

function summarise(events: TrackedEvent[], v: Variant) {
  const ev = events.filter((e) => e.variant === v)
  const homeViews = ev.filter((e) => e.name === 'page_view' && e.path === '/').length
  const ctaClicks = ev.filter((e) => e.name === 'cta_click').length
  const conversions = ev.filter((e) => CONVERSIONS.includes(e.name)).length
  return { homeViews, ctaClicks, conversions, rate: homeViews ? (conversions / homeViews) * 100 : 0 }
}

/**
 * Team view of the A/B message test from the launch plan. Reads events recorded in THIS browser,
 * so it is a demo of the funnel, not real traffic. Live numbers come from Plausible when configured.
 */
export function InsightsPage() {
  useDocumentTitle('Launch insights')
  const [events, setEvents] = useState(getEvents)
  const [current] = useState(getVariant)
  const rows = (['a', 'b'] as Variant[]).map((v) => ({ v, ...summarise(events, v) }))
  const sources = Object.entries(
    events.filter((e) => e.name === 'page_view').reduce<Record<string, number>>((acc, e) => {
      acc[e.source ?? 'direct'] = (acc[e.source ?? 'direct'] ?? 0) + 1
      return acc
    }, {}),
  ).sort((a, b) => b[1] - a[1])

  return (
    <>
      <PageHero
        eyebrow="For the NightNest team"
        title="A/B message test"
        intro="Do students respond more to better sleep or to better study results? Each visitor sees one homepage headline; this page compares the funnel."
      />
      <section className="container-page pb-20">
        <div className="rounded-2xl bg-moon-soft p-5 text-[15px] ring-1 ring-moon/60">
          <strong>Local demo data.</strong> These numbers come only from events recorded in this browser, so they show how
          the funnel works rather than real traffic.{' '}
          {config.plausibleDomain
            ? `Live, aggregated results are in Plausible for ${config.plausibleDomain} (events carry a "variant" property).`
            : 'Set VITE_PLAUSIBLE_DOMAIN to collect real, aggregated results.'}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rows.map((r) => (
            <article key={r.v} className={`card border-t-4 p-6 ${r.v === 'a' ? 'border-lavender' : 'border-moon'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`font-display text-4xl font-bold ${r.v === 'a' ? 'text-lavender-deep' : 'text-[#b38415]'}`}>{variantCopy[r.v].label}</p>
                  <h2 className="mt-2 text-xl font-semibold">&ldquo;{variantCopy[r.v].headline}&rdquo;</h2>
                  <p className="text-sm text-muted">{variantCopy[r.v].focus}</p>
                </div>
                {current === r.v && <span className="rounded-full bg-midnight px-3 py-1 text-xs font-semibold text-moon">You see this</span>}
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['Home visits', r.homeViews],
                  ['CTA clicks', r.ctaClicks],
                  ['Sign-ups', r.conversions],
                  ['Conversion', `${r.rate.toFixed(0)}%`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-cream p-3">
                    <dt className="text-xs text-muted">{label}</dt>
                    <dd className="mt-1 font-display text-xl font-bold tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
              <a href={`/?v=${r.v}`} className="mt-5 inline-block text-sm font-semibold text-lavender-deep underline-offset-2 hover:underline">
                Preview variant {variantCopy[r.v].label} &rarr;
              </a>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Traffic sources</h2>
            <p className="text-sm text-muted">From utm_source on the landing URL</p>
            {sources.length ? (
              <ul className="mt-4 space-y-2">
                {sources.map(([s, n]) => (
                  <li key={s} className="flex justify-between rounded-lg bg-cream px-3 py-2 text-sm"><span>{s}</span><strong className="tabular-nums">{n}</strong></li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted">No visits recorded yet.</p>
            )}
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold">How to run the test</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] text-ink/80">
              <li>Link social posts with UTM tags, e.g. <code className="rounded bg-cream px-1.5 py-0.5 text-sm">/?utm_source=instagram&amp;utm_campaign=exam-season</code>.</li>
              <li>Keep the offer, audience and posting times as similar as possible between A and B.</li>
              <li>Compare enquiries divided by homepage sessions for each variant, and report sample sizes and limitations.</li>
            </ol>
            <Button
              variant="secondary"
              size="sm"
              className="mt-5"
              onClick={() => {
                clearEvents()
                setEvents([])
              }}
            >
              <RotateCcw aria-hidden className="size-4" /> Reset local data
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
