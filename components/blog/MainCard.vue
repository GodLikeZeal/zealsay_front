<template>
  <a v-if="blog" :herf="'/blog/' + blog.id" target="_Blank">
    <v-card class="card">
      <v-img
        :src="blog.coverImage"
        transition="fade-transition"
        class="white--text cover"
        height="300px"
        width="100%"
      >
        <v-container>
          <v-row class="text-center">
            <v-col cols="12">
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
                :to="'/blog/' + blog.id"
                rounded
                color="primary"
                target="_Blank"
                >阅读原文
              </v-btn>
            </v-col>
          </v-row>
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
      default() {
        return {}
      }
    }
  },
  computed: {
    blog() {
      return this.item
    }
  }
}
</script>

<style lang="scss" scoped></style>
