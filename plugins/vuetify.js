import colors from 'vuetify/es5/util/colors'
import zhHans from 'vuetify/es5/locale/zh-Hans'

export default {
  customVariables: ['~/assets/variables.scss'],
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.lightBlue.lighten1,
        warning: colors.amber.base,
        error: colors.pink.lighten2,
        success: colors.green.accent3
      },
      dark: {
        primary: colors.blue.darken4,
        accent: colors.grey.darken4,
        secondary: colors.amber.darken4,
        info: colors.lightBlue.darken3,
        warning: colors.amber.darken4,
        error: colors.pink.darken2,
        success: colors.green.darken4
      }
    }
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  }
}
