import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/vidiq': {
        target: 'https://api.vidiq.com/youtube/channels/public/channel-pages',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vidiq/, '')
      }
    }
  }
})
