<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-md-center word">
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
    <v-container class="my-container">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-layout>
        <v-flex xs12 md12>
          <template>
            <div class="markdown-body" v-html="article.contentHtml"></div>
          </template>
        </v-flex>
      </v-layout>

      <back-to-top :visibility-height="300" :back-position="0" />
      <!-- 页脚 -->
      <v-layout row>
        <v-flex>
          <div class="footer">
            <blog-footer v-if="$route.name !== 'Maps'" />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Util from '@/util'
import NavBar from '@/components/blog/NavBar'
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
    'blog-nav': NavBar
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
  data: () => ({ loading: true }),
  computed: {
    breadcrumbs: function() {
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
      article: article,
      categorys: categorys,
      like: like
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
          .then(res => {
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
          .catch(e => {
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
          .then(res => {
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
          .catch(e => {
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
@import '../../assets/scss/styles/markdown/github-markdown';
@import '../../assets/scss/styles/markdown/atelier-plateau-dark';
.index {
  background: #fafafa;
}
.icon-like {
  float: right;
  margin-top: 3rem;
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
</style>
