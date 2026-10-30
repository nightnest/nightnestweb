import { kitItems } from '../../data/products'
import { KitItemArt } from '../illustrations/KitShapes'
import { Reveal } from '../ui/Reveal'

/** The four-item kit as cards. Used on the homepage and the kit page. */
export function KitGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {kitItems.map((item, i) => (
        <Reveal as="li" key={item.id} delay={i * 80} className="h-full">
          <article
            id={detailed ? item.id : undefined}
            className="group card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="font-display text-lg font-semibold text-lavender-deep/80">{item.number}</span>
            <div className="my-3 rounded-xl bg-cream transition-colors group-hover:bg-lavender-soft/70">
              <KitItemArt id={item.id} title={`The NightNest ${item.name.toLowerCase()}`} className="w-full" />
            </div>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.summary}</p>
            {detailed && (
              <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[14px] text-ink/80">
                {item.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-moon" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </ul>
  )
}
