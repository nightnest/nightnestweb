import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { GuideCard } from '../components/GuideCard'
import { PageHero } from '../components/PageHero'
import { RoutineSheetSignup } from '../components/RoutineSheetSignup'
import { Button } from '../components/ui/Button'
import { guides, guideTags, type GuideTag } from '../data/guides'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function GuidesPage() {
  useDocumentTitle('Sleep guides', 'How to sleep in halls, exam-week routines and freshers’ week tips for students.')
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<GuideTag | 'All'>('All')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return guides.filter(
      (g) =>
        (tag === 'All' || g.tag === tag) &&
        (!q || `${g.title} ${g.excerpt} ${g.tag}`.toLowerCase().includes(q)),
    )
  }, [query, tag])

  return (
    <>
      <PageHero eyebrow="Sleep guides" title="Rest well in shared spaces." intro="Practical guides for halls, shared flats and exam seasons. Written for students, free to read." />
      <section className="container-page pb-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {(['All', ...guideTags] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tag === t ? 'bg-midnight text-white' : 'bg-white text-ink/75 shadow-card hover:bg-lavender-soft'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative md:w-80">
            <label htmlFor="guide-search" className="sr-only">Search guides</label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input id="guide-search" type="search" placeholder="Search guides" className="field !pl-11" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
        <p className="mt-6 text-sm text-muted" aria-live="polite">{results.length} guide{results.length === 1 ? '' : 's'}</p>
        {results.length ? (
          <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((g) => <GuideCard key={g.slug} guide={g} />)}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border-2 border-dashed border-line p-12 text-center">
            <p className="font-semibold">No guides match &ldquo;{query}&rdquo;.</p>
            <Button variant="secondary" size="sm" className="mt-4" onClick={() => { setQuery(''); setTag('All') }}>Clear filters</Button>
          </div>
        )}
      </section>
      <section className="container-page pb-20">
        <RoutineSheetSignup />
      </section>
    </>
  )
}
