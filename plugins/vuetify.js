import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import '@mdi/font/css/materialdesignicons.css'
import { Ripple } from 'vuetify/lib/directives'
import Avatar from 'vue-avatar'
import Card from '@/components/material/Card'
import ChartCard from '@/components/material/ChartCard'
import StatsCard from '@/components/material/StatsCard'
import Footer from '@/components/core/Footer'
import VAvatarUploader from 'vuetify-avatar-uploader'

export default ({ store }) => {
  const val = store.state.app.color
  // eslint-disable-next-line no-console
  console.log(val)
  let color
  if (val === 'primary') {
    color = '#9c27b0'
  } else if (val === 'info') {
    color = '#00bcd4'
  } else if (val === 'success') {
    color = '#4caf50'
  } else if (val === 'warning') {
    color = '#ff9800'
  } else if (val === 'danger') {
    color = '#f44336'
  } else {
    color = '#4caf50'
  }
  Vue.use(Vuetify, {
    theme: {
      primary: color,
      secondary: '#4caf50',
      tertiary: '#495057',
      accent: '#82B1FF',
      error: '#f55a4e',
      info: '#00d3ee',
      success: '#5cb860',
      warning: '#ffa21a'
    },
    iconfont: 'mdi',
    directives: {
      Ripple
    },
    lang: {
      locales: { zhHans },
      current: 'zh-Hans'
    }
  })

  Vue.component('material-card', Card)
  Vue.component('material-chart-card', ChartCard)
  Vue.component('material-stats-card', StatsCard)
  Vue.component('core-footer', Footer)
  Vue.component('avatar', Avatar)
  Vue.component('v-avatar-uploader', VAvatarUploader)
}
