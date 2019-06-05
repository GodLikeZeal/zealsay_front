<template>
  <div id="appRoot">
    <transition>
      <keep-alive>
        <nuxt />
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
