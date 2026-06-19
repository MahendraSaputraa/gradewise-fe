import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpen, Headphones, HeartHandshake, LoaderCircle, Send, Signal, UserRoundCheck } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { ChoiceCard } from '../../../components/ui/ChoiceCard'
import { NumberField } from '../../../components/ui/NumberField'
import { predictionSchema, type PredictionFormValues } from '../schemas/prediction.schema'
import type { PredictionResponse } from '../types/prediction.types'
import { usePrediction } from '../hooks/usePrediction'

const defaults: PredictionFormValues = {
  study_hours_per_week: 10,
  attendance_percentage: 85,
  previous_grade: 78,
  assignment_average: 80,
  internet_access: true,
  family_support: true,
}

export function PredictionForm({ onSuccess }: { onSuccess: (result: PredictionResponse) => void }) {
  const prediction = usePrediction()
  const { register, handleSubmit, control, formState: { errors } } = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: defaults,
  })
  const internetAccess = useWatch({ control, name: 'internet_access' })
  const familySupport = useWatch({ control, name: 'family_support' })

  const submit = handleSubmit((values) => prediction.mutate(values, { onSuccess }))

  return (
    <form className="prediction-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="step-label">01 — Data akademik</span>
        <h2>Ceritakan performa belajarnya</h2>
        <p>Gunakan data terbaru agar hasil evaluasi lebih relevan.</p>
      </div>

      <div className="number-grid">
        <NumberField id="study-hours" label="Jam belajar" hint="Rentang 0–168 jam" suffix="jam/minggu" icon={BookOpen} min={0} max={168} step={0.5} error={errors.study_hours_per_week} registration={register('study_hours_per_week', { valueAsNumber: true })} />
        <NumberField id="attendance" label="Kehadiran" hint="Rentang 0–100 persen" suffix="%" icon={UserRoundCheck} min={0} max={100} step={0.1} error={errors.attendance_percentage} registration={register('attendance_percentage', { valueAsNumber: true })} />
        <NumberField id="previous-grade" label="Nilai sebelumnya" hint="Rentang nilai 0–100" suffix="/ 100" icon={Signal} min={0} max={100} step={0.1} error={errors.previous_grade} registration={register('previous_grade', { valueAsNumber: true })} />
        <NumberField id="assignment-average" label="Rata-rata tugas" hint="Rentang nilai 0–100" suffix="/ 100" icon={Headphones} min={0} max={100} step={0.1} error={errors.assignment_average} registration={register('assignment_average', { valueAsNumber: true })} />
      </div>

      <div className="form-divider" />

      <div className="form-heading compact">
        <span className="step-label">02 — Lingkungan pendukung</span>
        <h3>Faktor di luar kelas</h3>
      </div>

      <div className="choice-grid">
        <ChoiceCard id="internet-access" label="Akses internet" description="Tersedia untuk belajar" icon={Signal} checked={internetAccess} registration={register('internet_access')} />
        <ChoiceCard id="family-support" label="Dukungan keluarga" description="Mendapat dukungan aktif" icon={HeartHandshake} checked={familySupport} registration={register('family_support')} />
      </div>

      {prediction.isError && <div className="form-error" role="alert">{prediction.error.message}</div>}

      <button className="primary-button" type="submit" disabled={prediction.isPending}>
        {prediction.isPending ? <><LoaderCircle className="spin" size={19} /> Menganalisis data...</> : <><Send size={18} /> Lihat hasil prediksi</>}
      </button>
      <p className="privacy-note">Data hanya digunakan untuk proses prediksi dan tidak disimpan.</p>
    </form>
  )
}
