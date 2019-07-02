<template>
  <div v-cloak id="index" class="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="white--text">zealsay</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="nav-items">
          <v-btn flat>主页</v-btn>
          <v-btn flat>分类</v-btn>
          <v-btn flat>友链</v-btn>
          <v-btn flat>关于</v-btn>
          <v-btn flat><v-icon>search</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-md-center word">
              <h1 class="bracket left">『</h1>
              <h1 class="hitokoto-title">
                {{ motto.hitokoto }}
              </h1>
              <h1 class="bracket right">』</h1>
              <h3 class="hitokoto_author">-「{{ motto.creator }}」</h3>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container>
      <v-layout fill-height>
        <v-flex xs12 md12 sm6>
          <v-card class="card">
            <v-img
              transition="fade-transition"
              class="white--text"
              height="300px"
              width="100%"
              :src="desserts[0].coverImage"
            >
              <v-container fill-height fluid justify-center>
                <v-layout fill-height align-center>
                  <v-flex xs12 class="text-md-center">
                    <span class="font-weight-thin">{{
                      desserts[0].categoryName
                    }}</span>
                    <h3 class="font-weight-medium">{{ desserts[0].title }}</h3>
                    <p class="Paragraph">
                      {{ desserts[0].subheading }}
                    </p>
                    <v-btn round color="primary">阅读原文</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs9>
          <template v-for="(item, i) in desserts">
            <v-card v-if="i > 0" :key="item.id" flat class="card">
              <v-layout row>
                <v-flex xs6>
                  <a>
                    <v-img
                      transition="fade-transition"
                      :aspect-ratio="320 / 200"
                      class="card elevation-3"
                      :src="item.coverImage"
                      contain
                    ></v-img>
                  </a>
                </v-flex>
                <v-flex xs6>
                  <v-card-title primary-title>
                    <div>
                      <div class="font-weight-thin">
                        {{ item.categoryName }}
                      </div>
                      <h4>{{ item.title }}</h4>
                      <div class="font-weight-medium">
                        {{ item.subheading }}
                        <a>阅读更多…</a>
                      </div>
                      <h5>
                        {{ item.authorName }} {{ item.createDate }} 415次浏览
                        2个点赞
                      </h5>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
          </template>
          <!-- page分页-->
          <div class="pagination text-md-center">
            <v-pagination
              v-model="pagination.page"
              circle
              color="primary"
              :length="length"
              @input="search"
            ></v-pagination>
          </div>
        </v-flex>
        <v-flex xs4>
          <v-card class="card">
            <v-card-title primary-title class="left_list_header">
              <h4 class="title font-weight-bold">近期文章</h4>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-tile-title class="left_list_item">
                  <a>浅谈自动化测试(二)</a>
                </v-list-tile-title>
                <v-divider></v-divider>
                <v-list-tile-title class="left_list_item">
                  <a>浅谈自动化测试(二)</a>
                </v-list-tile-title>
                <v-divider></v-divider>
                <v-list-tile-title class="left_list_item">
                  <a>浅谈自动化测试(二)</a>
                </v-list-tile-title>
                <v-divider></v-divider>
                <v-list-tile-title class="left_list_item">
                  <a>浅谈自动化测试(二)</a>
                </v-list-tile-title>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title primary-title class="left_list_header">
              <h4 class="title font-weight-bold">近期评论</h4>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-tile-title class="left_list_item">
                  zeal发表在<a>《小石谈记——京津》</a>
                </v-list-tile-title>
                <v-divider></v-divider>
                <v-list-tile-title class="left_list_item">
                  zeal发表在<a>《小石谈记——京津》</a>
                </v-list-tile-title>
                <v-divider></v-divider>
                <v-list-tile-title class="left_list_item">
                  zeal发表在<a>《小石谈记——京津》</a>
                </v-list-tile-title>
                <v-divider></v-divider>
                <v-list-tile-title class="left_list_item">
                  zeal发表在<a>《小石谈记——京津》</a>
                </v-list-tile-title>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <back-to-top :visibility-height="300" :back-position="50" />
      <!-- 页脚 -->
      <v-layout row>
        <v-flex>
          <div class="footer">
            <core-footer v-if="$route.name !== 'Maps'" />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { getHitokoto } from '@/api/service'
import { getArticlePageList } from '@/api/article'
export default {
  auth: false,
  data: () => ({ loading: true }),
  computed: {
    length: {
      get: function() {
        return this.pagination.totalItems
          ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
          : 0
      },
      set: function() {}
    }
  },
  async asyncData({ app, query, error }) {
    const resHitokoto = await app.$axios.$request(getHitokoto())
    const motto = {}
    if (resHitokoto.code === '200') {
      motto.hitokoto = resHitokoto.data.hitokoto
      motto.creator = resHitokoto.data.creator
    } else {
      return error({
        statusCode: resHitokoto.code,
        message: resHitokoto.message
      })
    }
    const resArticle = await app.$axios.$request(getArticlePageList())
    const pagination = {}
    if (resArticle.code === '200') {
      pagination.page = resArticle.data.currentPage
      pagination.rowsPerPage = resArticle.data.pageSize
      pagination.totalItems = resArticle.data.total
    } else {
      return error({ statusCode: resArticle.code, message: resArticle.message })
    }
    return {
      motto: motto,
      desserts: resArticle.data.records,
      pagination: pagination
    }
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      console.log('click search')
    }
  }
}
</script>
<style lang="less" scoped>
[v-cloak] {
  display: none;
}
.index {
  background: #fafafa;
}
.v-toolbar__content {
  margin-left: 1.2em !important;
}
.nav-items {
  margin-right: 8em;
}
.hitokoto-title {
  color: white;
  font-weight: 400 !important;
  margin-top: 5rem;
  margin-bottom: 0.6rem;
  line-height: 1 !important;
  font-size: 2rem !important;
}
.hitokoto_author {
  color: snow;
  float: right;
  margin-top: 3rem;
}
.bracket {
  color: white;
  font-weight: 400 !important;
  line-height: 0 !important;
  font-size: 2rem !important;
}
.right {
  position: relative;
  right: 0;
  bottom: 0;
}
.left {
  position: relative;
  left: 0;
  top: -2.5rem;
}
.word {
  position: relative;
}
.card {
  margin: 1.5em;
  border-radius: 0.5em;
}
.footer {
  margin-top: 300px;
}
.left_list_header {
  h4 {
    margin: auto;
  }
}
.left_list_item {
  margin: 0.5rem 1.25rem;
}
</style>
