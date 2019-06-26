<template>
  <div id="appRoot">
    <template>
      <v-app :dark="$store.state.app.theme === 'dark'">
        <!--<core-filter/>-->

        <core-toolbar />

        <core-drawer />

        <core-view />
      </v-app>
    </template>
  </div>
</template>

<script>
import Toolbar from '~/components/core/Toolbar'
import Drawer from '~/components/core/Drawer'
import View from '~/components/core/View'

export default {
  components: {
    'core-toolbar': Toolbar,
    'core-drawer': Drawer,
    'core-view': View
  }
}
</script>
<style scoped lang="scss">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
