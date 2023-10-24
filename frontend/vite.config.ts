import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/graphql/*': {
        target: 'http://localhost:8080/graphql',
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace('/graphql', '')
      }
    }
  }
})
