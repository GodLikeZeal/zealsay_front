import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Card from '@/components/material/Card'
import ChartCard from '@/components/material/ChartCard'
import StatsCard from '@/components/material/StatsCard'
import Footer from '@/components/core/Footer'
import BFooter from '@/components/blog/Footer'
import BackToTop from '@/components/core/BackToTop'

Vue.component('material-card', Card)
Vue.component('material-chart-card', ChartCard)
Vue.component('material-stats-card', StatsCard)
Vue.component('core-footer', Footer)
Vue.component('blog-footer', BFooter)
Vue.component('back-to-top', BackToTop)
