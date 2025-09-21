import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: '.',
  base: process.env.NODE_ENV === 'production' ? '/svg-animation/' : '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
  },
  plugins: [
    vue(),
    svgLoader(),
    tailwindcss(),
  ],
})
