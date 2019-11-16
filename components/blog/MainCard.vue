<template>
  <a v-if="blog" :herf="'/blog/' + blog.id" target="_Blank">
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
              <h6 class="caption text-none">
                {{ item.authorName }} 发表于
                {{ item.createDate | formatDate }}
                {{ item.readNum }}次浏览 {{ item.likeNum }}个点赞
              </h6>
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
import Util from '@/util'
export default {
  name: 'MainCard',
  filters: {
    formatDate(time) {
      if (time != null && time !== '') {
        return Util.formateDate(time)
      } else {
        return ''
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    blog: function() {
      return this.item
    }
  }
}
</script>

<style lang="scss" scoped></style>
