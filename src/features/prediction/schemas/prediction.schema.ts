import { z } from 'zod'

const requiredNumber = (label: string, min: number, max: number) =>
  z
    .number({ error: `${label} wajib diisi` })
    .min(min, `${label} minimal ${min}`)
    .max(max, `${label} maksimal ${max}`)

export const predictionSchema = z.object({
  study_hours_per_week: requiredNumber('Jam belajar', 0, 168),
  attendance_percentage: requiredNumber('Kehadiran', 0, 100),
  previous_grade: requiredNumber('Nilai sebelumnya', 0, 100),
  assignment_average: requiredNumber('Rata-rata tugas', 0, 100),
  internet_access: z.boolean(),
  family_support: z.boolean(),
})

export type PredictionFormValues = z.infer<typeof predictionSchema>
