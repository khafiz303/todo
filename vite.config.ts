import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import path from 'path'
import {VitePWA} from 'vite-plugin-pwa'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve:{
//     alias:{
//       '@': path.resolve(__dirname, 'src')
//     }
//   }
// })

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'ToDo App',
        short_name: 'ToDo',
        description: 'Простой таск-менеджер с уведомлениями',
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
})