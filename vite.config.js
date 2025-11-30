import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE || '/artflow-pc-ui/'
  return {
    base,
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
  }
})
