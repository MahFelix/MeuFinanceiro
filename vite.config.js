import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/public/index.html',  // Certifique-se de que isso está correto
    },
  },
});

