import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import { config } from 'dotenv'
config()

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin()
  ],
  server: {
    port: Number(process.env.VITE_FRONTEND_PORT) || 5002,
    host: process.env.VITE_FRONTEND_HOST || '0.0.0.0'
  }
})
