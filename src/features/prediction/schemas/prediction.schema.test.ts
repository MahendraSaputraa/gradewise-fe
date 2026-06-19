import { describe, expect, it } from 'vitest'
import { predictionSchema } from './prediction.schema'

const validInput = {
  study_hours_per_week: 10,
  attendance_percentage: 85,
  previous_grade: 78,
  assignment_average: 80,
  internet_access: true,
  family_support: true,
}

describe('predictionSchema', () => {
  it('accepts a valid API payload', () => {
    expect(predictionSchema.safeParse(validInput).success).toBe(true)
  })

  it.each([
    ['study_hours_per_week', 169],
    ['attendance_percentage', 101],
    ['previous_grade', -1],
    ['assignment_average', 101],
  ])('rejects an invalid %s value', (field, value) => {
    expect(predictionSchema.safeParse({ ...validInput, [field]: value }).success).toBe(false)
  })
})
