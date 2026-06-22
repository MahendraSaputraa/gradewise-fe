import {
  BrainCircuit,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { CSSProperties } from "react";
import type { PredictionResponse } from "../types/prediction.types";

type PredictionResultProps = {
  result: PredictionResponse;
  onReset: () => void;
};

export function PredictionResult({ result, onReset }: PredictionResultProps) {
  const displayScore = Number(result.predicted_score.toFixed(1));
  const gaugeScore = Math.min(100, Math.max(0, result.predicted_score));

  return (
    <section className="result-panel score-result-panel" aria-live="polite">
      <div className="result-topline">
        <span>Hasil prediksi model</span>
        <TrendingUp size={17} />
      </div>

      <div
        className="score-gauge"
        style={{ "--score": `${gaugeScore * 3.6}deg` } as CSSProperties}
      >
        <div className="score-gauge-inner">
          <span>Predicted score</span>
          <strong>{displayScore}</strong>
          <small>dari 100</small>
        </div>
      </div>

      <p className="result-kicker">Estimasi performa akademik</p>
      <h2>Prediksi nilai mahasiswa</h2>
      <p className="result-message">{result.message}</p>

      {!result.is_dummy && (
        <div className="model-note">
          <span className="model-note-icon">
            <BrainCircuit size={19} />
          </span>
          <span>
            <strong>Model ML aktif</strong> Hasil dihitung oleh model Student
            Performance yang telah dilatih.
          </span>
          <CheckCircle2 size={17} />
        </div>
      )}

      <div className="result-caption">
        <Sparkles size={14} /> Gunakan hasil sebagai insight pendukung, bukan
        satu-satunya dasar keputusan.
      </div>
      <button className="secondary-button" type="button" onClick={onReset}>
        <RotateCcw size={17} /> Evaluasi data lain
      </button>
    </section>
  );
}
