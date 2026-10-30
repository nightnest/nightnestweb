import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { config } from '../../lib/config'
import { Logo } from './Logo'

const YEAR = new Date().getFullYear()

const columns = [
  {
    title: 'Explore',
    links: [
      { to: '/kit', label: 'The Rest Kit' },
      { to: '/planner', label: 'Sleep-and-study planner' },
      { to: '/student-discount', label: 'Student discount' },
      { to: '/register-interest', label: 'Register interest' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { to: '/guides', label: 'Sleep guides' },
      { to: '/guides/how-to-sleep-in-halls', label: 'How to sleep in halls' },
      { to: '/guides/exam-week-routine', label: 'Exam-week routine' },
      { to: '/faq', label: 'FAQs' },
    ],
  },
  {
    title: 'NightNest',
    links: [
      { to: '/about', label: 'About & mission' },
      { to: '/contact', label: 'Contact' },
      { to: '/privacy', label: 'Privacy' },
      { to: '/insights', label: 'Launch insights (team)' },
    ],
  },
]

export function Footer() {
  const socials = [
    { href: config.social.instagram, label: 'Instagram' },
    { href: config.social.tiktok, label: 'TikTok' },
  ].filter((s): s is { href: string; label: string } => Boolean(s.href))

  return (
    <footer className="bg-midnight text-white on-dark no-print">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr] lg:py-20">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm text-white/70">{site.mission}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {config.contactEmail && (
              <a
                href={`mailto:${config.contactEmail}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white/10"
              >
                <Mail aria-hidden className="size-4" />
                {config.contactEmail}
              </a>
            )}
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 text-sm ring-1 ring-white/20 hover:bg-white/10"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow text-moon">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-[15px] text-white/75 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>&copy; {YEAR} NightNest. Online-only &middot; Bundle-first &middot; Built for student life.</p>
        </div>
      </div>
    </footer>
  )
}
