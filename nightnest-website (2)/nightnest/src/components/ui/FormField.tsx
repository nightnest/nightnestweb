import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  children: ReactNode
}

/** Label + control + hint/error, wired with aria-describedby by the caller via the ids below. */
export function FormField({ id, label, error, hint, optional, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined
