// vuetify.options.js
import zhHans from 'vuetify/es5/locale/zh-Hans'

export default function({ app }) {
  return {
    // lang: {
    //   t: (key, ...params) => app.i18n.t(key, params)
    // },
    theme: {
      primary: '#4caf50',
      secondary: '#4caf50',
      tertiary: '#495057',
      accent: '#82B1FF',
      error: '#f55a4e',
      info: '#00d3ee',
      success: '#5cb860',
      warning: '#ffa21a'
    },
    lang: {
      locales: { zhHans },
      current: 'zh-Hans'
    }
  }
}
