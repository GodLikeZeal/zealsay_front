<!--评论模块-->
<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex sm12>
        <h3>{{ page.total }}人评论</h3>
        <v-list two-line>
          <template v-for="comment in page.records">
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
                      <v-icon
                        v-if="comment.thumbUp"
                        small
                        @click="handleThumbCancel(comment)"
                        >mdi-thumb-up</v-icon
                      >
                      <v-icon v-else small @click="handleThumbUp(comment)"
                        >mdi-thumb-up-outline</v-icon
                      >
                    </a>
                    <span class="comment-button-text">赞</span>
                  </template>
                  <template v-else>
                    <a>
                      <v-icon
                        v-if="comment.thumbUp"
                        small
                        @click="handleThumbCancel(comment)"
                        >mdi-thumb-up</v-icon
                      >
                      <v-icon v-else small @click="handleThumbUp(comment)"
                        >mdi-thumb-up-outline</v-icon
                      >
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
                    :article="article"
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
                              <v-icon
                                v-if="reply.thumbUp"
                                small
                                @click="handleThumbCancel(reply)"
                                >mdi-thumb-up
                              </v-icon>
                              <v-icon v-else small @click="handleThumbUp(reply)"
                                >mdi-thumb-up-outline</v-icon
                              >
                            </a>
                            <span class="comment-button-text">赞</span>
                          </template>
                          <template v-else>
                            <a>
                              <v-icon
                                v-if="reply.thumbUp"
                                small
                                @click="handleThumbCancel(reply)"
                                >mdi-thumb-up
                              </v-icon>
                              <v-icon v-else small @click="handleThumbUp(reply)"
                                >mdi-thumb-up-outline</v-icon
                              >
                            </a>

                            <span class="comment-button-text"
                              >{{ reply.likeNum }}人赞</span
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
                            :article="article"
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
              <v-form v-if="loggedIn" ref="commentForm" lazy-validation>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-switch
                      v-model="check"
                      class="d-inline-flex"
                      label="那我不是机器猫呀"
                      :rules="[(v) => !!v || '那我怎么知道你是不是机器猫呢？']"
                      hint="那你是机器猫吗？"
                      v-on="on"
                    ></v-switch>
                  </template>
                  那你是机器猫吗？
                </v-tooltip>

                <v-textarea
                  v-model="content"
                  hide-details="auto"
                  label="善意回帖，理性发言"
                  :counter="500"
                  :rules="commentRules"
                ></v-textarea>
                <v-btn tile icon :color="active ? 'primary' : 'default'">
                  <v-icon @click="toggleEmoji">mdi-emoticon-happy</v-icon>
                </v-btn>
                <v-btn
                  color="primary"
                  class="float-right"
                  @click="handleComment"
                  >发表评论</v-btn
                >
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
import { createComment, thumbUp, thumbDown } from '@/api/comment'

export default {
  components: {
    reply: Reply
  },
  props: {
    page: {
      type: Object,
      required: true
    },
    article: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    active: false,
    check: false,
    content: '',
    emojis: [
      { title: '大笑', url: require('@/static/image/smilies/arrow.png') },
      { title: '可爱', url: require('@/static/image/smilies/biggrin.png') },
      { title: '冷笑', url: require('@/static/image/smilies/confused.png') },
      { title: '酷', url: require('@/static/image/smilies/cool.png') },
      { title: '牛皮', url: require('@/static/image/smilies/cowboy.png') },
      { title: '哭', url: require('@/static/image/smilies/cry.png') },
      { title: '憨笑', url: require('@/static/image/smilies/drooling.png') },
      { title: '舔', url: require('@/static/image/smilies/eek.png') },
      { title: '滑稽', url: require('@/static/image/smilies/evil.png') },
      { title: '惊叫', url: require('@/static/image/smilies/exclaim.png') },
      { title: '卖萌', url: require('@/static/image/smilies/idea.png') },
      { title: '难过', url: require('@/static/image/smilies/mad.png') },
      { title: '汗', url: require('@/static/image/smilies/mrgreen.png') },
      { title: '疑问', url: require('@/static/image/smilies/neutral.png') },
      { title: '委屈', url: require('@/static/image/smilies/persevering.png') },
      { title: '震惊', url: require('@/static/image/smilies/question.png') },
      { title: '机智', url: require('@/static/image/smilies/razz.png') },
      { title: '不屑', url: require('@/static/image/smilies/redface.png') },
      { title: '色', url: require('@/static/image/smilies/rolleyes.png') },
      { title: '吐', url: require('@/static/image/smilies/shit.png') },
      { title: '微笑', url: require('@/static/image/smilies/smile.png') },
      { title: '惊讶', url: require('@/static/image/smilies/surprised.png') },
      { title: '内涵', url: require('@/static/image/smilies/symbols.png') },
      { title: '生气', url: require('@/static/image/smilies/twisted.png') },
      { title: '呵呵', url: require('@/static/image/smilies/wink.png') }
    ],
    commentRules: [
      (v) => !!v || '评论不能为空!',
      (v) => !v || v.length <= 500 || '评论超过500字上限'
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
    handleEmoji(emoji) {
      this.content += '[' + emoji.title + ']'
    },
    handleThumbUp(comment) {
      comment.thumbUp = true
      comment.likeNum++
      // 调用后台服务增加
      this.$axios
        .$request(thumbUp(comment.id))
        .then((res) => {
          if (res.code === '200' && res.data) {
            // 点赞成功
          } else {
            this.$swal({
              text: '点赞失败！',
              type: 'error',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
          }
        })
        .catch((e) => {
          this.$swal({
            text: e.message,
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        })
    },
    handleThumbCancel(comment) {
      comment.thumbUp = false
      comment.likeNum--
      // 调用后台服务减少
      this.$axios
        .$request(thumbDown(comment.id))
        .then((res) => {
          if (res.code === '200' && res.data) {
            // 点赞成功
          } else {
            this.$swal({
              text: '点赞失败！',
              type: 'error',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
          }
        })
        .catch((e) => {
          this.$swal({
            text: e.message,
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        })
    },
    handleCancel(comment) {
      comment.inputText = false
    },
    handleComment() {
      if (this.$refs.commentForm.validate()) {
        const data = {}
        data.content = this.content
        data.articleId = this.article.id
        data.articleTitle = this.article.title
        data.fromId = this.$store.state.auth.user.id
        data.fromName = this.$store.state.auth.user.username
        data.fromAvatar = this.$store.state.auth.user.avatar
        this.$axios
          .$request(createComment(data))
          .then((res) => {
            if (res.code === '200' && res.data) {
              this.$swal({
                text: '评论成功！',
                type: 'success',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000
              })
            } else {
              this.$swal({
                text: '发表评论失败！',
                type: 'error',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000
              })
            }
          })
          .catch((e) => {
            this.$swal({
              text: e.message,
              type: 'error',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
          })
      }
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
