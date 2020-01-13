<template>
  <transition>
    <keep-alive>
      <template v-if="$route.meta.public">
        <v-app class="no-background">
          <router-view></router-view>
        </v-app>
      </template>
      <template v-else>
        <v-app>
          <!--<core-filter/>-->

          <core-toolbar />

          <core-drawer />

          <core-view />
        </v-app>
      </template>
    </keep-alive>
  </transition>
</template>

<script></script>
<style scoped lang="scss">
.no-background {
  background-color: #ffffff !important;
}
</style>
