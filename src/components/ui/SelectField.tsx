import { ChevronDown, type LucideIcon } from 'lucide-react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type Option = { value: string; label: string }

type SelectFieldProps = {
  id: string
  label: string
  hint?: string
  icon: LucideIcon
  options: readonly Option[]
  error?: FieldError
  registration: UseFormRegisterReturn
}

export function SelectField({ id, label, hint, icon: Icon, options, error, registration }: SelectFieldProps) {
  return (
    <label className={`field-group select-group ${error ? 'has-error' : ''}`} htmlFor={id}>
      <span className="field-label"><Icon size={17} /> {label}</span>
      <span className="select-control">
        <select id={id} {...registration} aria-invalid={!!error}>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown size={16} aria-hidden="true" />
      </span>
      {(error || hint) && <small className="field-hint">{error?.message ?? hint}</small>}
    </label>
  )
}
