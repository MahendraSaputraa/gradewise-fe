import { GraduationCap } from 'lucide-react'

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <span className="brand-mark"><GraduationCap size={22} strokeWidth={2.2} /></span>
      <span>grade<span>wise</span></span>
    </div>
  )
}
