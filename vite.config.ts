import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base keeps the build portable across GitHub Pages project paths.
  base: './',
  plugins: [react()],
})
