<template>
  <div id="appRoot">
    <v-app :dark="$store.state.app.theme === 'dark'">
      <transition>
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
</style>
