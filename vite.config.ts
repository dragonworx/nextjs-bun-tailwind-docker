import { defineConfig } from 'vite';
import { resolve } from 'path';
import { PORTS } from './config/ports';
import { htmlStringPlugin } from './vite/vite-plugin-html-string';
import { fileBasedRoutesPlugin } from './vite/vite-plugin-file-routes';
import { getRouteEntries } from './vite/vite-build-routes';

export default defineConfig({
  root: './',
  base: '/',
  publicDir: 'assets',
  plugins: [
    htmlStringPlugin(),
    fileBasedRoutesPlugin('client/routes'),
  ],
  build: {
    outDir: 'public',
    emptyOutDir: true,
    rollupOptions: {
      input: getRouteEntries('client/routes'),
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
      '@': resolve(__dirname, './client'),
      '@lib': resolve(__dirname, './client/lib'),
      '@components': resolve(__dirname, './client/lib/components'),
      '@dashboard': resolve(__dirname, './client/dashboard'),
      '@routes': resolve(__dirname, './client/routes'),
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