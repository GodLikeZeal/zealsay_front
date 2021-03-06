import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'
import Card from '@/components/material/Card'
import ChartCard from '@/components/material/ChartCard'
import StatsCard from '@/components/material/StatsCard'
import Footer from '@/components/core/Footer'
import BFooter from '@/components/blog/Footer'
import BackToTop from '@/components/core/BackToTop'
import Vue from 'vue'
import countTo from 'vue-count-to'
import { slider, slideritem } from 'vue-concise-slider'

Vue.component('material-card', Card)
Vue.component('material-chart-card', ChartCard)
Vue.component('material-stats-card', StatsCard)
Vue.component('core-footer', Footer)
Vue.component('blog-footer', BFooter)
Vue.component('core-back-to-top', BackToTop)
Vue.component('count-to', countTo)
Vue.component('slider', slider)
Vue.component('slider-item', slideritem)
