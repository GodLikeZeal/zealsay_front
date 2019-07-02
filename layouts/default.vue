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

<style scoped lang="css">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
#app {
  background: none;
}
</style>
