import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const portString = '5002'
const port = parseInt(portString)


// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    port: port  
  }
})

