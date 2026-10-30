import { Clock, HelpCircle, Loader2, Mail, Package } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { buttonClasses } from '../components/ui/Button'
import { describedBy, FormField } from '../components/ui/FormField'
import { FormResult } from '../components/ui/FormResult'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { track } from '../lib/analytics'
import { config } from '../lib/config'
import { submitForm, type SubmissionResult } from '../lib/forms'
import { isEmail, type Errors } from '../lib/validation'

const topics = ['General question', 'The Rest Kit', 'The planner', 'Gifting', 'Bulk or university orders', 'Press or partnerships'] as const

interface ContactForm {
  name: string
  email: string
  topic: string
  message: string
}

const MAX_MESSAGE = 1500

export function ContactPage() {
  useDocumentTitle('Contact', 'Send NightNest an enquiry about the Student Rest Kit, the planner or gifting.')
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', topic: topics[0], message: '' })
  const [errors, setErrors] = useState<Errors<ContactForm>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)
  // Honeypot: real visitors never see or fill this field.
  const [website, setWebsite] = useState('')

  const set = (key: keyof ContactForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Errors<ContactForm> = {}
    if (form.name.trim().length < 2) next.name = 'Please tell us your name.'
    if (!isEmail(form.email)) next.email = 'Enter a valid email address so we can reply.'
    if (form.message.trim().length < 10) next.message = 'Please write a little more (at least 10 characters).'
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      document.getElementById(`contact-${first}`)?.focus()
      return
    }
    if (website) return
    setSubmitting(true)
    const res = await submitForm('enquiry', { ...form, name: form.name.trim(), email: form.email.trim(), message: form.message.trim() })
    setSubmitting(false)
    setResult(res)
    if (res.ok) track('enquiry_submitted', form.topic)
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Send us an enquiry" intro="Questions about the kit, the planner, gifting or bulk orders for halls and universities. We read every message." />
      <section className="container-page grid gap-10 pb-20 lg:grid-cols-[1fr_1.6fr]">
        <aside className="space-y-4">
          {[
            { icon: Clock, title: 'Reply time', body: 'We aim to reply within two working days.' },
            { icon: HelpCircle, title: 'Quick answers', body: <>Pricing, launch and the planner are covered in the <Link to="/faq" className="font-semibold text-lavender-deep underline-offset-2 hover:underline">FAQs</Link>.</> },
            { icon: Package, title: 'Want the kit?', body: <><Link to="/register-interest" className="font-semibold text-lavender-deep underline-offset-2 hover:underline">Register interest</Link> to hear first when the batch is ready.</> },
          ].map((c) => (
            <div key={c.title} className="card flex gap-4 p-5">
              <c.icon aria-hidden className="size-6 shrink-0 text-lavender-deep" />
              <div>
                <h2 className="font-sans font-semibold">{c.title}</h2>
                <p className="mt-1 text-[15px] text-muted">{c.body}</p>
              </div>
            </div>
          ))}
          {config.contactEmail && (
            <a href={`mailto:${config.contactEmail}`} className="card flex items-center gap-4 p-5 hover:shadow-lift">
              <Mail aria-hidden className="size-6 text-lavender-deep" />
              <span className="font-semibold">{config.contactEmail}</span>
            </a>
          )}
        </aside>
        <div>
          {result?.ok ? (
            <FormResult result={result} successTitle="Thanks, your enquiry has been received.">
              <p>We&rsquo;ll reply to <strong>{form.email.trim()}</strong>.</p>
              <button type="button" className="mt-4 text-sm font-semibold text-lavender-deep underline-offset-2 hover:underline" onClick={() => { setResult(null); setForm({ name: '', email: '', topic: topics[0], message: '' }) }}>
                Send another enquiry
              </button>
            </FormResult>
          ) : (
            <form noValidate onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="contact-name" label="Name" error={errors.name}>
                  <input id="contact-name" className="field" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('contact-name', errors.name)} />
                </FormField>
                <FormField id="contact-email" label="Email" error={errors.email}>
                  <input id="contact-email" type="email" autoComplete="email" className="field" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('contact-email', errors.email)} />
                </FormField>
              </div>
              <FormField id="contact-topic" label="Topic">
                <select id="contact-topic" className="field" value={form.topic} onChange={(e) => set('topic', e.target.value)}>
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </FormField>
              <FormField id="contact-message" label="Message" error={errors.message}>
                <textarea id="contact-message" rows={6} maxLength={MAX_MESSAGE} className="field resize-y" value={form.message} onChange={(e) => set('message', e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={`contact-message-count${errors.message ? ' contact-message-error' : ''}`} />
              </FormField>
              <p id="contact-message-count" className="-mt-3 text-right text-xs text-muted">{form.message.length}/{MAX_MESSAGE}</p>
              <div aria-hidden className="absolute -left-[9999px]">
                <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
              </div>
              {result && !result.ok && <FormResult result={result} successTitle="" />}
              <button type="submit" disabled={submitting} className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
                {submitting && <Loader2 aria-hidden className="size-4 animate-spin" />}
                {submitting ? 'Sending…' : 'Send enquiry'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
