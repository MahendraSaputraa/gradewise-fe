import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: { port: 3000 },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
