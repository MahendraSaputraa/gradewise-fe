import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PredictionResult } from './PredictionResult'

describe('PredictionResult', () => {
  it('renders the predicted score and real model state', () => {
    render(
      <PredictionResult
        result={{
          predicted_score: 68.9,
          is_dummy: false,
          message: 'Prediksi berhasil dibuat menggunakan model student performance.',
        }}
        onReset={() => undefined}
      />,
    )

    expect(screen.getByText('Prediksi nilai mahasiswa')).toBeInTheDocument()
    expect(screen.getByText('68.9')).toBeInTheDocument()
    expect(screen.getByText('Model ML aktif')).toBeInTheDocument()
  })

  it('lets the user start another evaluation', () => {
    const onReset = vi.fn()
    render(
      <PredictionResult
        result={{ predicted_score: 68, is_dummy: false, message: 'Prediksi berhasil.' }}
        onReset={onReset}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Evaluasi data lain' }))
    expect(onReset).toHaveBeenCalledOnce()
  })
})
