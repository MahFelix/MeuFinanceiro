import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // A pasta de saída da build
  },
  server: {
    open: true, // Abrir no navegador ao iniciar
  },
});
