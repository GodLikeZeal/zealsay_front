import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/es5/util/colors";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import zhHans from "vuetify/es5/locale/zh-Hans";

Vue.use(Vuetify);

export default new Vuetify({
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
    current: "zh-Hans"
  }
});
