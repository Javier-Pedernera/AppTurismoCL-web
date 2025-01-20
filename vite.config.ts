import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
  plugins: [react()]
})
