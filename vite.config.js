import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/artflow-pc-ui/',
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/sd': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
