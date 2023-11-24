import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.REACT_APP_GITHUB_APIKEY': JSON.stringify(process.env.REACT_APP_GITHUB_APIKEY),
  },
  plugins: [react()],
})
