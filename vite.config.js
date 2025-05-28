// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'https://github.com/dev-siddhant/gdrive-ddl', // <- IMPORTANT
  plugins: [react()],
})

