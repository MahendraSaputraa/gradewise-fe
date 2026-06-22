import { afterEach, describe, expect, it, vi } from 'vitest'
import { createPrediction } from './prediction.api'

const payload = {
  hours_studied: 20, attendance: 85, parental_involvement: 'Medium' as const, access_to_resources: 'High' as const,
  extracurricular_activities: 'Yes' as const, sleep_hours: 7, previous_scores: 75, motivation_level: 'Medium' as const,
  internet_access: 'Yes' as const, tutoring_sessions: 2, family_income: 'Medium' as const, teacher_quality: 'High' as const,
  school_type: 'Public' as const, peer_influence: 'Positive' as const, physical_activity: 3, learning_disabilities: 'No' as const,
  parental_education_level: 'College' as const, distance_from_home: 'Near' as const, gender: 'Female' as const,
}

describe('createPrediction', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('sends the backend contract as JSON', async () => {
    const response = { predicted_score: 68.9, is_dummy: false, message: 'Prediksi berhasil dibuat menggunakan model student performance.' }
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(response), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(createPrediction(payload)).resolves.toEqual(response)
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/predict$/),
      expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) }),
    )
  })

  it('returns a friendly message when the backend is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(createPrediction(payload)).rejects.toThrow('Pastikan backend FastAPI sudah berjalan')
  })
})
