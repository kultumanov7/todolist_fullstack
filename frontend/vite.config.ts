import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'vite-plugin-sass';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sass()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
})
