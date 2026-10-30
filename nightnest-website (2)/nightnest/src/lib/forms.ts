import { config } from './config'
import { readStore, writeStore } from './storage'

export type FormKind = 'enquiry' | 'interest' | 'student-discount' | 'routine-sheet'

export interface SubmissionResult {
  ok: boolean
  /** 'remote' when sent to the configured endpoint, 'local' when kept in this browser (demo mode). */
  mode: 'remote' | 'local'
  error?: string
}

export interface StoredSubmission {
  kind: FormKind
  data: Record<string, unknown>
  at: string
}

/**
 * Submits a form. If VITE_FORM_ENDPOINT is configured the payload is POSTed as JSON
 * (Formspree-compatible). Otherwise it is saved to localStorage and reported as a local demo
 * submission, so nothing pretends to have reached a server.
 */
export async function submitForm(kind: FormKind, data: Record<string, unknown>): Promise<SubmissionResult> {
  const payload = { ...data, form: kind, submittedAt: new Date().toISOString() }

  if (!config.formEndpoint) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const all = readStore<StoredSubmission[]>('submissions', [])
    all.push({ kind, data, at: payload.submittedAt })
    writeStore('submissions', all.slice(-200))
    return { ok: true, mode: 'local' }
  }

  try {
    const response = await fetch(config.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      return { ok: false, mode: 'remote', error: `The server responded with ${response.status}. Please try again.` }
    }
    return { ok: true, mode: 'remote' }
  } catch {
    return {
      ok: false,
      mode: 'remote',
      error: 'We could not reach the server. Check your connection and try again.',
    }
  }
}

export function getStoredSubmissions(): StoredSubmission[] {
  return readStore<StoredSubmission[]>('submissions', [])
}
