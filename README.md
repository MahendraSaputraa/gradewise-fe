# Gradewise — Student Performance Predictor

Gradewise adalah frontend untuk memprediksi nilai akademik mahasiswa berdasarkan 19 indikator akademik, kebiasaan, lingkungan, dan profil. Aplikasi mengonsumsi API FastAPI yang menjalankan model machine learning `RandomForestRegressor` hasil training asli.

Frontend menampilkan form berbahasa Indonesia, tetapi tetap mengirim nilai kategorikal dalam bahasa Inggris sesuai kontrak backend.

## Fitur

- Form prediksi dengan 19 input.
- Validasi client-side yang mengikuti batas input FastAPI.
- Dropdown untuk seluruh fitur kategorikal.
- Pemeriksaan koneksi model melalui `GET /health`.
- Pengiriman prediksi melalui TanStack Query mutation.
- Loading, error, dan success state.
- Visualisasi `predicted_score` dalam gauge nilai 0–100.
- Penanda bahwa hasil berasal dari model ML asli.
- Tampilan responsif untuk desktop, tablet, dan mobile.
- Automated test untuk schema, kontrak API, dan result component.

## Tech stack

- Vite
- React dan TypeScript
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Lucide React
- Vitest dan React Testing Library

## Prasyarat

Pastikan perangkat sudah memiliki:

- Node.js `^20.19.0` atau `>=22.12.0`.
- npm.
- Backend Student Performance Prediction yang dapat dijalankan.

Secara lokal, frontend menggunakan port `3000` dan backend menggunakan port `8000`.

## Menjalankan project

### 1. Jalankan backend

Masuk ke repository backend dan jalankan FastAPI sesuai petunjuk backend. Contoh umum:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Pastikan endpoint berikut dapat diakses:

```text
http://localhost:8000/health
http://localhost:8000/docs
```

Response `/health` yang diharapkan:

```json
{
  "status": "ok",
  "message": "API and prediction model are ready",
  "model_loaded": true
}
```

### 2. Siapkan frontend

Install dependency:

```bash
npm install
```

Salin `.env.example` menjadi `.env.local`, kemudian pastikan isinya:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Jalankan development server:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Jika backend berhasil terhubung, header aplikasi akan menampilkan status **API terhubung**.

## Environment variable

| Variable | Wajib | Contoh | Keterangan |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Ya | `http://localhost:8000` | Base URL FastAPI tanpa endpoint `/predict`. |

Project ini menggunakan Vite, tetapi tetap membaca prefix `NEXT_PUBLIC_` melalui konfigurasi `envPrefix` di `vite.config.ts`.

Untuk production, ganti nilainya dengan URL backend yang sudah menggunakan kontrak 19 fitur terbaru. Jangan arahkan frontend baru ke deployment backend lama karena request akan ditolak sebagai payload yang tidak sesuai.

## Kontrak API

### Health check

```http
GET /health
```

Health check digunakan untuk menampilkan status koneksi API pada header.

### Membuat prediksi

```http
POST /predict
Content-Type: application/json
```

Contoh payload lengkap:

```json
{
  "hours_studied": 20,
  "attendance": 85,
  "parental_involvement": "Medium",
  "access_to_resources": "High",
  "extracurricular_activities": "Yes",
  "sleep_hours": 7,
  "previous_scores": 75,
  "motivation_level": "Medium",
  "internet_access": "Yes",
  "tutoring_sessions": 2,
  "family_income": "Medium",
  "teacher_quality": "High",
  "school_type": "Public",
  "peer_influence": "Positive",
  "physical_activity": 3,
  "learning_disabilities": "No",
  "parental_education_level": "College",
  "distance_from_home": "Near",
  "gender": "Female"
}
```

Contoh response:

```json
{
  "predicted_score": 68.9,
  "is_dummy": false,
  "message": "Prediksi berhasil dibuat menggunakan model student performance."
}
```

Frontend menampilkan `predicted_score`. Kontrak lama berupa `prediction` dan `probability` sudah tidak digunakan.

## Referensi input

### Input numerik

| Field API | Label frontend | Validasi |
| --- | --- | --- |
| `hours_studied` | Jam belajar | 0–168 |
| `attendance` | Kehadiran | 0–100 |
| `sleep_hours` | Jam tidur | 0–24 |
| `previous_scores` | Nilai sebelumnya | 0–100 |
| `tutoring_sessions` | Sesi tutoring | Bilangan bulat, minimal 0 |
| `physical_activity` | Aktivitas fisik | 0–24 |

### Input kategorikal

Nilai pada kolom **Value API** bersifat case-sensitive. Label Indonesia hanya digunakan untuk tampilan.

| Field API | Value API |
| --- | --- |
| `parental_involvement` | `Low`, `Medium`, `High` |
| `access_to_resources` | `Low`, `Medium`, `High` |
| `motivation_level` | `Low`, `Medium`, `High` |
| `family_income` | `Low`, `Medium`, `High` |
| `teacher_quality` | `Low`, `Medium`, `High` |
| `extracurricular_activities` | `No`, `Yes` |
| `internet_access` | `No`, `Yes` |
| `learning_disabilities` | `No`, `Yes` |
| `school_type` | `Private`, `Public` |
| `peer_influence` | `Negative`, `Neutral`, `Positive` |
| `parental_education_level` | `High School`, `College`, `Postgraduate` |
| `distance_from_home` | `Near`, `Moderate`, `Far` |
| `gender` | `Female`, `Male` |

## Struktur folder

```text
src/
|-- app/                         # Root application dan global providers
|-- components/
|   |-- layout/                  # Brand dan status koneksi API
|   `-- ui/                      # NumberField dan SelectField reusable
|-- features/
|   |-- health/
|   |   |-- api/                 # Request GET /health
|   |   `-- hooks/               # TanStack Query health query
|   `-- prediction/
|       |-- api/                 # Request POST /predict dan API test
|       |-- components/          # Form, workspace, result, component test
|       |-- hooks/               # TanStack Query prediction mutation
|       |-- schemas/             # Zod schema 19 fitur dan schema test
|       `-- types/               # Kontrak TypeScript request/response
|-- lib/                         # Shared API client dan error handling
|-- styles/                      # Global styling dan responsive layout
|-- test/                        # Setup testing environment
|-- main.tsx                     # Entry point React
`-- vite-env.d.ts                # Type environment variable
```

Logika fetching tidak ditempatkan di komponen UI. Request API berada di folder `api`, lifecycle TanStack Query berada di `hooks`, sedangkan bentuk data dan validasi berada di `types` dan `schemas`.

## Script yang tersedia

| Command | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan development server pada port 3000. |
| `npm run build` | Menjalankan TypeScript check dan membuat production build. |
| `npm run lint` | Memeriksa kualitas kode dengan ESLint. |
| `npm run test` | Menjalankan seluruh test satu kali. |
| `npm run test:watch` | Menjalankan test dalam watch mode. |

Sebelum membuat pull request atau deployment, jalankan:

```bash
npm run lint
npm run test
npm run build
```

## Troubleshooting

### Status menampilkan “API offline”

- Pastikan Uvicorn sedang berjalan pada port `8000`.
- Buka `http://localhost:8000/health` untuk memastikan model berhasil dimuat.
- Periksa `NEXT_PUBLIC_API_URL` di `.env.local`.
- Restart `npm run dev` setelah mengubah environment variable.

### Browser menampilkan CORS error

Pastikan backend mengizinkan origin frontend:

```text
http://localhost:3000
http://127.0.0.1:3000
```

### API merespons 422 atau “Field required”

- Pastikan frontend tidak terhubung ke versi backend lama.
- Pastikan semua 19 field dikirim.
- Pastikan nama field sama persis dengan kontrak API.
- Pastikan nilai kategorikal memakai value Inggris dengan kapitalisasi yang benar.

### Dependency atau development server bermasalah

Pastikan versi Node.js memenuhi requirement, kemudian install ulang dependency menggunakan lockfile:

```bash
npm ci
```

## Catatan penggunaan hasil

Nilai yang ditampilkan merupakan estimasi model machine learning. Hasil sebaiknya digunakan sebagai insight pendukung dan bukan sebagai satu-satunya dasar keputusan akademik.
