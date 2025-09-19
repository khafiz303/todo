import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as  path from 'path'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'MTApp',
        short_name: 'MTP',
        description: 'just app with notificaiton',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
    resolve:{
    alias:{
      '@': path.resolve(__dirname, 'src')
    },
  }
})