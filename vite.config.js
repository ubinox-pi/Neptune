import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        cookieDomainRewrite: '', // rewrite Set-Cookie Domain to current host (localhost)
        cookiePathRewrite: '/',   // ensure cookie path works for the app
      },
    },
    origin: 'http://localhost:5173'
  }
})
