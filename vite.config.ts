import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Flashcard App",
        short_name: "Flashcards",
        description: "A lightweight flashcard website.",
        theme_color: "#ffffff",
        icons: [
          {
            src: 'favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: 'favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
          src: 'apple-touch-icon.png',
          sizes: '192x192',
          type: 'image/png',
          }
        ]
      }
    })
  ],
  base: process.env.NODE_ENV === "production" ? "/flashcard-app/" : "/"
})
