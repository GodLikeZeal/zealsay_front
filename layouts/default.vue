<template>
  <div id="appRoot">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<style scoped lang="css">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
