import { apiRequest } from '../../../lib/api-client'

export type HealthResponse = { status?: string; message?: string; model_loaded?: boolean }

export function getHealth() {
  return apiRequest<HealthResponse>('/health')
}
