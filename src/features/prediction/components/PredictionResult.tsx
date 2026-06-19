import { AlertTriangle, CheckCircle2, FlaskConical, RotateCcw, TrendingUp } from 'lucide-react'
import type { PredictionResponse } from '../types/prediction.types'

type PredictionResultProps = { result: PredictionResponse; onReset: () => void }

export function PredictionResult({ result, onReset }: PredictionResultProps) {
  const isSafe = result.prediction === 'aman'
  const probability = Math.round(result.probability * 100)
  const Icon = isSafe ? CheckCircle2 : AlertTriangle

  return (
    <section className={`result-panel ${isSafe ? 'result-safe' : 'result-risk'}`} aria-live="polite">
      <div className="result-topline"><span>Hasil evaluasi</span><TrendingUp size={17} /></div>
      <div className="result-icon"><Icon size={34} /></div>
      <p className="result-kicker">Status prediksi mahasiswa</p>
      <h2>{isSafe ? 'Dalam jalur aman' : 'Perlu perhatian'}</h2>
      <p className="result-message">{result.message}</p>

      <div className="probability-block">
        <div><span>Tingkat keyakinan</span><strong>{probability}%</strong></div>
        <div className="probability-track"><span style={{ width: `${probability}%` }} /></div>
      </div>

      {result.is_dummy && (
        <div className="dummy-note"><FlaskConical size={17} /><span><strong>Mode simulasi</strong> Hasil ini masih memakai perhitungan dummy.</span></div>
      )}

      <button className="secondary-button" type="button" onClick={onReset}><RotateCcw size={17} /> Evaluasi data lain</button>
    </section>
  )
}
