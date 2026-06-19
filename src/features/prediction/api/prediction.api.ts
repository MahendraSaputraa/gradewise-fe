import { apiRequest } from '../../../lib/api-client'
import type { PredictionInput, PredictionResponse } from '../types/prediction.types'

export function createPrediction(input: PredictionInput) {
  return apiRequest<PredictionResponse>('/predict', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
