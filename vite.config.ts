import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Base path: '/' en local. Para GitHub Pages se compila con
 * `npm run build:pages` (VITE_BASE_PATH=/chinese-vault/).
 */
const base = process.env.VITE_BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // SW propio (src/sw.ts): precache + clic de las notificaciones de racha
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png'],
      manifest: {
        name: 'Chinese Vault — aprende chino desde 0',
        short_name: 'Chinese Vault',
        description:
          'Aprende chino mandarín desde cero en tu refugio: tonos, pinyin, HSK 0-1 y retos diarios. Todo en español.',
        lang: 'es',
        dir: 'ltr',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#030804',
        background_color: '#030804',
        categories: ['education'],
        icons: [
          { src: `${base}icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: `${base}icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: `${base}icon-512-maskable.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: undefined as never, // (injectManifest usa la clave 'injectManifest' — ver abajo)
      injectManifest: {
        // App shell + fuentes + TODO el audio del curso (offline total).
        // OJO: en modo injectManifest las opciones van AQUÍ, no bajo 'workbox'
        // (bajo 'workbox' se IGNORAN silenciosamente — bug histórico).
        globPatterns: ['**/*.{js,css,html,svg,woff2,woff,ttf}', 'audio/*.mp3'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    }),
  ],
})
