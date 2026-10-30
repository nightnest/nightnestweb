import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Guide } from '../data/guides'
import { GuideArt } from './illustrations/GuideArt'
import { Badge } from './ui/Badge'

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="overflow-hidden">
        <GuideArt guide={guide} className="block aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-sm text-muted">
          <Badge>{guide.tag}</Badge>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden className="size-3.5" /> {guide.readMinutes} min read
          </span>
        </div>
        <h3 className="mt-4 text-xl leading-snug font-semibold">
          <Link to={`/guides/${guide.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {guide.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{guide.excerpt}</p>
        <span className="mt-auto pt-5 text-sm font-semibold text-lavender-deep group-hover:underline">Read guide &rarr;</span>
      </div>
    </article>
  )
}
