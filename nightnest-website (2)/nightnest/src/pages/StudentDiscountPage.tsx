import { BadgePercent, GraduationCap, Loader2, Mail, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { PageHero } from '../components/PageHero'
import { buttonClasses, LinkButton } from '../components/ui/Button'
import { describedBy, FormField } from '../components/ui/FormField'
import { FormResult } from '../components/ui/FormResult'
import { Reveal } from '../components/ui/Reveal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { track } from '../lib/analytics'
import { submitForm, type SubmissionResult } from '../lib/forms'
import { isAcUkEmail, isEmail } from '../lib/validation'

const steps = [
  { icon: Mail, title: 'Join with your .ac.uk email', body: 'Any UK university address ending in .ac.uk qualifies.' },
  { icon: ShieldCheck, title: 'We confirm it’s you', body: 'At launch we send a one-time code to that address to verify it.' },
  { icon: BadgePercent, title: 'Discount at checkout', body: 'Use the code on your Rest Kit. The amount is confirmed with the launch price.' },
]

export function StudentDiscountPage() {
  useDocumentTitle('Student discount', 'NightNest student discount for UK university students with a .ac.uk email address.')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [year, setYear] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = 'Please tell us your name.'
    if (!isEmail(email)) next.email = 'Enter a valid email address.'
    else if (!isAcUkEmail(email)) next.email = 'The student discount needs a UK university email ending in .ac.uk.'
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitting(true)
    const res = await submitForm('student-discount', { name: name.trim(), email: email.trim(), year })
    setSubmitting(false)
    setResult(res)
    if (res.ok) track('discount_signup')
  }

  return (
    <>
      <PageHero
        dark
        eyebrow="Student discount"
        title="A student price for a student kit."
        intro="Bundle-first pricing is already aimed at student budgets, at about £16–18 per Rest Kit. Students with a .ac.uk email get an extra discount on top."
      />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:py-24">
        <div>
          <h2 className="text-3xl font-bold">How it works</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-midnight text-moon">
                  <s.icon aria-hidden className="size-6" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 rounded-2xl bg-lavender-soft p-6">
            <h3 className="flex items-center gap-2 font-semibold"><GraduationCap aria-hidden className="size-5 text-lavender-deep" /> Not using a .ac.uk address?</h3>
            <p className="mt-2 text-[15px] text-ink/80">
              You can still register interest with any email. You won&rsquo;t get the student code automatically, but you
              can contact us at launch if you&rsquo;re a student at a university without .ac.uk addresses.
            </p>
            <LinkButton to="/register-interest" variant="secondary" size="sm" className="mt-4">Register interest instead</LinkButton>
          </div>
        </div>
        <div>
          {result?.ok ? (
            <FormResult result={result} successTitle="You're on the student list.">
              <p>At launch we&rsquo;ll send a verification code to <strong>{email.trim()}</strong>, along with your discount.</p>
            </FormResult>
          ) : (
            <form noValidate onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Join the student list</h2>
              <FormField id="sd-name" label="Your name" error={errors.name}>
                <input id="sd-name" className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('sd-name', errors.name)} />
              </FormField>
              <FormField id="sd-email" label="University email" error={errors.email} hint="Must end in .ac.uk, e.g. j.smith@student.uni.ac.uk">
                <input id="sd-email" type="email" autoComplete="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('sd-email', errors.email, 'hint')} />
              </FormField>
              {email && isAcUkEmail(email) && !errors.email && (
                <p className="flex items-center gap-2 text-sm font-medium text-success"><ShieldCheck aria-hidden className="size-4" /> Looks like a university address.</p>
              )}
              <FormField id="sd-year" label="Year of study" optional>
                <select id="sd-year" className="field" value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Prefer not to say</option>
                  <option>Starting this September</option>
                  <option>First year</option>
                  <option>Second year</option>
                  <option>Third year or above</option>
                  <option>Postgraduate</option>
                </select>
              </FormField>
              {result && !result.ok && <FormResult result={result} successTitle="" />}
              <button type="submit" disabled={submitting} className={buttonClasses('primary', 'lg', 'w-full')}>
                {submitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
                {submitting ? 'Joining…' : 'Join the student list'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
