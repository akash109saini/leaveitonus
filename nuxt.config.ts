// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: '.',

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'Leave It On Us — Creator-Led Digital Marketing & Production Agency',
      meta: [
        { name: 'description', content: 'Build Attention & Scale Revenue with Creator-Led Marketing, Performance Ads, Talent Strategy, and Original Content IP. Leave It On Us.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0B0B0C' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' }
      ]
    }
  },

  build: {
    transpile: ['gsap']
  }
})
