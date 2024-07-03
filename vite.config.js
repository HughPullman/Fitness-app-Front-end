import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/config/setup.js"],
    testMatch: ["./tests/**/*.test.jsx$?"],
    globals: true,
    coverage: {
      provider: "istanbul", // or 'v8'
    },
    json: {
      namedExports: true
    }
  },
  define: {
    'process.env': process.env
  }
});
