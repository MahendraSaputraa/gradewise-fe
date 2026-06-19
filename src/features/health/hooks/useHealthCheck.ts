import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../api/health.api'

export function useHealthCheck() {
  return useQuery({
    queryKey: ['api-health'],
    queryFn: getHealth,
    staleTime: 30_000,
    refetchInterval: 60_000,
  })
}
