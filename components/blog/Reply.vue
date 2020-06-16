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
      <v-btn small color="default" @click="handleCancel(comment)">取消 </v-btn>
      <v-btn small color="primary">发表评论</v-btn>
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
