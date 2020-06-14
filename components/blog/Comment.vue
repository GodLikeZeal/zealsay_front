<!--评论模块-->
<template>
  <div class="container">
    <template v-for="(item, key) in comments">
      <div :key="key" class="comment">
        <div class="info">
          <img class="avatar" :src="item.fromAvatar" width="36" height="36" />
          <div class="right">
            <div class="name">{{ item.fromName }}</div>
            <div class="date">{{ item.date }}</div>
          </div>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="control">
          <span
            class="like"
            :class="{ active: item.isLike }"
            @click="likeClick(item)"
          >
            <i class="iconfont icon-like"></i>
            <span class="like-num">{{
              item.likeNum > 0 ? item.likeNum + '人赞' : '赞'
            }}</span>
          </span>
          <span class="comment-reply" @click="showCommentInput(item)">
            <i class="iconfont icon-comment"></i>
            <span>回复</span>
          </span>
        </div>
        <div class="reply">
          <template v-for="(reply, k) in item.reply">
            <div :key="k" class="item">
              <div class="reply-content">
                <span class="from-name">{{ reply.fromName }}</span
                ><span>: </span>
                <span class="to-name">@{{ reply.toName }}</span>
                <span>{{ reply.content }}</span>
              </div>
              <div class="reply-bottom">
                <span>{{ reply.date }}</span>
                <span class="reply-text" @click="showCommentInput(item, reply)">
                  <i class="iconfont icon-comment"></i>
                  <span>回复</span>
                </span>
              </div>
            </div>
          </template>
          <div
            v-if="item.reply.length > 0"
            class="write-reply"
            @click="showCommentInput(item)"
          >
            <i class="el-icon-edit"></i>
            <span class="add-comment">添加新评论</span>
          </div>
          <transition name="fade">
            <div v-if="showItemId === item.id" class="input-wrapper">
              <el-input
                v-model="inputComment"
                class="gray-bg-input"
                type="textarea"
                :rows="3"
                autofocus
                placeholder="写下你的评论"
              >
              </el-input>
              <div class="btn-control">
                <span class="cancel" @click="cancel">取消</span>
                <el-button
                  class="btn"
                  type="success"
                  round
                  @click="commitComment"
                  >确定</el-button
                >
              </div>
            </div>
          </transition>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  components: {},
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      inputComment: '',
      showItemId: ''
    }
  },
  computed: {},
  created() {
    console.log(this.comments)
  },
  methods: {
    /**
     * 点赞
     */
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, 'isLike', true)
        item.likeNum++
      } else {
        if (item.isLike) {
          item.likeNum--
        } else {
          item.likeNum++
        }
        item.isLike = !item.isLike
      }
    },

    /**
     * 点击取消按钮
     */
    cancel() {
      this.showItemId = ''
    },

    /**
     * 提交评论
     */
    commitComment() {
      console.log(this.inputComment)
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      if (reply) {
        this.inputComment = '@' + reply.fromName + ' '
      } else {
        this.inputComment = ''
      }
      this.showItemId = item.id
    }
  }
}
</script>

<style scoped lang="scss">
/*@import '../../public/scss/index';*/

.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: slategrey;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: lightgrey;
        }
      }
    }
    .content {
      font-size: 16px;
      color: grey;
      line-height: 20px;
      padding: 10px 0;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: gainsboro;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: greenyellow;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: green;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: grey;
          .from-name {
            color: grey;
          }
          .to-name {
            color: grey;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: grey;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: grey;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: grey;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: grey;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input,
        .el-input__inner {
          /*background-color: #67C23A;*/
        }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 16px;
            color: grey;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: grey;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
