// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 compatibilityDate: '2024-11-01',
 future: { compatibilityVersion: 4 },
 nitro: {
  experimental: {
   // Enable Server API documentation within NuxtHub
   openAPI: true,
  },
 },
 // Development
 devtools: { enabled: true },

 runtimeConfig: {
  // Server
  server_back_end: process.env.SERVER_BACKEND_URL,
  server_front_end: process.env.SERVER_FRONTEND_URL,

  // Client
  public: {
   node_env: process.env.NODE_ENV,
   client_back_end: process.env.CLIENT_BACKEND_URL,
   client_front_end: process.env.CLIENT_FRONTEND_URL,
   image_urls_to_remove: process.env.IMAGE_URLS_TO_REMOVE,
   gtm: {
    enabled: false,
    id: process.env.GTM_ID,
    defer: true,
    loadScript: true,
    enableRouterSync: true,
   },
  },
 },

 modules: ['@nuxt/fonts', 'nuxt-vitalizer', '@nuxt/image', '@nuxt/eslint'],

 fonts: {
  families: [
   { name: 'Martel', provider: 'google' },
   { name: 'Source Sans 3', provider: 'google' },
  ],
  experimental: {
   processCSSVariables: true,
  },
 },

 vite: {
  css: {
   preprocessorOptions: {
    scss: {
     api: 'modern-compiler', // or "modern"
    },
   },
  },
  build: {
   modulePreload: false,
  },
 },

 vitalizer: {
  disableStylesheets: 'entry',
  disablePrefetchLinks: true,
  disablePreloadLinks: true,
 },

 // Expose global components
 components: {
  dirs: [
   {
    path: '~/components/theme',
    global: true,
   },
   // Add this if you want to expose all icons globally
   // This is great for using an <SvgIcon> component w/ <component :is="iconName" />
   {
    path: '~/components/svgs',
    global: true,
   },
   '~/components',
  ],
 },

 routeRules: {
  '/': { isr: 3600 },
 },
});
