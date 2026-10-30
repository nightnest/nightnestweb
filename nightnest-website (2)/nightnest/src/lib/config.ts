const env = import.meta.env

const clean = (value: string | undefined) => (value && value.trim() ? value.trim() : undefined)

export const config = {
  formEndpoint: clean(env.VITE_FORM_ENDPOINT),
  plausibleDomain: clean(env.VITE_PLAUSIBLE_DOMAIN),
  contactEmail: clean(env.VITE_CONTACT_EMAIL),
  social: {
    instagram: clean(env.VITE_INSTAGRAM_URL),
    tiktok: clean(env.VITE_TIKTOK_URL),
  },
} as const

/** True when no form endpoint is configured and submissions stay in this browser. */
export const isLocalDemoMode = !config.formEndpoint
