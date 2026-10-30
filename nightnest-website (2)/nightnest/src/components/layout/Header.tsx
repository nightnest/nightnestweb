import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/site'
import { LinkButton } from '../ui/Button'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuTop, setMenuTop] = useState(64)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)

  // Close the mobile menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
      isActive ? 'bg-midnight/6 text-midnight' : 'text-ink/75 hover:text-midnight hover:bg-midnight/4'
    }`

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 transition-all duration-300 no-print ${
        scrolled ? 'bg-cream/85 shadow-[0_1px_0_rgb(15_27_61/0.08)] backdrop-blur-md' : 'bg-cream'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton to="/register-interest" size="sm" className="hidden sm:inline-flex" trackLabel="header_register">
            Register interest
          </LinkButton>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-midnight hover:bg-midnight/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => {
              // The announcement bar can push the header down, so anchor the menu to the header's real bottom edge.
              setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 64)
              setOpen((v) => !v)
            }}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        style={{ top: menuTop }}
        className={`fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-cream transition-all duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-6">
          {[{ to: '/', label: 'Home' }, ...navLinks, { to: '/contact', label: 'Contact' }].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3.5 font-display text-xl font-semibold ${isActive ? 'bg-white text-midnight shadow-card' : 'text-ink/80'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <LinkButton to="/register-interest" size="lg" className="mt-4" trackLabel="mobile_register">
            Register interest
          </LinkButton>
        </nav>
      </div>
    </header>
  )
}
