import type { LucideIcon } from 'lucide-react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type ChoiceCardProps = {
  id: string
  label: string
  description: string
  icon: LucideIcon
  checked: boolean
  registration: UseFormRegisterReturn
}

export function ChoiceCard({ id, label, description, icon: Icon, checked, registration }: ChoiceCardProps) {
  return (
    <label className={`choice-card ${checked ? 'is-active' : ''}`} htmlFor={id}>
      <input id={id} type="checkbox" {...registration} />
      <span className="choice-icon"><Icon size={20} /></span>
      <span className="choice-copy"><strong>{label}</strong><small>{description}</small></span>
      <span className="switch" aria-hidden="true"><span /></span>
    </label>
  )
}
