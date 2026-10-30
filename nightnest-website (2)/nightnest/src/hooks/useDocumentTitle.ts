import { useEffect } from 'react'

const BASE = 'NightNest'

/** Sets the page title and meta description for the current route. */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} — Student Rest Kit | Sleep well. Study better.`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
