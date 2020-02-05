import { set, toggle } from '@/util/vuex'

export default {
  setToken: set('token'),
  setDrawer: set('drawer'),
  setDark: set('dark'),
  setImage: set('image'),
  setColor: set('color'),
  setTheme: set('theme'),
  setSlider: toggle('slider'),
  toggleDrawer: toggle('drawer')
}
