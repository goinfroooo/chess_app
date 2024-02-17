import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteSassPlugin from 'vite-plugin-sass';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteSassPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
