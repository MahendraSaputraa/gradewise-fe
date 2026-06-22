import { useState } from 'react'
import type { PredictionResponse } from '../types/prediction.types'
import { PredictionForm } from './PredictionForm'
import { PredictionResult } from './PredictionResult'

export function PredictionWorkspace() {
  const [result, setResult] = useState<PredictionResponse | null>(null)

  return (
    <section className="workspace-section" id="prediction-form">
      <div className="section-intro">
        <span className="section-number">/ 01</span>
        <div><h2>Mulai evaluasi</h2><p>Lengkapi 19 indikator untuk menghasilkan estimasi nilai berbasis model.</p></div>
      </div>
      <div className="workspace-card">
        {result ? <PredictionResult result={result} onReset={() => setResult(null)} /> : <PredictionForm onSuccess={setResult} />}
        <aside className="insight-panel">
          <span className="insight-tag">Mengapa ini penting?</span>
          <blockquote>“Data memberi konteks. Pemahaman memberi arah.”</blockquote>
          <p>Gradewise mengolah pola akademik, lingkungan, dan kebiasaan menjadi estimasi performa yang lebih menyeluruh.</p>
          <div className="insight-visual" aria-hidden="true">
            <span className="bar bar-one" /><span className="bar bar-two" /><span className="bar bar-three" /><span className="bar bar-four" />
            <svg viewBox="0 0 260 100"><path d="M5 86 C 45 82, 55 68, 83 70 S 126 43, 153 48 S 191 20, 255 12" /></svg>
          </div>
          <div className="insight-footer"><span /><small>RANDOM FOREST PREDICTION</small></div>
        </aside>
      </div>
    </section>
  )
}
