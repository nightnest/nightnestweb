export const site = {
  name: 'NightNest',
  tagline: 'Rest well. Study better.',
  promise: 'Sleep well. Study better.',
  mission: 'To help students rest well, so they can study better and live healthier in shared spaces.',
  /** Target range from the business plan. Final price follows supplier quotes and customer feedback. */
  targetPrice: { min: 16, max: 18, currency: 'GBP' },
}

export const navLinks = [
  { to: '/kit', label: 'The Rest Kit' },
  { to: '/planner', label: 'Planner' },
  { to: '/guides', label: 'Sleep guides' },
  { to: '/student-discount', label: 'Student discount' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQs' },
] as const
