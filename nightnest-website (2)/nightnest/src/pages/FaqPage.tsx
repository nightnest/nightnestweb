import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { Accordion } from '../components/ui/Accordion'
import { Button, LinkButton } from '../components/ui/Button'
import { faqCategories, faqs, type FaqCategory } from '../data/faqs'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function FaqPage() {
  useDocumentTitle('FAQs', 'Answers about the NightNest Student Rest Kit, the planner, pricing, launch and the student discount.')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<FaqCategory | 'All'>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqs.filter((f) => (category === 'All' || f.category === category) && (!q || `${f.q} ${f.a}`.toLowerCase().includes(q)))
  }, [query, category])

  const grouped = faqCategories
    .map((c) => ({ category: c, items: filtered.filter((f) => f.category === c) }))
    .filter((g) => g.items.length)

  return (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions" intro="Everything about the kit, the planner and what pre-launch means." />
      <section className="container-page grid gap-10 pb-20 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input id="faq-search" type="search" placeholder="Search questions" className="field !pl-11" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 lg:flex-col" role="group" aria-label="Filter by category">
            {(['All', ...faqCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-left text-sm font-semibold transition-colors lg:rounded-xl ${category === c ? 'bg-midnight text-white' : 'bg-white text-ink/75 shadow-card hover:bg-lavender-soft'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </aside>
        <div>
          <p className="sr-only" aria-live="polite">{filtered.length} questions shown</p>
          {grouped.length ? (
            <div className="space-y-10">
              {grouped.map((g) => (
                <div key={g.category}>
                  <h2 className="mb-4 text-xl font-semibold">{g.category}</h2>
                  <Accordion items={g.items.map((f, i) => ({ id: `${g.category}-${i}`.replace(/\W+/g, '-'), title: f.q, content: f.a }))} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-line p-12 text-center">
              <p className="font-semibold">No questions match your search.</p>
              <Button variant="secondary" size="sm" className="mt-4" onClick={() => { setQuery(''); setCategory('All') }}>Clear search</Button>
            </div>
          )}
          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-lavender-soft p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold">Still have a question?</p>
              <p className="mt-1 text-muted">Send us an enquiry and we&rsquo;ll get back to you.</p>
            </div>
            <LinkButton to="/contact">Contact us</LinkButton>
          </div>
        </div>
      </section>
    </>
  )
}
