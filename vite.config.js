import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icon-*.png'],
      manifest: {
        name: '世界遗产打卡',
        short_name: '遗产打卡',
        description: '记录和分享你的世界遗产探索之旅',
        theme_color: '#4a90e2',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        // 缓存策略：优先使用缓存，网络故障时使用离线版本
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        // 运行时缓存配置 - 兼容小程序迁移（小程序也有类似的网络请求缓存机制）
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 天
              }
            }
          }
        ]
      },
      // 开发时也启用 PWA，方便测试
      devOptions: {
        enabled: false
      }
    })
  ]
})
