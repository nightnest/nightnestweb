import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { track } from '../../lib/analytics'

type Variant = 'primary' | 'secondary' | 'moon' | 'ghost' | 'ghost-dark'
type Size = 'md' | 'lg' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary: 'bg-midnight text-white hover:bg-midnight-700 shadow-card hover:shadow-lift',
  secondary: 'bg-white text-midnight ring-1 ring-line hover:ring-midnight/40 hover:bg-cream',
  moon: 'bg-moon text-midnight hover:brightness-105 shadow-[0_10px_30px_-12px_rgba(244,213,141,0.7)]',
  ghost: 'text-midnight hover:bg-midnight/5',
  'ghost-dark': 'text-white ring-1 ring-white/25 hover:bg-white/10 on-dark',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[15px]',
  lg: 'px-7 py-3.5 text-base',
}

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md', className = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${className}`

interface LinkButtonProps {
  to: string
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** When set, the click is recorded as a CTA event (used for the A/B funnel). */
  trackLabel?: string
}

export function LinkButton({ to, children, variant, size, className, trackLabel }: LinkButtonProps) {
  return (
    <Link
      to={to}
      className={buttonClasses(variant, size, className)}
      onClick={trackLabel ? () => track('cta_click', trackLabel) : undefined}
    >
      {children}
    </Link>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ variant, size, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />
}
