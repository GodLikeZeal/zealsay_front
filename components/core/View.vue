<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer v-if="$route.name !== 'Maps'" />
  </v-content>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'zealsay 后台管理系统'
    }
  }
}
</script>

<style scoped>
#core-view {
  padding-bottom: 100px;
}
</style>
