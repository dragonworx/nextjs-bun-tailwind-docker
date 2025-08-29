import { defineConfig } from 'vite';
import { resolve } from 'path';
import { PORTS } from './config/ports';
import { htmlStringPlugin } from './src/lib/vite-plugin-html-string';
import { fileBasedRoutesPlugin } from './src/lib/vite-plugin-file-routes';
import { getRouteEntries } from './src/lib/vite-build-routes';

export default defineConfig({
  root: './',
  base: '/',
  publicDir: 'assets',
  plugins: [
    htmlStringPlugin(),
    fileBasedRoutesPlugin('src/routes'),
  ],
  build: {
    outDir: 'public',
    emptyOutDir: true,
    rollupOptions: {
      input: getRouteEntries('src/routes'),
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    target: 'esnext',
    minify: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@lib': resolve(__dirname, './src/lib'),
      '@components': resolve(__dirname, './src/lib/components'),
      '@dashboard': resolve(__dirname, './src/dashboard'),
      '@routes': resolve(__dirname, './src/routes'),
      '@config': resolve(__dirname, './config'),
      '@assets': resolve(__dirname, './assets'),
    },
  },
  server: {
    port: PORTS.CLIENT, // Port 3000 - what users access
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: `http://localhost:${PORTS.API}`, // Proxy to API on port 3001
        changeOrigin: true,
      },
    },
    middlewareMode: false,
  },
  preview: {
    port: PORTS.CLIENT,
    host: true,
  },
});