import { describe, expect, it } from 'vitest'
import { predictionSchema } from './prediction.schema'

const validInput = {
  hours_studied: 20, attendance: 85, parental_involvement: 'Medium', access_to_resources: 'High',
  extracurricular_activities: 'Yes', sleep_hours: 7, previous_scores: 75, motivation_level: 'Medium',
  internet_access: 'Yes', tutoring_sessions: 2, family_income: 'Medium', teacher_quality: 'High',
  school_type: 'Public', peer_influence: 'Positive', physical_activity: 3, learning_disabilities: 'No',
  parental_education_level: 'College', distance_from_home: 'Near', gender: 'Female',
}

describe('predictionSchema', () => {
  it('accepts the complete 19-feature backend payload', () => {
    expect(predictionSchema.safeParse(validInput).success).toBe(true)
  })

  it.each([
    ['hours_studied', 169], ['attendance', 101], ['sleep_hours', 25],
    ['previous_scores', -1], ['physical_activity', 25], ['tutoring_sessions', -1],
  ])('rejects an invalid %s value', (field, value) => {
    expect(predictionSchema.safeParse({ ...validInput, [field]: value }).success).toBe(false)
  })

  it('rejects category values with incorrect casing', () => {
    expect(predictionSchema.safeParse({ ...validInput, motivation_level: 'medium' }).success).toBe(false)
  })
})
