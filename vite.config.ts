import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://119.3.2.168:2022',
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '/api')
        }
      }
    }
  }
})
