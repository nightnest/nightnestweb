import { ArrowLeft, Clock, Lightbulb } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { GuideCard } from '../components/GuideCard'
import { GuideArt } from '../components/illustrations/GuideArt'
import { Badge } from '../components/ui/Badge'
import { LinkButton } from '../components/ui/Button'
import { guides, type GuideBlock } from '../data/guides'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NotFoundPage } from './NotFoundPage'

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>
    case 'h2':
      return <h2>{block.text}</h2>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'ul':
      return <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>
    case 'ol':
      return <ol>{block.items.map((i) => <li key={i}>{i}</li>)}</ol>
    case 'tip':
      return (
        <aside className="my-8 flex gap-4 rounded-2xl bg-moon-soft p-5 ring-1 ring-moon/60">
          <Lightbulb aria-hidden className="size-6 shrink-0 text-[#9a6b0c]" />
          <p className="!mb-0 text-ink/85"><strong>NightNest tip: </strong>{block.text}</p>
        </aside>
      )
  }
}

export function GuidePage() {
  const { slug } = useParams()
  const guide = guides.find((g) => g.slug === slug)
  useDocumentTitle(guide?.title ?? 'Guide not found', guide?.excerpt)
  if (!guide) return <NotFoundPage />
  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3)

  return (
    <>
      <article>
        <header className="container-page max-w-4xl pt-10 lg:pt-14">
          <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-lavender-deep hover:underline">
            <ArrowLeft aria-hidden className="size-4" /> All guides
          </Link>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted">
            <Badge>{guide.tag}</Badge>
            <span className="inline-flex items-center gap-1"><Clock aria-hidden className="size-3.5" /> {guide.readMinutes} min read</span>
          </div>
          <h1 className="mt-4 text-4xl leading-tight font-bold sm:text-5xl">{guide.title}</h1>
          <p className="mt-4 text-xl leading-relaxed text-muted">{guide.excerpt}</p>
          <GuideArt guide={guide} className="mt-10 block aspect-[16/9] w-full overflow-hidden rounded-[28px] shadow-lift" />
        </header>
        <div className="container-page prose-nn max-w-3xl py-12 text-[17px]">
          {guide.body.map((b, i) => <Block key={i} block={b} />)}
        </div>
      </article>
      <section className="container-page max-w-3xl pb-16">
        <div className="flex flex-col items-start gap-4 rounded-3xl bg-midnight p-8 text-white on-dark sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">Put it into practice tonight</p>
            <p className="mt-1 text-white/70">Plan bedtime and study blocks in the free planner.</p>
          </div>
          <LinkButton to="/planner" variant="moon" trackLabel={`guide_${guide.slug}_planner`}>Open the planner</LinkButton>
        </div>
      </section>
      <section className="container-page pb-20" aria-label="More guides">
        <h2 className="text-2xl font-bold">More guides</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {related.map((g) => <GuideCard key={g.slug} guide={g} />)}
        </div>
      </section>
    </>
  )
}
