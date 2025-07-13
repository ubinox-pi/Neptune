import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: ['f740-2409-40e5-2040-2355-4506-4999-a4b1-4e5f.ngrok-free.app'],
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    origin: 'http://localhost:5173' // <- explicitly set origin
  }
})
