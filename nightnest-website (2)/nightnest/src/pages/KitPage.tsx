import { ArrowRight, BadgePercent, Download, Gift, Package, Plus, Truck } from 'lucide-react'
import { FinalCta } from '../components/home/FinalCta'
import { KitGrid } from '../components/home/KitGrid'
import { KitFlatLay } from '../components/illustrations/Scenes'
import { PageHero } from '../components/PageHero'
import { Badge } from '../components/ui/Badge'
import { LinkButton } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { kitItems, offers } from '../data/products'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const offerIcons = { 'rest-kit': Package, 'digital-planner': Download, 'extra-pouch': Plus, 'planner-refill': Plus } as const

const details = [
  { icon: BadgePercent, title: 'Student discount', body: 'Planned for students with a .ac.uk email. Amount confirmed with the launch price.' },
  { icon: Truck, title: 'Online-only delivery', body: 'Sold through this website. Delivery options and costs confirmed at launch.' },
  { icon: Gift, title: 'Ready to give', body: 'The pouch packages the kit as a present for students starting university.' },
]

export function KitPage() {
  useDocumentTitle('The Student Rest Kit', 'Sleep mask, earplug case, accessory pouch and sleep-and-study planner in one bundle. £16–18 with a student discount.')
  return (
    <>
      <PageHero
        eyebrow="The Student Rest Kit"
        title="Every sleep essential in one pouch, plus a planner for the study week."
        intro="Four items designed around halls, shared flats and exam weeks. Bundle-first, so you don't have to piece a routine together from separate products."
        art={
          <KitFlatLay
            className="w-full overflow-hidden rounded-[28px] shadow-lift"
            title="The four kit items: sleep mask, planner, accessory pouch and earplug case"
          />
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="rounded-2xl bg-white px-5 py-3 shadow-card">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Price</p>
            <p className="font-display text-2xl font-bold">
              &pound;16&ndash;18 <span className="text-sm font-medium text-muted">per kit</span>
            </p>
          </div>
          <LinkButton to="/register-interest" size="lg" trackLabel="kit_register">
            Register interest <ArrowRight aria-hidden className="size-4" />
          </LinkButton>
        </div>
      </PageHero>

      <section className="py-20 lg:py-24" aria-label="What's in the kit">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="What's inside" title="Four items, one routine." />
          </Reveal>
          <nav aria-label="Kit items" className="mt-6 flex flex-wrap gap-2">
            {kitItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow-card hover:bg-lavender-soft">
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mt-10">
            <KitGrid detailed />
          </div>
        </div>
      </section>

      <section className="bg-white/60 py-20 lg:py-24" aria-label="Problems each item solves">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Built for shared accommodation" title="What each item is for" />
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-card">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Kit items and the problems they help with</caption>
              <thead className="bg-midnight text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold sm:px-7">Item</th>
                  <th scope="col" className="px-5 py-4 font-semibold sm:px-7">Helps with</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {kitItems.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-cream/60">
                    <th scope="row" className="px-5 py-4 font-semibold whitespace-nowrap sm:px-7">{item.name}</th>
                    <td className="px-5 py-4 text-muted sm:px-7">{item.helpsWith}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24" aria-label="Ways to buy">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Ways to buy at launch"
              title="The bundle first, with a low-cost way in."
              intro="Rest Kit bundles are the core product. A printable planner gives a low-cost starting point, and add-ons let you top up."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((o, i) => {
              const Icon = offerIcons[o.id]
              const featured = o.id === 'rest-kit'
              return (
                <Reveal key={o.id} delay={i * 80}>
                  <article className={`flex h-full flex-col rounded-2xl p-6 ${featured ? 'bg-midnight text-white shadow-lift on-dark' : 'card'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`flex size-11 items-center justify-center rounded-xl ${featured ? 'bg-moon text-midnight' : 'bg-lavender-soft text-lavender-deep'}`}>
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <Badge tone={featured ? 'outline' : 'lavender'} className="capitalize">{o.type}</Badge>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{o.name}</h3>
                    <p className={`mt-2 flex-1 text-sm leading-relaxed ${featured ? 'text-white/70' : 'text-muted'}`}>{o.description}</p>
                    <p className={`mt-5 font-display text-xl font-bold ${featured ? 'text-moon' : ''}`}>{o.priceLabel}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {details.map((d) => (
              <div key={d.title} className="flex gap-4 rounded-2xl bg-white/70 p-5 ring-1 ring-line">
                <d.icon aria-hidden className="size-6 shrink-0 text-lavender-deep" />
                <div>
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted">{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  )
}
