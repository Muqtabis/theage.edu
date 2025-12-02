import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for ES Modules

// FIX: Define __filename and __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL FIX: Directs Vite to look for the .env file in the project root folder (one level up).
  envDir: '../', 
  
  // Ensure base path is root
  base: '/',
  
  // Standard path alias setup. Now correctly uses the defined __dirname.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})