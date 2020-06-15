<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 md10 lg8>
            <div class="text-center word">
              <h1 class="hitokoto-title">
                {{ article.title }}
              </h1>
              <p
                class="article-info font-weight-bold text-capitalize white--text"
              >
                {{ article.readNum }}次浏览 {{ article.likeNum }}个点赞
              </p>
              <div class="author">
                <v-avatar class="author-avatar" :size="48"
                  ><img :src="article.authorAvatar" alt="avatar"
                /></v-avatar>
                <div class="font-weight-medium white--text author-name">
                  <p class="author-text">{{ article.authorName }}</p>
                  <p class="author-text">
                    {{ article.createDate | formatDate }}
                    发表于
                    {{ article.categoryName }}
                  </p>
                </div>
              </div>
            </div>

            <v-tooltip v-if="like" top>
              <template v-slot:activator="{ on }">
                <v-btn
                  style="float: right;margin-top: 3rem;margin-right: 5rem;"
                  fab
                >
                  <v-icon medium color="pink" v-on="on" @click="dislikeArticle"
                    >mdi-heart</v-icon
                  >
                </v-btn>
              </template>
              点击取消喜欢
            </v-tooltip>
            <v-tooltip v-else top>
              <template v-slot:activator="{ on }">
                <v-btn class="icon-like" fab>
                  <v-icon medium color="pink" v-on="on" @click="likeArticle"
                    >mdi-heart-outline</v-icon
                  >
                </v-btn>
              </template>
              喜欢这篇文章？那就点个赞吧！
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container>
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 md10 lg8>
            <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs-item title">
              <template v-slot:divider>
                <v-icon>chevron_right</v-icon>
              </template>
            </v-breadcrumbs>
            <template>
              <div class="markdown-body" v-html="article.contentHtml"></div>
            </template>
            <v-layout justify-center wrap>
              <v-flex xs12 md12 lg12>
                <p style="margin-top: 10rem">
                  转载文章请注明xxx
                </p>
              </v-flex>
              <v-flex xs12 sm6 class="align-self-center">
                <div class="article-label">
                  <v-label>标签：</v-label>
                  <v-chip
                    v-for="label in article.label
                      ? article.label.split(',')
                      : []"
                    :key="label"
                    class="chip-label"
                    :color="color[parseInt((label.length + 6) % 6)]"
                    small
                  >
                    {{ label }}
                  </v-chip>
                </div>
              </v-flex>
              <v-flex xs12 sm6 class="text-right align-self-center">
                <v-btn class="mx-2" fab dark small color="success">
                  <v-icon dark>mdi-wechat</v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark small color="blue">
                  <v-icon dark>mdi-qqchat</v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark small color="pink">
                  <v-icon dark>mdi-sina-weibo</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>

            <v-divider></v-divider>
            <blog-comment :comments="comments"></blog-comment>
          </v-flex>
        </v-layout>
      </v-container>

      <core-back-to-top :visibility-height="300" :back-position="0" />
    </v-container>
    <!-- 页脚 -->
    <v-layout>
      <v-flex>
        <div class="footer">
          <blog-footer v-if="$route.name !== 'Maps'" />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Util from '@/util'
import NavBar from '@/components/blog/NavBar'
import Comment from '@/components/blog/Comment'
import {
  getArticle,
  getCategoryList,
  readArticle,
  isLikeArticle,
  likeArticle,
  disLikeArticle
} from '@/api/article'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar,
    'blog-comment': Comment
  },
  filters: {
    formatDate(time) {
      if (time != null && time !== '') {
        return Util.formateDate(time)
      } else {
        return ''
      }
    }
  },
  data: () => ({
    loading: true,
    color: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
    comments: [
      {
        id: 'comment0001', // 主键id
        date: '2018-07-05 08:30', // 评论时间
        ownerId: 'talents100020', // 文章的id
        fromId: 'errhefe232213', // 评论者id
        fromName: '犀利的评论家', // 评论者昵称
        fromAvatar:
          'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', // 评论者头像
        likeNum: 3, // 点赞人数
        content:
          '非常靠谱的程序员a嗷嗷啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊aaaaaaaaaaaaaaaaaaaaaaaaa啊啊啊啊啊', // 评论内容
        reply: [
          // 回复，或子评论
          {
            id: '34523244544', // 主键id
            commentId: 'comment0001', // 父评论id，即父亲的id
            fromId: 'observer223432', // 评论者id
            fromName: '夕阳红', // 评论者昵称
            fromAvatar:
              'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg', // 评论者头像
            toId: 'errhefe232213', // 被评论者id
            toName: '犀利的评论家', // 被评论者昵称
            toAvatar:
              'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', // 被评论者头像
            content: '赞同，很靠谱，水平很高', // 评论内容
            date: '2018-07-05 08:35' // 评论时间
          },
          {
            id: '34523244545',
            commentId: 'comment0001',
            fromId: 'observer567422',
            fromName: '清晨一缕阳光',
            fromAvatar:
              'http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg',
            toId: 'observer223432',
            toName: '夕阳红',
            toAvatar:
              'https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg',
            content: '大神一个！',
            date: '2018-07-05 08:50'
          }
        ]
      },
      {
        id: 'comment0002',
        date: '2018-07-05 08:30',
        ownerId: 'talents100020',
        fromId: 'errhefe232213',
        fromName: '毒蛇郭德纲',
        fromAvatar:
          'http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg',
        likeNum: 0,
        content: '从没见过这么优秀的人',
        reply: []
      }
    ]
  }),
  computed: {
    breadcrumbs() {
      return [
        {
          text: '主页',
          disabled: false,
          href: '/'
        },
        {
          text: this.article.categoryName,
          disabled: false,
          href: '/blog/category/' + this.article.categoryId
        },
        {
          text: this.article.title,
          disabled: true,
          href: '/blog/' + this.article.id
        }
      ]
    }
  },
  async asyncData({ app, params, error, store }) {
    const resArticle = await app.$axios.$request(getArticle(params.id))
    let article = {}
    if (resArticle.code === '200') {
      article = resArticle.data
    } else {
      return error({ statusCode: resArticle.code, message: resArticle.message })
    }
    const resCategory = await app.$axios.$request(getCategoryList())
    let categorys = []
    if (resCategory.code === '200') {
      categorys = resCategory.data
    } else {
      return error({ statusCode: resArticle.code, message: resArticle.message })
    }
    let like
    if (store.$auth && store.$auth.$state && store.$auth.$state.loggedIn) {
      const likeRes = await app.$axios.$request(isLikeArticle(params.id))
      if (likeRes.code === '200') {
        like = likeRes.data
      } else {
        return error({
          statusCode: likeRes.code,
          message: likeRes.message
        })
      }
    } else {
      like = false
    }
    // 标记阅读数
    await app.$axios.$request(readArticle(params.id))
    return {
      article,
      categorys,
      like
    }
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      console.log('click search')
    },
    likeArticle() {
      if (this.$store.state.auth.loggedIn) {
        this.$axios
          .$request(likeArticle(this.article.id))
          .then((res) => {
            if (res.code === '200' && res.data) {
              this.like = true
            } else {
              this.$swal({
                text: '该文章不让你喜欢它！',
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
      } else {
        this.$swal({
          text: '需要先登录才能进行该操作哦！',
          type: 'warning',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
      }
    },
    dislikeArticle() {
      if (this.$store.state.auth.loggedIn) {
        this.$axios
          .$request(disLikeArticle(this.article.id))
          .then((res) => {
            if (res.code === '200' && res.data) {
              this.like = false
            } else {
              this.$swal({
                text: '该文章不准你不喜欢它！',
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
      } else {
        this.$swal({
          text: '需要先登录才能进行该操作哦！',
          type: 'warning',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/styles/markdown/markdown';
/*@import '../../assets/scss/styles/markdown/github-markdown';*/
/*@import '../../assets/scss/styles/markdown/atelier-plateau-dark';*/
.index {
  background: #fafafa;
}
.icon-like {
  float: right;
  margin-top: 2rem;
  margin-right: 5rem;
}
.hitokoto-title {
  color: white;
  font-weight: 400 !important;
  margin-top: 5rem;
  margin-bottom: 0.6rem;
  line-height: 1 !important;
  font-size: 2rem !important;
}
.word {
  position: relative;
}
.article-info {
  margin: 2rem 0;
}
.author {
  display: inline-flex;
}
.author-avatar {
  align-self: center;
}
.author-name {
  text-align: left;
  margin: 0 1rem;
}
.author-text {
  margin: 0.5rem 0;
}
.breadcrumbs-item {
  padding: 2rem 0;
}
.article-label {
  margin: 2rem 0;
}
.chip-label {
  margin: 0.3rem;
}
</style>
