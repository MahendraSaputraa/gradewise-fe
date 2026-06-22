import type { LucideIcon } from 'lucide-react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type NumberFieldProps = {
  id: string
  label: string
  hint: string
  suffix: string
  icon: LucideIcon
  min: number
  max?: number
  step?: number
  error?: FieldError
  registration: UseFormRegisterReturn
}

export function NumberField({ id, label, hint, suffix, icon: Icon, error, registration, ...limits }: NumberFieldProps) {
  return (
    <label className={`field-group ${error ? 'has-error' : ''}`} htmlFor={id}>
      <span className="field-label"><Icon size={17} /> {label}</span>
      <span className="field-control">
        <input id={id} type="number" inputMode="decimal" {...limits} {...registration} aria-invalid={!!error} />
        <span>{suffix}</span>
      </span>
      <small className="field-hint">{error?.message ?? hint}</small>
    </label>
  )
}
