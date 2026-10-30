/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string
  readonly VITE_PLAUSIBLE_DOMAIN?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_TIKTOK_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
