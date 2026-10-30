import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { track } from '../../lib/analytics'
import { AnnouncementBar } from './AnnouncementBar'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    track('page_view')
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-midnight px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
