import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const base = process.env.GITHUB_ACTIONS ? '/norway-trip-companion/' : '/'

export default defineConfig({
  base,
  server: {
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Norway Road Trip Companion',
        short_name: 'Norway Trip',
        description: 'Your offline Norway road-trip companion',
        theme_color: '#0B1720',
        background_color: '#0B1720',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,json}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tile\.openstreetmap\.org\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 21 },
            },
          },
        ],
      },
    }),
  ],
})
