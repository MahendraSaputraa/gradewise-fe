# Gradewise

Frontend modern untuk Student Graduation Prediction API berbasis FastAPI.

## Menjalankan aplikasi

1. Salin `.env.example` menjadi `.env.local`.
2. Pastikan backend berjalan di `http://localhost:8000`.
3. Jalankan `npm install` lalu `npm run dev`.
4. Buka `http://localhost:3000`.

## Struktur utama

```text
src/
├── app/                 # Root aplikasi dan provider global
├── components/
│   ├── layout/          # Brand, header, status API
│   └── ui/              # Komponen input reusable
├── features/
│   ├── health/          # API dan query health check
│   └── prediction/
│       ├── api/         # Fungsi request endpoint
│       ├── components/  # Form, workspace, dan hasil
│       ├── hooks/       # TanStack Query mutation
│       ├── schemas/     # Zod schema dan test
│       └── types/       # Kontrak TypeScript API
├── lib/                 # HTTP client bersama
├── styles/              # Styling global
└── test/                # Setup automated test
```

Variabel `NEXT_PUBLIC_API_URL` tetap digunakan sesuai kontrak proyek. Vite dikonfigurasi untuk membaca prefix `NEXT_PUBLIC_`.
