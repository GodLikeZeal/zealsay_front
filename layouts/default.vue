<template>
  <v-app v-if="mounted" id="app" :dark="$store.state.app.theme === 'dark'">
    <keep-alive>
      <nuxt />
    </keep-alive>
  </v-app>
</template>
<script>
import { EnumColor } from '@/util/constans'
import { mapState } from 'vuex'

export default {
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
<style scoped lang="css">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
#app {
  background: none;
}
</style>
