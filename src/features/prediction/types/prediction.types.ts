export type PredictionInput = {
  study_hours_per_week: number
  attendance_percentage: number
  previous_grade: number
  assignment_average: number
  internet_access: boolean
  family_support: boolean
}

export type PredictionResponse = {
  prediction: 'aman' | 'berisiko'
  probability: number
  is_dummy: boolean
  message: string
}
