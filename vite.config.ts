import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/frontier/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(packageJson.version)
  }
})
