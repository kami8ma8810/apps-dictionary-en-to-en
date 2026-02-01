// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt'
  ],

  ssr: false,

  runtimeConfig: {
    public: {
      wordnikApiKey: ''
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false,
    tsConfig: {
      include: ['../tests/**/*']
    }
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'EN-to-EN Dictionary',
      short_name: 'EN-to-EN',
      description: 'Look up English words with English definitions',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.dictionaryapi\.dev\/api\/v2\/entries\/en\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'dictionary-api-cache',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 60 * 60 * 24 * 30
            }
          }
        },
        {
          urlPattern: /^https:\/\/api\.dictionaryapi\.dev\/media\/pronunciations\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'pronunciation-audio-cache',
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24 * 90
            }
          }
        },
        {
          urlPattern: /^https:\/\/api\.wordnik\.com\/v4\/word\.json\/.*/i,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'wordnik-api-cache',
            expiration: {
              maxEntries: 500,
              maxAgeSeconds: 60 * 60 * 24 * 7
            }
          }
        }
      ]
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
