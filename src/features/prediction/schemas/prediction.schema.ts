import { z } from 'zod'

const requiredNumber = (label: string, min: number, max: number) =>
  z
    .number({ error: `${label} wajib diisi` })
    .min(min, `${label} minimal ${min}`)
    .max(max, `${label} maksimal ${max}`)

export const predictionSchema = z.object({
  hours_studied: requiredNumber('Jam belajar', 0, 168),
  attendance: requiredNumber('Kehadiran', 0, 100),
  parental_involvement: z.enum(['Low', 'Medium', 'High']),
  access_to_resources: z.enum(['Low', 'Medium', 'High']),
  extracurricular_activities: z.enum(['No', 'Yes']),
  sleep_hours: requiredNumber('Jam tidur', 0, 24),
  previous_scores: requiredNumber('Nilai sebelumnya', 0, 100),
  motivation_level: z.enum(['Low', 'Medium', 'High']),
  internet_access: z.enum(['No', 'Yes']),
  tutoring_sessions: z.number({ error: 'Sesi tutoring wajib diisi' }).int('Sesi tutoring harus bilangan bulat').min(0, 'Sesi tutoring minimal 0'),
  family_income: z.enum(['Low', 'Medium', 'High']),
  teacher_quality: z.enum(['Low', 'Medium', 'High']),
  school_type: z.enum(['Private', 'Public']),
  peer_influence: z.enum(['Negative', 'Neutral', 'Positive']),
  physical_activity: requiredNumber('Aktivitas fisik', 0, 24),
  learning_disabilities: z.enum(['No', 'Yes']),
  parental_education_level: z.enum(['High School', 'College', 'Postgraduate']),
  distance_from_home: z.enum(['Near', 'Moderate', 'Far']),
  gender: z.enum(['Female', 'Male']),
})

export type PredictionFormValues = z.infer<typeof predictionSchema>
