import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  modules: ['@pinia/nuxt', '@nuxt/fonts', 'nuxt-icon'],
  fonts: {
    families: [{ name: 'Poppins', provider: 'google' }]
  },
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_TOKEN,
      BASE_API: process.env.BASE_API
    }
  }
})
