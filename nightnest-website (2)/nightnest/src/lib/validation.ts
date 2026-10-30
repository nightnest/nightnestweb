const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isEmail = (value: string) => EMAIL_RE.test(value.trim())

/** UK university addresses end in .ac.uk (including subdomains such as student.uni.ac.uk). */
export const isAcUkEmail = (value: string) => isEmail(value) && /\.ac\.uk$/i.test(value.trim())

export type Errors<T> = Partial<Record<keyof T, string>>

export const hasErrors = <T,>(errors: Errors<T>) => Object.values(errors).some(Boolean)
