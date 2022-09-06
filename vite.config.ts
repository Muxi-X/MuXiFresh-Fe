import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],

  server: {
    port: 2022,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://fresh.muxixyz.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
      }
    }
  }
});