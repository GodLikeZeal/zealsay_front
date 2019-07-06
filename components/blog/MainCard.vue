<template>
  <a :herf="'/blog/' + blog.id" target="_Blank">
    <v-card class="card">
      <v-img
        transition="fade-transition"
        class="white--text cover"
        height="300px"
        width="100%"
        :src="blog.coverImage"
      >
        <v-container fill-height fluid justify-center>
          <v-layout fill-height align-center>
            <v-flex xs12 class="text-md-center">
              <span class="font-weight">
                {{ blog.categoryName }}
              </span>
              <h3 class="font-weight-medium">
                {{ blog.title }}
              </h3>
              <p class="Paragraph">
                {{ blog.subheading }}
              </p>
              <v-btn
                round
                nuxt
                color="primary"
                :to="'/blog/' + blog.id"
                target="_Blank"
                >阅读原文
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-card>
  </a>
</template>

<script>
export default {
  name: 'MainCard',
  props: ['item'],
  computed: {
    blog: function() {
      return this.item
    }
  }
}
</script>

<style lang="scss" scoped></style>
