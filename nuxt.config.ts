// https://nuxt.com/docs/api/configuration/nuxt-config
// import path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },

  //modulos de terceiros instalados
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    'nuxt-primevue',
    '@nuxtjs/color-mode',
    "@nuxtjs/seo"
  ],

  site: {
    url: process.env.SITE_URL,
  },
  
  ogImage: {
    fonts: ['Inter:400', 'Inter:700'],
  },

  runtimeConfig:{
    public:{
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.SITE_URL,
    }
  },

  css: ['primeicons/primeicons.css'],


  supabase:{
    redirect: false
  },
  
  imports: {
    dirs: ['./composables/useMarkdown/', './composables/useServices', './composables/useLogger'],
  },

  googleFonts: {
    base64: true,
    fontsDir: "assets/fonts",
    overwriting: true,
    families: {
      Inter: [300, 500, 800]
    },
  },

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: "lara",
      from: "@/assets/presets/lara/"
    },
  },
})