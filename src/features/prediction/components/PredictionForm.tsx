import { zodResolver } from '@hookform/resolvers/zod'
import {
  Accessibility, BookOpen, Building2, Bus, CircleDollarSign, Dumbbell,
  GraduationCap, HandHeart, HeartHandshake, Home, Laptop, Library, LoaderCircle,
  Moon, Send, Sparkles, Users, UserRound, UserRoundCheck,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { NumberField } from '../../../components/ui/NumberField'
import { SelectField } from '../../../components/ui/SelectField'
import { usePrediction } from '../hooks/usePrediction'
import { predictionSchema, type PredictionFormValues } from '../schemas/prediction.schema'
import type { PredictionResponse } from '../types/prediction.types'

const defaults: PredictionFormValues = {
  hours_studied: 20,
  attendance: 85,
  parental_involvement: 'Medium',
  access_to_resources: 'High',
  extracurricular_activities: 'Yes',
  sleep_hours: 7,
  previous_scores: 75,
  motivation_level: 'Medium',
  internet_access: 'Yes',
  tutoring_sessions: 2,
  family_income: 'Medium',
  teacher_quality: 'High',
  school_type: 'Public',
  peer_influence: 'Positive',
  physical_activity: 3,
  learning_disabilities: 'No',
  parental_education_level: 'College',
  distance_from_home: 'Near',
  gender: 'Female',
}

const levelOptions = [
  { value: 'Low', label: 'Rendah' }, { value: 'Medium', label: 'Sedang' }, { value: 'High', label: 'Tinggi' },
] as const
const yesNoOptions = [{ value: 'No', label: 'Tidak' }, { value: 'Yes', label: 'Ya' }] as const

export function PredictionForm({ onSuccess }: { onSuccess: (result: PredictionResponse) => void }) {
  const prediction = usePrediction()
  const { register, handleSubmit, formState: { errors } } = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: defaults,
  })
  const submit = handleSubmit((values) => prediction.mutate(values, { onSuccess }))

  return (
    <form className="prediction-form prediction-form-expanded" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="step-label">01 — Performa akademik</span>
        <h2>Fondasi belajar mahasiswa</h2>
        <p>Masukkan kebiasaan belajar dan rekam akademik paling baru.</p>
      </div>

      <div className="number-grid form-fields-grid">
        <NumberField id="hours-studied" label="Jam belajar" hint="0–168 jam per minggu" suffix="jam/minggu" icon={BookOpen} min={0} max={168} step={0.5} error={errors.hours_studied} registration={register('hours_studied', { valueAsNumber: true })} />
        <NumberField id="attendance" label="Kehadiran" hint="Persentase kehadiran 0–100" suffix="%" icon={UserRoundCheck} min={0} max={100} step={0.1} error={errors.attendance} registration={register('attendance', { valueAsNumber: true })} />
        <NumberField id="previous-scores" label="Nilai sebelumnya" hint="Rentang nilai 0–100" suffix="/ 100" icon={GraduationCap} min={0} max={100} step={0.1} error={errors.previous_scores} registration={register('previous_scores', { valueAsNumber: true })} />
        <NumberField id="tutoring-sessions" label="Sesi tutoring" hint="Jumlah sesi per bulan" suffix="sesi" icon={Users} min={0} step={1} error={errors.tutoring_sessions} registration={register('tutoring_sessions', { valueAsNumber: true })} />
        <NumberField id="sleep-hours" label="Jam tidur" hint="Rata-rata 0–24 jam per hari" suffix="jam/hari" icon={Moon} min={0} max={24} step={0.5} error={errors.sleep_hours} registration={register('sleep_hours', { valueAsNumber: true })} />
        <NumberField id="physical-activity" label="Aktivitas fisik" hint="Rata-rata 0–24 jam per minggu" suffix="jam/minggu" icon={Dumbbell} min={0} max={24} step={0.5} error={errors.physical_activity} registration={register('physical_activity', { valueAsNumber: true })} />
      </div>

      <div className="form-divider" />
      <div className="form-heading compact">
        <span className="step-label">02 — Dukungan & lingkungan</span>
        <h3>Ekosistem yang membentuk performa</h3>
        <p>Pilih kondisi yang paling menggambarkan keseharian mahasiswa.</p>
      </div>

      <div className="select-grid form-fields-grid">
        <SelectField id="parental-involvement" label="Keterlibatan orang tua" icon={HandHeart} options={levelOptions} error={errors.parental_involvement} registration={register('parental_involvement')} />
        <SelectField id="access-resources" label="Akses sumber belajar" icon={Library} options={levelOptions} error={errors.access_to_resources} registration={register('access_to_resources')} />
        <SelectField id="motivation" label="Tingkat motivasi" icon={Sparkles} options={levelOptions} error={errors.motivation_level} registration={register('motivation_level')} />
        <SelectField id="teacher-quality" label="Kualitas pengajar" icon={UserRound} options={levelOptions} error={errors.teacher_quality} registration={register('teacher_quality')} />
        <SelectField id="family-income" label="Pendapatan keluarga" icon={CircleDollarSign} options={levelOptions} error={errors.family_income} registration={register('family_income')} />
        <SelectField id="peer-influence" label="Pengaruh teman sebaya" icon={Users} options={[{ value: 'Negative', label: 'Negatif' }, { value: 'Neutral', label: 'Netral' }, { value: 'Positive', label: 'Positif' }]} error={errors.peer_influence} registration={register('peer_influence')} />
        <SelectField id="extracurricular" label="Aktivitas ekstrakurikuler" icon={HeartHandshake} options={yesNoOptions} error={errors.extracurricular_activities} registration={register('extracurricular_activities')} />
        <SelectField id="internet-access" label="Akses internet" icon={Laptop} options={yesNoOptions} error={errors.internet_access} registration={register('internet_access')} />
        <SelectField id="learning-disabilities" label="Kesulitan belajar" icon={Accessibility} options={yesNoOptions} error={errors.learning_disabilities} registration={register('learning_disabilities')} />
        <SelectField id="school-type" label="Jenis sekolah" icon={Building2} options={[{ value: 'Private', label: 'Swasta' }, { value: 'Public', label: 'Negeri' }]} error={errors.school_type} registration={register('school_type')} />
        <SelectField id="distance-home" label="Jarak dari rumah" icon={Bus} options={[{ value: 'Near', label: 'Dekat' }, { value: 'Moderate', label: 'Sedang' }, { value: 'Far', label: 'Jauh' }]} error={errors.distance_from_home} registration={register('distance_from_home')} />
      </div>

      <div className="form-divider" />
      <div className="form-heading compact">
        <span className="step-label">03 — Profil mahasiswa</span>
        <h3>Konteks personal</h3>
      </div>

      <div className="select-grid profile-grid">
        <SelectField id="parental-education" label="Pendidikan orang tua" icon={Home} options={[{ value: 'High School', label: 'SMA/sederajat' }, { value: 'College', label: 'Perguruan tinggi' }, { value: 'Postgraduate', label: 'Pascasarjana' }]} error={errors.parental_education_level} registration={register('parental_education_level')} />
        <SelectField id="gender" label="Gender" icon={UserRound} options={[{ value: 'Female', label: 'Perempuan' }, { value: 'Male', label: 'Laki-laki' }]} error={errors.gender} registration={register('gender')} />
      </div>

      {prediction.isError && <div className="form-error" role="alert">{prediction.error.message}</div>}
      <button className="primary-button" type="submit" disabled={prediction.isPending}>
        {prediction.isPending ? <><LoaderCircle className="spin" size={19} /> Model sedang menganalisis...</> : <><Send size={18} /> Prediksi nilai mahasiswa</>}
      </button>
      <p className="privacy-note">19 indikator diproses langsung oleh model machine learning dan tidak disimpan.</p>
    </form>
  )
}
