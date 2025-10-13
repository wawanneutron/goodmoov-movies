import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [{ name: 'Poppins', provider: 'google' }]
  }
})
