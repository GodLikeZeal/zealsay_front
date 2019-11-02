<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <nuxt />
      </v-fade-transition>
    </div>
    <!--    <core-footer v-if="$route.name !== 'Maps'" />-->
  </v-content>
</template>

<script>
// import Footer from '@/components/core/Footer'
export default {
  // components: {
  //   'core-footer': Footer
  // },
  metaInfo() {
    return {
      title: 'zealsay 后台管理系统'
    }
  }
}
</script>

<style scoped>
#core-view {
  padding-bottom: 200px;
}
</style>
