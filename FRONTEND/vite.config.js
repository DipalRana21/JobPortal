import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import autoprefixer from 'autoprefixer';

import path from "path";




export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Allows `@/redux/authSlice`
    },
  },

 
})






