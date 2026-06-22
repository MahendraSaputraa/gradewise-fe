import { Activity, ArrowDown, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react'
import { ApiStatus } from '../components/layout/ApiStatus'
import { Brand } from '../components/layout/Brand'
import { PredictionWorkspace } from '../features/prediction/components/PredictionWorkspace'

const highlights = [
  { icon: Activity, value: '19 indikator', label: 'dianalisis bersamaan' },
  { icon: BrainCircuit, value: 'Model ML', label: 'hasil training asli' },
  { icon: ShieldCheck, value: 'Privat', label: 'tanpa menyimpan data' },
]

export function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <Brand />
        <ApiStatus />
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> Insight akademik berbasis data</div>
            <h1>Kenali potensi.<br /><span>Jaga arah kelulusan.</span></h1>
            <p>
              Prediksi performa mahasiswa melalui 19 indikator akademik, kebiasaan,
              dan dukungan lingkungan—ditenagai model machine learning yang telah dilatih.
            </p>
            <a className="hero-link" href="#prediction-form">
              Mulai evaluasi <ArrowDown size={17} />
            </a>
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit-ring orbit-ring-outer" />
            <div className="orbit-ring orbit-ring-inner" />
            <div className="score-core">
              <span>Student</span>
              <strong>19F</strong>
              <small>ML Prediction</small>
            </div>
            <span className="orbit-dot dot-one" />
            <span className="orbit-dot dot-two" />
            <span className="orbit-label label-one">Kehadiran</span>
            <span className="orbit-label label-two">Akademik</span>
            <span className="orbit-label label-three">Dukungan</span>
          </div>
        </section>

        <section className="highlight-grid" aria-label="Keunggulan aplikasi">
          {highlights.map(({ icon: Icon, value, label }) => (
            <article className="highlight-card" key={value}>
              <span className="highlight-icon"><Icon size={19} /></span>
              <div><strong>{value}</strong><small>{label}</small></div>
            </article>
          ))}
        </section>

        <PredictionWorkspace />
      </main>

      <footer>
        <Brand compact />
        <p>Keputusan yang lebih baik dimulai dari pemahaman yang lebih awal.</p>
        <span>© {new Date().getFullYear()} Gradewise</span>
      </footer>
    </div>
  )
}
