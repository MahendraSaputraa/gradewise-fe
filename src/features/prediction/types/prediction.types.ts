export type Level = 'Low' | 'Medium' | 'High'
export type YesNo = 'No' | 'Yes'

export type PredictionInput = {
  hours_studied: number
  attendance: number
  parental_involvement: Level
  access_to_resources: Level
  extracurricular_activities: YesNo
  sleep_hours: number
  previous_scores: number
  motivation_level: Level
  internet_access: YesNo
  tutoring_sessions: number
  family_income: Level
  teacher_quality: Level
  school_type: 'Private' | 'Public'
  peer_influence: 'Negative' | 'Neutral' | 'Positive'
  physical_activity: number
  learning_disabilities: YesNo
  parental_education_level: 'High School' | 'College' | 'Postgraduate'
  distance_from_home: 'Near' | 'Moderate' | 'Far'
  gender: 'Female' | 'Male'
}

export type PredictionResponse = {
  predicted_score: number
  is_dummy: boolean
  message: string
}
