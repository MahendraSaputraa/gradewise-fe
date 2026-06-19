import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PredictionResult } from './PredictionResult'

describe('PredictionResult', () => {
  it('renders probability and dummy mode from the API response', () => {
    render(
      <PredictionResult
        result={{
          prediction: 'aman',
          probability: 0.76,
          is_dummy: true,
          message: 'Prediksi sementara untuk pengujian integrasi frontend.',
        }}
        onReset={() => undefined}
      />,
    )

    expect(screen.getByText('Dalam jalur aman')).toBeInTheDocument()
    expect(screen.getByText('76%')).toBeInTheDocument()
    expect(screen.getByText('Mode simulasi')).toBeInTheDocument()
  })

  it('lets the user start another evaluation', () => {
    const onReset = vi.fn()
    render(
      <PredictionResult
        result={{ prediction: 'berisiko', probability: 0.68, is_dummy: false, message: 'Perlu pendampingan.' }}
        onReset={onReset}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Evaluasi data lain' }))
    expect(onReset).toHaveBeenCalledOnce()
  })
})
