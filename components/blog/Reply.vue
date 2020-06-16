<template>
  <v-form v-show="show">
    <v-textarea
      outlined
      hide-details
      placeholder="善意回帖，理性发言"
      :value="value"
      @focus="handleComment"
    ></v-textarea>
    <v-btn tile icon :color="active ? 'primary' : 'default'">
      <v-icon @click="toggleEmoji">mdi-emoticon-happy</v-icon>
    </v-btn>
    <div class="float-right">
      <v-btn
        small
        class="justify-end"
        color="default"
        @click="handleCancel(comment)"
        >取消
      </v-btn>
      <v-btn small color="primary">发表评论</v-btn>
    </div>
    <v-scroll-y-transition>
      <div v-show="active" class="well">
        <p class="d-flex">
          <a
            v-for="emoji in emojis"
            :key="emoji.title"
            @click="handleEmoji(emoji)"
          >
            <v-img width="32" :src="emoji.url"></v-img>
          </a>
        </p>
      </div>
    </v-scroll-y-transition>
  </v-form>
</template>

<script>
export default {
  name: 'Reply',
  props: {
    comment: {
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
    emojis: [
      { title: '微笑', url: require('@/static/image/smilies/arrow.png') },
      { title: '大哭', url: require('@/static/image/smilies/biggrin.png') },
      { title: '困惑', url: require('@/static/image/smilies/confused.png') },
      { title: '酷', url: require('@/static/image/smilies/cool.png') },
      { title: '牛皮', url: require('@/static/image/smilies/cowboy.png') }
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
