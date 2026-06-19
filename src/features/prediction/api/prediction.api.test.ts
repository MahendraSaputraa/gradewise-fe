import { afterEach, describe, expect, it, vi } from 'vitest'
import { createPrediction } from './prediction.api'

const payload = {
  study_hours_per_week: 10,
  attendance_percentage: 85,
  previous_grade: 78,
  assignment_average: 80,
  internet_access: true,
  family_support: true,
}

describe('createPrediction', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('sends the backend contract as JSON', async () => {
    const response = { prediction: 'aman' as const, probability: 0.76, is_dummy: true, message: 'Simulasi.' }
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(response), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(createPrediction(payload)).resolves.toEqual(response)
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/predict',
      expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) }),
    )
  })

  it('returns a friendly message when the backend is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(createPrediction(payload)).rejects.toThrow('Pastikan backend FastAPI sudah berjalan')
  })
})
