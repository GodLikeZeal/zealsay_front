<template>
  <v-form v-show="show" ref="commentForm" lazy-validation>
    <v-textarea
      v-model="value"
      outlined
      :counter="500"
      hide-details="auto"
      placeholder="善意回帖，理性发言"
      @focus="handleComment"
    ></v-textarea>
    <v-btn tile icon :color="active ? 'primary' : 'default'">
      <v-icon @click="toggleEmoji">mdi-emoticon-happy</v-icon>
    </v-btn>
    <div class="float-right">
      <v-btn small color="default" @click="handleCancel(comment)">取消</v-btn>
      <v-btn small color="primary" @click="handleSubmit">发表评论</v-btn>
    </div>
    <v-scroll-y-transition>
      <div v-show="active" class="well">
        <p>
          <a
            v-for="emoji in emojis"
            :key="emoji.title"
            @click="handleEmoji(emoji)"
          >
            <v-img width="32" class="d-inline-flex" :src="emoji.url"></v-img>
          </a>
        </p>
      </div>
    </v-scroll-y-transition>
  </v-form>
</template>

<script>
import { emojis } from '@/util/constans'
import { createComment } from '@/api/comment'
import Util from '@/util'

export default {
  name: 'Reply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    article: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    active: false,
    value: '',
    emojis,
    commentRules: [
      (v) => !!v || '评论不能为空!',
      (v) => !v || v.length <= 500 || '评论超过500字上限'
    ]
  }),
  methods: {
    toggleEmoji() {
      this.active = !this.active
    },
    handleComment() {
      if (this.value === '') {
        this.value += '@' + this.comment.fromName + ' '
      }
    },
    handleCancel(comment) {
      this.$emit('handleCancel', comment)
    },
    handleEmoji(emoji) {
      this.value += '[' + emoji.title + ']'
    },
    xssComment(content) {
      if (content != null && content !== '') {
        return Util.xssComment(content)
      } else {
        return ''
      }
    },
    handleSubmit() {
      if (this.$refs.commentForm.validate()) {
        const data = {}
        data.content = this.value
        data.content = this.xssComment(this.value)
        if (
          data.content === 'undefined' ||
          data.content === '' ||
          data.content.trim().length === 0
        ) {
          this.$swal({
            text: '输入不能为空！',
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        }
        data.commentId = this.comment.id
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
              this.$emit('handleCancel', this.comment)
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
    }
  }
}
</script>

<style scoped lang="scss">
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
