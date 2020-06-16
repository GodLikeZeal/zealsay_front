<!--评论模块-->
<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex sm12>
        <h3>4人评论</h3>
        <v-list two-line>
          <template v-for="comment in comments">
            <v-list-item :key="comment.id">
              <v-list-item-avatar class="comment-avatar">
                <v-img :src="comment.fromAvatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ comment.fromName }}</v-list-item-title>
                <v-list-item-subtitle class="comment-subtitle">
                  {{ comment.content }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="caption comment-button">
                  <template v-if="comment.likeNum == 0">
                    <a>
                      <v-icon v-if="comment.thumbUp" small>mdi-thumb-up</v-icon>
                      <v-icon v-else small>mdi-thumb-up-outline</v-icon>
                    </a>
                    <span class="comment-button-text">赞</span>
                  </template>
                  <template v-else>
                    <a>
                      <v-icon v-if="comment.thumbUp" small>mdi-thumb-up</v-icon>
                      <v-icon v-else small>mdi-thumb-up-outline</v-icon>
                    </a>
                    <span class="comment-button-text"
                      >{{ comment.likeNum }}人赞</span
                    >
                  </template>
                  <a v-show="loggedIn" @click="inputComment(comment)">
                    <v-icon small>mdi-comment-outline</v-icon>
                    <span class="comment-button-text">回复</span>
                  </a>
                  <span class="comment-button-text">{{ comment.date }}</span>
                </v-list-item-subtitle>
                <v-list-item-subtitle class="reply-subtitle">
                  <reply
                    :comment="comment"
                    :show="comment.inputText"
                    @handleCancel="handleCancel"
                  ></reply>
                </v-list-item-subtitle>
                <v-list v-if="comment.replys" two-line>
                  <template v-for="reply in comment.replys">
                    <v-list-item :key="reply.id">
                      <v-list-item-avatar class="comment-avatar">
                        <v-img :src="reply.fromAvatar"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          >{{ reply.fromName }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="comment-subtitle"
                          >{{ reply.content }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="caption comment-button">
                          <template v-if="reply.likeNum == 0">
                            <a>
                              <v-icon v-if="reply.thumbUp" small
                                >mdi-thumb-up
                              </v-icon>
                              <v-icon v-else small>mdi-thumb-up-outline</v-icon>
                            </a>
                            <span class="comment-button-text">赞</span>
                          </template>
                          <template v-else>
                            <a>
                              <v-icon v-if="reply.thumbUp" small
                                >mdi-thumb-up
                              </v-icon>
                              <v-icon v-else small>mdi-thumb-up-outline</v-icon>
                            </a>

                            <span class="comment-button-text"
                              >{{ comment.likeNum }}人赞</span
                            >
                          </template>
                          <a v-show="loggedIn" @click="inputComment(reply)">
                            <v-icon small>mdi-comment-outline</v-icon>
                            <span class="comment-button-text">回复</span>
                          </a>
                          <span class="comment-button-text">{{
                            reply.date
                          }}</span>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="reply-subtitle">
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
              <v-form v-if="loggedIn">
                <v-switch label="那我不是机器人呀"></v-switch>
                <v-textarea
                  hide-details
                  label="善意回帖，理性发言"
                ></v-textarea>
                <v-btn tile icon :color="active ? 'primary' : 'default'">
                  <v-icon @click="toggleEmoji">mdi-emoticon-happy</v-icon>
                </v-btn>
                <v-btn color="primary" class="float-right">发表评论</v-btn>
                <v-scroll-y-transition>
                  <div v-show="active" class="well">
                    <p>
                      <a
                        v-for="emoji in emojis"
                        :key="emoji.title"
                        @click="handleEmoji(emoji)"
                      >
                        <v-img
                          class="d-inline-flex"
                          width="32"
                          :src="emoji.url"
                        ></v-img>
                      </a>
                    </p>
                  </div>
                </v-scroll-y-transition>
              </v-form>
              <p v-else>你可以在<a>登录</a>后，发表评论</p>
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
    active: false,
    emojis: [
      { title: '大笑', url: require('@/static/image/smilies/arrow.png') },
      { title: '大哭', url: require('@/static/image/smilies/biggrin.png') },
      { title: '困惑', url: require('@/static/image/smilies/confused.png') },
      { title: '酷', url: require('@/static/image/smilies/cool.png') },
      { title: '牛皮', url: require('@/static/image/smilies/cowboy.png') },
      { title: '哭', url: require('@/static/image/smilies/cry.png') },
      { title: '摇头', url: require('@/static/image/smilies/drooling.png') },
      { title: '害怕', url: require('@/static/image/smilies/eek.png') },
      { title: '恶魔', url: require('@/static/image/smilies/evil.png') },
      { title: '惊叫', url: require('@/static/image/smilies/exclaim.png') },
      { title: '机智', url: require('@/static/image/smilies/idea.png') },
      { title: '发疯', url: require('@/static/image/smilies/mad.png') },
      { title: '变绿', url: require('@/static/image/smilies/mrgreen.png') },
      { title: '中立', url: require('@/static/image/smilies/neutral.png') },
      { title: '坚持', url: require('@/static/image/smilies/persevering.png') },
      { title: '疑问', url: require('@/static/image/smilies/question.png') },
      { title: '嘲弄', url: require('@/static/image/smilies/razz.png') },
      { title: '红脸', url: require('@/static/image/smilies/redface.png') },
      { title: '揉眼', url: require('@/static/image/smilies/rolleyes.png') },
      { title: '大便', url: require('@/static/image/smilies/shit.png') },
      { title: '微笑', url: require('@/static/image/smilies/smile.png') },
      { title: '惊讶', url: require('@/static/image/smilies/surprised.png') },
      { title: '符号', url: require('@/static/image/smilies/symbols.png') },
      { title: '怪癖', url: require('@/static/image/smilies/twisted.png') },
      { title: '眨眼', url: require('@/static/image/smilies/wink.png') }
    ]
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth ? this.$store.state.auth.loggedIn : false
    }
  },
  methods: {
    toggleEmoji() {
      this.active = !this.active
    },
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

.reply-subtitle {
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
