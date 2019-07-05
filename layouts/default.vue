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
export default {
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
<style scoped lang="css">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
#app {
  background: none;
}
</style>
