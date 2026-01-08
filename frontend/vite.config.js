import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../backend/certs/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../backend/certs/cert.crt')),
    },
    port: 5173, // your frontend HTTPS port
    proxy: {
      '/api': {
        target: 'https://localhost:5174', // backend HTTPS
        changeOrigin: true,
        secure: false, // because we use self-signed cert
      },
    },
  },
})
