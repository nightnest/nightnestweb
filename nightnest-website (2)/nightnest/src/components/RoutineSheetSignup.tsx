import { FileText, Loader2, Printer } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { track } from '../lib/analytics'
import { submitForm, type SubmissionResult } from '../lib/forms'
import { readStore, writeStore } from '../lib/storage'
import { isEmail } from '../lib/validation'
import { buttonClasses } from './ui/Button'
import { describedBy } from './ui/FormField'
import { Link } from 'react-router-dom'

const UNLOCK_KEY = 'routine-sheet:unlocked'

/**
 * The free printable sleep-routine sheet: a useful first step for visitors that also builds the
 * email list, as described in the NightNest website plan.
 */
export function RoutineSheetSignup({ compact = false, onUnlock }: { compact?: boolean; onUnlock?: () => void }) {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; consent?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)
  const [unlocked, setUnlocked] = useState(() => readStore(UNLOCK_KEY, false))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (!isEmail(email)) next.email = 'Enter a valid email address, e.g. name@example.com'
    if (!consent) next.consent = 'Please confirm you are happy to receive the sheet and occasional NightNest emails.'
    setErrors(next)
    if (Object.keys(next).length) return

    setSubmitting(true)
    const res = await submitForm('routine-sheet', { email: email.trim(), consent })
    setSubmitting(false)
    setResult(res)
    if (res.ok) {
      writeStore(UNLOCK_KEY, true)
      setUnlocked(true)
      track('routine_sheet_signup')
      onUnlock?.()
    }
  }

  return (
    <div className={`overflow-hidden rounded-3xl bg-moon-soft ring-1 ring-moon/60 ${compact ? 'p-6 sm:p-8' : 'p-8 sm:p-12'}`}>
      <div className={`grid gap-8 ${compact ? '' : 'lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14'}`}>
        <div>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-midnight text-moon">
            <FileText aria-hidden className="size-6" />
          </span>
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Free printable sleep-routine sheet</h2>
          <p className="mt-3 leading-relaxed text-ink/75">
            A one-page wind-down routine and bedtime checklist for halls and exam weeks. Pin it above your desk and start
            tonight, before the kit even arrives.
          </p>
        </div>

        {unlocked ? (
          <div role="status" className="rounded-2xl bg-white p-6 shadow-card">
            <p className="font-display text-lg font-semibold">Your sheet is ready.</p>
            <p className="mt-1 text-[15px] text-muted">Open it and use your browser&rsquo;s print dialog to print or save as PDF.</p>
            {result?.ok && result.mode === 'local' && (
              <p className="mt-2 text-[13px] text-muted">
                Demo mode: your email was saved in this browser only, not sent to NightNest.
              </p>
            )}
            <Link to="/routine-sheet" className={buttonClasses('primary', 'md', 'mt-5')}>
              <Printer aria-hidden className="size-4" /> Open the routine sheet
            </Link>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="rounded-2xl bg-white p-6 shadow-card">
            <label htmlFor="routine-email" className="field-label">
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="routine-email"
                type="email"
                autoComplete="email"
                className="field"
                placeholder="you@example.ac.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy('routine-email', errors.email)}
              />
              <button type="submit" disabled={submitting} className={buttonClasses('primary', 'md', 'shrink-0')}>
                {submitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
                {submitting ? 'Sending…' : 'Get the sheet'}
              </button>
            </div>
            {errors.email && (
              <p id="routine-email-error" role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
                {errors.email}
              </p>
            )}
            <label className="mt-4 flex items-start gap-3 text-sm text-ink/80">
              <input
                type="checkbox"
                className="mt-0.5 size-4 accent-midnight"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-invalid={Boolean(errors.consent)}
              />
              <span>
                Send me the sheet and occasional NightNest updates. Unsubscribe any time. See our{' '}
                <Link to="/privacy" className="font-medium underline underline-offset-2">
                  privacy notice
                </Link>
                .
              </span>
            </label>
            {errors.consent && (
              <p role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
                {errors.consent}
              </p>
            )}
            {result && !result.ok && (
              <p role="alert" className="mt-3 text-sm font-medium text-danger">
                {result.error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
