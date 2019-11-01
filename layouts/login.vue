<template>
  <div id="appRoot">
    <v-app id="app" :dark="$store.state.app.theme === 'dark'">
      <transition name="fade">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </transition>
    </v-app>
  </div>
</template>
<script>
import { EnumColor } from '@/util/constans'

export default {
  created() {
    let color = '#4caf50'
    if (!this.$isServer) {
      const str = localStorage.getItem('vuex')
      let val
      if (str) {
        val = JSON.parse(str).app.color
        color = EnumColor[val]
      }
    }
    setTimeout(() => {
      this.$vuetify.theme.primary = color
    }, 0)
  }
}
</script>
<style scoped lang="css">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
#app {
  background: none;
  overflow: hidden;
}
</style>
