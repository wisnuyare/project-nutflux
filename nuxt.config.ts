export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css","swiper/swiper-bundle.css"],

  runtimeConfig: {
    public: {
      tmdbApiKey: import.meta.env.YOUR_API_KEY,
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],
  compatibilityDate: "2025-02-18",
})