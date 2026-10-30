import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
}

/** Fades content up the first time it scrolls into view. Respects reduced-motion via CSS. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}
