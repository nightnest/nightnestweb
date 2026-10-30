import { Gift, Loader2, Minus, Plus, ShieldCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { buttonClasses } from '../components/ui/Button'
import { describedBy, FormField } from '../components/ui/FormField'
import { FormResult } from '../components/ui/FormResult'
import { offers, type Offer } from '../data/products'
import { site } from '../data/site'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getUtmSource, track } from '../lib/analytics'
import { getVariant } from '../lib/experiment'
import { submitForm, type SubmissionResult } from '../lib/forms'
import { isAcUkEmail, isEmail, type Errors } from '../lib/validation'

type Role = 'student' | 'traveller' | 'parent' | 'other'

interface FormState {
  name: string
  email: string
  role: Role
  university: string
  kits: number
  extras: Offer['id'][]
  isGift: boolean
  message: string
  consent: boolean
}

const roles: { value: Role; label: string }[] = [
  { value: 'student', label: 'A student in halls or a shared flat' },
  { value: 'traveller', label: 'A traveller or commuter' },
  { value: 'parent', label: 'A parent or family member buying a gift' },
  { value: 'other', label: 'Something else' },
]

const extraOffers = offers.filter((o) => o.id !== 'rest-kit')
const MAX_KITS = 5

const initial: FormState = {
  name: '',
  email: '',
  role: 'student',
  university: '',
  kits: 1,
  extras: [],
  isGift: false,
  message: '',
  consent: false,
}

function validate(f: FormState): Errors<FormState> {
  const e: Errors<FormState> = {}
  if (f.name.trim().length < 2) e.name = 'Please tell us your name.'
  if (!isEmail(f.email)) e.email = 'Enter a valid email address, e.g. name@example.com'
  if (f.kits === 0 && f.extras.length === 0) e.kits = 'Choose at least one kit or item you are interested in.'
  if (!f.consent) e.consent = 'Please confirm we can email you about the launch.'
  return e
}

export function RegisterInterestPage() {
  useDocumentTitle('Register interest', 'Register interest in the NightNest Student Rest Kit. No payment taken; we will email you when the first batch is ready.')
  const [form, setForm] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Errors<FormState>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleExtra = (id: Offer['id']) =>
    set('extras', form.extras.includes(id) ? form.extras.filter((x) => x !== id) : [...form.extras, id])

  const discountEligible = isAcUkEmail(form.email)
  const { min, max } = site.targetPrice

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0]
      document.getElementById(`interest-${first}`)?.focus()
      return
    }
    setSubmitting(true)
    const res = await submitForm('interest', {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      studentDiscountEligible: discountEligible,
      variant: getVariant(),
      source: getUtmSource(),
    })
    setSubmitting(false)
    setResult(res)
    if (res.ok) track('interest_submitted', form.role)
  }

  if (result?.ok) {
    return (
      <section className="container-page max-w-2xl py-20">
        <FormResult result={result} successTitle={`Thanks, ${form.name.trim().split(' ')[0]}. You’re on the list.`}>
          <p>
            We&rsquo;ll email <strong>{form.email.trim()}</strong> when the first batch is ready, with the confirmed price
            {discountEligible ? ' and your student discount' : ''}. No payment has been taken.
          </p>
        </FormResult>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/planner" className={buttonClasses('primary')}>Try the free planner</Link>
          <Link to="/guides" className={buttonClasses('secondary')}>Read the sleep guides</Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHero
        eyebrow="Order or express interest"
        title="Register interest in the first batch"
        intro="NightNest is pre-launch. Tell us what you'd like and we'll contact you when the Student Rest Kit is ready. No payment is taken and there's no commitment."
      />
      <section className="container-page pb-20">
        <form noValidate onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="card space-y-6 p-6 sm:p-8">
            <fieldset className="space-y-5">
              <legend className="font-display text-xl font-semibold">About you</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="interest-name" label="Your name" error={errors.name}>
                  <input id="interest-name" className="field" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('interest-name', errors.name)} />
                </FormField>
                <FormField id="interest-email" label="Email" error={errors.email} hint="Use your .ac.uk address to qualify for the student discount.">
                  <input id="interest-email" type="email" autoComplete="email" className="field" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'interest-email-error' : 'interest-email-hint'} />
                </FormField>
              </div>
              <FormField id="interest-role" label="I am">
                <select id="interest-role" className="field" value={form.role} onChange={(e) => set('role', e.target.value as Role)}>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </FormField>
              {(form.role === 'student' || form.role === 'parent') && (
                <FormField id="interest-university" label={form.role === 'parent' ? 'Which university are they going to?' : 'Your university'} optional>
                  <input id="interest-university" className="field" value={form.university} onChange={(e) => set('university', e.target.value)} />
                </FormField>
              )}
            </fieldset>

            <fieldset className="space-y-4 pt-4">
              <legend className="font-display text-xl font-semibold">What you&rsquo;re interested in</legend>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cream p-4">
                <div>
                  <p id="interest-kits-label" className="font-semibold">Student Rest Kit</p>
                  <p className="text-sm text-muted">Mask, earplug case, pouch and printed planner</p>
                </div>
                <div className="flex items-center gap-2" role="group" aria-labelledby="interest-kits-label">
                  <button type="button" onClick={() => set('kits', Math.max(0, form.kits - 1))} disabled={form.kits === 0} aria-label="One fewer kit" className="flex size-10 items-center justify-center rounded-full bg-white shadow-card disabled:opacity-40">
                    <Minus aria-hidden className="size-4" />
                  </button>
                  <output id="interest-kits" tabIndex={-1} aria-live="polite" className="w-8 text-center font-display text-xl font-bold tabular-nums">{form.kits}</output>
                  <button type="button" onClick={() => set('kits', Math.min(MAX_KITS, form.kits + 1))} disabled={form.kits === MAX_KITS} aria-label="One more kit" className="flex size-10 items-center justify-center rounded-full bg-white shadow-card disabled:opacity-40">
                    <Plus aria-hidden className="size-4" />
                  </button>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {extraOffers.map((o) => {
                  const checked = form.extras.includes(o.id)
                  return (
                    <label key={o.id} className={`flex cursor-pointer flex-col rounded-2xl p-4 ring-1 transition-colors ${checked ? 'bg-lavender-soft ring-lavender-deep' : 'ring-line hover:bg-cream'}`}>
                      <span className="flex items-start justify-between gap-2">
                        <span className="font-semibold">{o.name}</span>
                        <input type="checkbox" className="mt-1 size-4 accent-midnight" checked={checked} onChange={() => toggleExtra(o.id)} />
                      </span>
                      <span className="mt-1 text-sm text-muted">{o.priceLabel}</span>
                    </label>
                  )
                })}
              </div>
              {errors.kits && <p role="alert" className="text-[13px] font-medium text-danger">{errors.kits}</p>}
              <label className="flex items-center gap-3 rounded-2xl p-1 text-[15px]">
                <input type="checkbox" className="size-4 accent-midnight" checked={form.isGift} onChange={(e) => set('isGift', e.target.checked)} />
                <Gift aria-hidden className="size-4 text-lavender-deep" /> This is a gift
              </label>
            </fieldset>

            <div className="border-t border-line pt-6">
              <FormField id="interest-message" label="Anything you'd like us to know?" optional hint="E.g. what keeps you awake in halls, or what you'd want from the planner.">
                <textarea id="interest-message" rows={4} maxLength={1000} className="field resize-y" value={form.message} onChange={(e) => set('message', e.target.value)} aria-describedby="interest-message-hint" />
              </FormField>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-midnight p-6 text-white shadow-lift on-dark sm:p-8">
              <h2 className="text-xl font-semibold">Your interest</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {form.kits > 0 && (
                  <li className="flex justify-between gap-4">
                    <span>{form.kits} &times; Student Rest Kit</span>
                    <span className="font-semibold text-moon">&pound;{form.kits * min}&ndash;{form.kits * max}</span>
                  </li>
                )}
                {form.extras.map((id) => {
                  const o = offers.find((x) => x.id === id)!
                  return (
                    <li key={id} className="flex justify-between gap-4 text-white/80">
                      <span>{o.name}</span>
                      <span>TBC</span>
                    </li>
                  )
                })}
                {form.kits === 0 && form.extras.length === 0 && <li className="text-white/60">Nothing selected yet.</li>}
              </ul>
              <div className="mt-5 border-t border-white/15 pt-5 text-sm text-white/70">
                {discountEligible ? (
                  <p className="flex items-center gap-2 text-moon">
                    <ShieldCheck aria-hidden className="size-4" /> .ac.uk email: student discount applies at launch
                  </p>
                ) : (
                  <p>Student discount available with a .ac.uk email.</p>
                )}
              </div>
              <label className="mt-6 flex items-start gap-3 text-sm text-white/85">
                <input id="interest-consent" type="checkbox" className="mt-0.5 size-4 accent-[#F4D58D]" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={Boolean(errors.consent)} />
                <span>
                  Email me about the NightNest launch. See the{' '}
                  <Link to="/privacy" className="underline underline-offset-2">privacy notice</Link>.
                </span>
              </label>
              {errors.consent && <p role="alert" className="mt-2 text-[13px] font-medium text-[#ffb4a8]">{errors.consent}</p>}
              <button type="submit" disabled={submitting} className={buttonClasses('moon', 'lg', 'mt-6 w-full')}>
                {submitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
                {submitting ? 'Sending…' : 'Register interest'}
              </button>
            </div>
            {result && !result.ok && (
              <div className="mt-4">
                <FormResult result={result} successTitle="" />
              </div>
            )}
          </aside>
        </form>
      </section>
    </>
  )
}
