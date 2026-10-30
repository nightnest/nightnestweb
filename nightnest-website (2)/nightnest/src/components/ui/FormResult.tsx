import { AlertCircle, CheckCircle2 } from 'lucide-react'
import type { ReactNode } from 'react'
import type { SubmissionResult } from '../../lib/forms'

/** Success or error panel shown after a form submits. Says plainly when data stayed local. */
export function FormResult({ result, successTitle, children }: { result: SubmissionResult; successTitle: string; children?: ReactNode }) {
  if (!result.ok) {
    return (
      <div role="alert" className="flex gap-3 rounded-xl bg-danger/8 p-4 text-sm text-danger ring-1 ring-danger/20">
        <AlertCircle aria-hidden className="size-5 shrink-0" />
        <p>{result.error ?? 'Something went wrong. Please try again.'}</p>
      </div>
    )
  }
  return (
    <div role="status" className="rounded-2xl bg-success/8 p-6 ring-1 ring-success/20">
      <div className="flex items-start gap-3">
        <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-success" />
        <div>
          <p className="font-display text-lg font-semibold text-ink">{successTitle}</p>
          {children && <div className="mt-1 text-[15px] leading-relaxed text-muted">{children}</div>}
          {result.mode === 'local' && (
            <p className="mt-3 text-[13px] text-muted">
              Demo mode: no form endpoint is configured, so this was saved only in your browser and has not been sent to
              NightNest.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
