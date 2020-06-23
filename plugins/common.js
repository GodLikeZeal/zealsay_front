import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'
import Card from '@/components/material/Card'
import ChartCard from '@/components/material/ChartCard'
import StatsCard from '@/components/material/StatsCard'
import Footer from '@/components/core/Footer'
import Vue from 'vue'
import countTo from 'vue-count-to'

Vue.component('material-card', Card)
Vue.component('material-chart-card', ChartCard)
Vue.component('material-stats-card', StatsCard)
Vue.component('core-footer', Footer)
Vue.component('count-to', countTo)
