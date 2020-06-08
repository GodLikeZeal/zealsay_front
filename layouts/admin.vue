<template>
  <keep-alive>
    <v-app v-if="mounted" id="app" :dark="$store.state.app.theme === 'dark'">
      <!--<core-filter/>-->

      <core-toolbar />

      <core-drawer />

      <core-view />
    </v-app>
  </keep-alive>
</template>

<script>
import Toolbar from '@/components/core/Toolbar'
import Drawer from '@/components/core/Drawer'
import View from '@/components/core/View'
import { EnumColor } from '@/util/constans'
import { mapState } from 'vuex'
export default {
  components: {
    'core-toolbar': Toolbar,
    'core-drawer': Drawer,
    'core-view': View
  },
  data: () => ({
    mounted: false
  }),
  mounted() {
    setTimeout(() => {
      this.mounted = true
    }, 0)
  },
  created() {
    let color = '#4caf50'
    if (!this.$isServer) {
      const str = localStorage.getItem('vuex')
      let val
      let dark
      if (str) {
        val = JSON.parse(str).app.color
        dark = JSON.parse(str).app.dark
        color = EnumColor[val]
        this.$vuetify.theme.dark = dark
      }
    }
    setTimeout(() => {
      this.$vuetify.theme.themes.light.primary = color
      this.$vuetify.theme.themes.dark.primary = color
    }, 5)
  },
  computed: {
    ...mapState('app', ['dark'])
  }
}
</script>
<style scoped lang="scss">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
