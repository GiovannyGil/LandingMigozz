import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/pre-register': {
        target: 'https://migos-ms-895592952324.us-central1.run.app',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
