import { Link } from 'react-router-dom'

export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="16" fill="#0F1B3D" />
      <circle cx="32" cy="32" r="15" fill="#F4D58D" />
      <circle cx="39" cy="26" r="13" fill="#0F1B3D" />
      <circle cx="47" cy="46" r="2" fill="#A99BE8" />
      <circle cx="16" cy="17" r="1.6" fill="#F4D58D" />
    </svg>
  )
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 rounded-lg" aria-label="NightNest home">
      <LogoMark className={`size-8 ${dark ? "rounded-[9px] ring-1 ring-white/25" : ""}`} />
      <span className={`font-display text-xl font-bold tracking-tight ${dark ? 'text-white' : 'text-midnight'}`}>
        NightNest
      </span>
    </Link>
  )
}
