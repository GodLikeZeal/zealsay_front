import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/material/loading.vue',

  /*
   ** Global CSS
   */
  css: [
    'material-design-icons-iconfont/dist/material-design-icons.css',
    'vuetify/dist/vuetify.min.css',
    '~/assets/style/app.styl',
    'chartist/dist/chartist.min.css',
    '~/assets/scss/styles/index.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/vuetify', ssr: true },
    { src: '@/plugins/sweetalert2', ssr: false },
    { src: '@/plugins/chartist', ssr: true },
    { src: '@/plugins/vue-perfect-scrollbar', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
  ],
  /*
   ** auth middleware
   */
  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/authentication/login',
            method: 'post',
            propertyName: 'data.token'
          },
          logout: { url: '/api/v1/authentication/logout', method: 'get' },
          user: {
            url: '/api/v1/authentication/user',
            method: 'get',
            propertyName: 'data'
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer '
      }
    },
    redirect: {
      login: '/admin/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    watchLoggedIn: true // 默认为true
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: '/api/',
    proxy: true, // Can be also an object with default options
    credentials: true
  },

  proxy: {
    '/api/': {
      target: 'http://localhost:8090',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
