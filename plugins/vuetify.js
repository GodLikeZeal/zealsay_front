import Vue from 'vue'
import Vuetify from 'vuetify'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import '@mdi/font/css/materialdesignicons.css'
import { Ripple } from 'vuetify/lib/directives'
import Card from '~/components/material/Card'
import ChartCard from '~/components/material/ChartCard'
import StatsCard from '~/components/material/StatsCard'

Vue.use(Vuetify, {
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
