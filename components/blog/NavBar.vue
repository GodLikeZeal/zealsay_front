<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar color="primary" dark flat>
    <nuxt-link to="/">
      <v-avatar tile>
        <img src="@/static/image/logo/cat.png" alt="logo" />
      </v-avatar>
      <v-toolbar-title style="display: inline-flex;" class="white--text"
        >zealsay
      </v-toolbar-title>
    </nuxt-link>
    <v-spacer></v-spacer>

    <v-toolbar-items style="margin-right:8rem">
      <v-btn nuxt to="/" flat>主页</v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            博客
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in categorys" :key="index">
            <nuxt-link :to="'/blog/category/' + item.id">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </nuxt-link>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn nuxt to="/blog/friend" flat>友链</v-btn>
      <v-btn nuxt to="/blog/about" flat>关于</v-btn>
      <v-btn flat>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['category'],
  computed: {
    categorys: function() {
      return this.category
    }
  }
}
</script>

<style scoped></style>
