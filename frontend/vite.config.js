import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy all /api requests to the backend Express server.
      // The backend MUST be running on port 5000 (set in backend/.env PORT=5000).
      // If you see 502 errors, ensure the backend is started first: npm run dev (in /backend).
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('\n[Vite Proxy ERROR] Cannot reach backend at http://localhost:5000');
            console.error('  → Make sure the backend is running: cd backend && npm run dev');
            console.error('  → Error:', err.message, '\n');
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            // Uncomment to debug all proxied requests:
            // console.log('[Proxy →]', req.method, req.url);
          });
        }
      }
    }
  }
})
