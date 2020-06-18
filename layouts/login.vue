<template>
  <v-app v-if="mounted" id="app" :dark="$store.state.app.theme === 'dark'">
    <transition name="fade">
      <keep-alive>
        <nuxt />
      </keep-alive>
    </transition>
  </v-app>
</template>
<script>
import { EnumColor } from '@/util/constans'

export default {
  data: () => ({
    mounted: false
  }),
  mounted() {
    setTimeout(() => {
      this.mounted = true
    }, 10)
  },
  created() {
    let color = '#00b894'
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
