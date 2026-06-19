import { Cloud, CloudOff, LoaderCircle } from 'lucide-react'
import { useHealthCheck } from '../../features/health/hooks/useHealthCheck'

export function ApiStatus() {
  const { isPending, isSuccess } = useHealthCheck()
  const label = isPending ? 'Menghubungkan' : isSuccess ? 'API terhubung' : 'API offline'
  const Icon = isPending ? LoaderCircle : isSuccess ? Cloud : CloudOff

  return (
    <div className={`api-status ${isSuccess ? 'online' : isPending ? 'pending' : 'offline'}`} title={label}>
      <Icon size={15} className={isPending ? 'spin' : ''} />
      <span>{label}</span>
    </div>
  )
}
