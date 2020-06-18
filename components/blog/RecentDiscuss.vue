<template>
  <v-layout>
    <v-flex md12>
      <v-card v-scroll-reveal.reset class="card">
        <v-card-title primary-title class="left_list_header">
          <h4 class="title font-weight-bold">近期评论</h4>
        </v-card-title>
        <v-card-text>
          <v-list>
            <template v-for="(comment, index) in comments">
              <v-divider
                v-if="index > 0 && index < comments.length"
                :key="comment.id"
                :inset="true"
              ></v-divider>
              <v-list-item :key="comment.id">
                <v-list-item-avatar>
                  <v-img :src="comment.fromAvatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    >{{ comment.fromName }} 在
                    <a :href="'/blog/' + comment.articleId">{{
                      comment.articleTitle
                    }}</a>
                    中说：</v-list-item-title
                  >
                  <v-list-item-subtitle
                    v-html="formateComment(comment.content)"
                  ></v-list-item-subtitle>
                  <v-list-item-action-text class="text-right">
                    {{ formateDateTime(comment.createDate) }}
                  </v-list-item-action-text>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Util from '@/util'

export default {
  name: 'RecentDiscuss',
  props: {
    comments: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    formateComment(content) {
      if (content != null && content !== '') {
        return Util.formateComment(content)
      } else {
        return ''
      }
    },
    formateDateTime(time) {
      if (time != null && time !== '') {
        return Util.formateDateTime(time)
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.left_list_header {
  h4 {
    margin: auto;
  }
}

.left_list_item {
  margin: 0.5rem 1.25rem;
  font-size: small;
  width: inherit;
}
</style>
