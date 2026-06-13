import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022', // outputs modern, lighter JS without browser polyfills
    cssCodeSplit: true, // split CSS to load style chunks only when needed
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) {
              return 'animation-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
