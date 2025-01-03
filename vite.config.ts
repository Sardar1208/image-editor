import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      // Alias to access wasm files from outside src
      '@wasm': './rust/pkg',
    },
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: /node_modules/,
  },
})
