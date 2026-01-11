import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@mi-empresa/ui': '../../packages/ui/src',
      '@mi-empresa/utils': '../../packages/utils/src'
    }
  }
})