import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: {
      '@mudssky/react-components': path.resolve(__dirname, './src/index.ts'),
      '@': path.resolve(__dirname, './src'),
    },
    environmentMatchGlobs: [['test/hook/**', 'jsdom']],
  },
})
