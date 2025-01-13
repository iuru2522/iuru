// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  runtimeConfig: {
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
    public: {
      TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
      TWITCH_REDIRECT_URI: process.env.TWITCH_REDIRECT_URI
    }
  }
})
