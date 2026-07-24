import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/norway-roadtrip-companion/' : '/',
  plugins: [react(), VitePWA({ registerType: 'prompt', includeAssets: ['icon.svg'], manifest: { name: 'Norway Road Trip', short_name: 'Norway Trip', description: 'Your offline Norway road-trip companion', theme_color: '#0b1f2a', background_color: '#f7f8f6', display: 'standalone', icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }] }, workbox: { globPatterns: ['**/*.{js,css,html,svg,json}'], runtimeCaching: [{ urlPattern: /^https:\/\/tile\.openstreetmap\.org\//, handler: 'CacheFirst', options: { cacheName: 'map-tiles', expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 21 } } }] } })]
})
