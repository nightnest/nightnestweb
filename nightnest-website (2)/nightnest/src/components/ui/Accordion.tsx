import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

export interface AccordionItem {
  id: string
  title: string
  content: string
}

export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)
  const baseId = useId()

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl bg-white shadow-card">
      {items.map((item) => {
        const isOpen = open === item.id
        const panelId = `${baseId}-${item.id}-panel`
        const buttonId = `${baseId}-${item.id}-button`
        return (
          <div key={item.id}>
            <h3 className="font-sans">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[15px] font-semibold text-ink transition-colors hover:bg-cream/60 sm:px-7 sm:text-base"
              >
                {item.title}
                <ChevronDown
                  aria-hidden
                  className={`size-5 shrink-0 text-lavender-deep transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 leading-relaxed text-muted sm:px-7">{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
