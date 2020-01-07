// vuetify.options.js
import zhHans from 'vuetify/es5/locale/zh-Hans'

export default function({ app }) {
  return {
    // lang: {
    //   t: (key, ...params) => app.i18n.t(key, params)
    // },
    theme: {
      primary: '#1976d2',
      secondary: '#ffc6bf',
      accent: '#816ad6',
      error: '#f375b5',
      info: '#00cec9',
      success: '#00b894',
      warning: '#fcd783'
    },
    lang: {
      locales: { zhHans },
      current: 'zh-Hans'
    }
  }
}
