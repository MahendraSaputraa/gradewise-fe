import { useMutation } from '@tanstack/react-query'
import { createPrediction } from '../api/prediction.api'

export function usePrediction() {
  return useMutation({ mutationFn: createPrediction })
}
