import vue from '@vitejs/plugin-vue'
import analyzer from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services')
    }
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    hmr: {
      overlay: true
    }
  },
  plugins: [vue(), analyzer({ summaryOnly: true })]
})
