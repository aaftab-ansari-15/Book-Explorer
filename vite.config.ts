import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: [
        /@rollup\/rollup-linux-x64-gnu/,
        /@rollup\/rollup-linux-x64-musl/,
        /@rollup\/rollup-darwin-x64/,
        /@rollup\/rollup-win32-x64/,
        /@rollup\/rollup-win32-ia32/
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux']
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs', '.ts', '.tsx']
    }
  },
  optimizeDeps: {
    exclude: [
      '@rollup/rollup-linux-x64-gnu',
      '@rollup/rollup-linux-x64-musl',
      '@rollup/rollup-darwin-x64',
      '@rollup/rollup-win32-x64',
      '@rollup/rollup-win32-ia32'
    ]
  }
});
