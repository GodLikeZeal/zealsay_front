<!--评论模块-->
<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex sm12>
        <h3>4人评论</h3>
        <v-list two-line>
          <template v-for="comment in comments">
            <v-list-item :key="comment.id" v-scroll-reveal.reset>
              <v-list-item-avatar class="comment-avatar">
                <v-img :src="comment.fromAvatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ comment.fromName }} </v-list-item-title>
                <v-list-item-subtitle class="comment-subtitle">
                  {{ comment.content }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="caption comment-button">
                  <v-icon small>mdi-thumb-up-outline</v-icon>
                  <span class="comment-button-text">1人赞</span>
                  <a @click="inputComment(comment)">
                    <v-icon small>mdi-comment-outline</v-icon>
                    <span class="comment-button-text">回复</span>
                  </a>
                  <span class="comment-button-text">{{ comment.date }}</span>
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <reply
                    :comment="comment"
                    :show="comment.inputText"
                    @handleCancel="handleCancel"
                  ></reply>
                </v-list-item-subtitle>
                <v-list v-if="comment.replys" two-line>
                  <template v-for="reply in comment.replys">
                    <v-list-item :key="reply.id" v-scroll-reveal.reset>
                      <v-list-item-avatar class="comment-avatar">
                        <v-img :src="reply.fromAvatar"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          reply.fromName
                        }}</v-list-item-title>
                        <v-list-item-subtitle class="comment-subtitle">{{
                          reply.content
                        }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="caption comment-button">
                          <v-icon small>mdi-thumb-up-outline</v-icon>
                          <span class="comment-button-text">赞</span>
                          <a @click="inputComment(reply)">
                            <v-icon small>mdi-comment-outline</v-icon>
                            <span class="comment-button-text">回复</span>
                          </a>
                          <span class="comment-button-text">{{
                            reply.date
                          }}</span>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle>
                          <reply
                            :comment="reply"
                            :show="reply.inputText"
                            @handleCancel="handleCancel"
                          ></reply>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <v-form>
          <v-layout>
            <v-flex>
              <h3>发表评论</h3>
              <v-switch label="那我不是机器人呀"></v-switch>
              <v-textarea hide-details label="善意回帖，理性发言"></v-textarea>
              <v-btn tile icon color="primary">
                <v-icon>mdi-emoticon-happy</v-icon>
              </v-btn>
              <v-btn color="primary" class="float-right">发表评论</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Reply from '@/components/blog/Reply'
export default {
  components: {
    reply: Reply
  },
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    emojis: [
      { title: '微笑', url: require('@/static/image/smilies/arrow.png') },
      { title: '大哭', url: require('@/static/image/smilies/biggrin.png') },
      { title: '困惑', url: require('@/static/image/smilies/confused.png') },
      { title: '酷', url: require('@/static/image/smilies/cool.png') },
      { title: '牛皮', url: require('@/static/image/smilies/cowboy.png') }
    ]
  }),
  methods: {
    handleCancel(comment) {
      comment.inputText = false
    },
    inputComment(comment) {
      comment.inputText = true
    }
  }
}
</script>

<style scoped lang="scss">
.comment-subtitle {
  margin: 0.5rem 0;
  white-space: inherit;
}
.comment-avatar {
  align-self: flex-start;
}
.comment-button {
  font-size: smaller;
  font-weight: 300;
}
.comment-button-text {
  margin-right: 1rem;
}
.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>
