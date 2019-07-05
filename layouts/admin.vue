<template>
  <div id="appRoot">
    <template>
      <transition name="fade">
        <v-app id="app" :dark="$store.state.app.theme === 'dark'">
          <!--<core-filter/>-->

          <core-toolbar />

          <core-drawer />

          <core-view />
        </v-app>
      </transition>
    </template>
  </div>
</template>

<script>
import Toolbar from '@/components/core/Toolbar'
import Drawer from '@/components/core/Drawer'
import View from '@/components/core/View'

export default {
  components: {
    'core-toolbar': Toolbar,
    'core-drawer': Drawer,
    'core-view': View
  },
  created() {
    let color = '#4caf50'
    if (!this.$isServer) {
      const str = localStorage.getItem('vuex')
      let val
      if (str) {
        val = JSON.parse(str).app.color
      }
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
    }
    setTimeout(() => {
      this.$vuetify.theme.primary = color
    }, 0)
  }
}
</script>
<style scoped lang="scss">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
