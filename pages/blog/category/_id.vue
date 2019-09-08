<template>
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-md-center word">
              <template v-for="item in categorys">
                <h1
                  v-if="item.id === $route.params.id"
                  :key="item.id"
                  class="hitokoto-title"
                >
                  分类：{{ item.name }}
                </h1>
              </template>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container>
      <v-layout fill-height>
        <v-flex xs12 md12 sm6>
          <blog-main-card :item="desserts[0]"></blog-main-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs9>
          <blog-article-list :list="list"></blog-article-list>
        </v-flex>
        <v-flex xs4>
          <!-- 最近评论 -->
          <blog-recent-discuss></blog-recent-discuss>
          <!-- 标签云 -->
          <blog-label-cloud :items="labels"></blog-label-cloud>
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
import NavBar from '@/components/blog/NavBar'
import ArticleList from '@/components/blog/ArticleList'
import MainCard from '@/components/blog/MainCard'
import RecentDiscuss from '@/components/blog/RecentDiscuss'
import LabelCloud from '@/components/blog/LabelCloud'
import {
  getArticlePageListToC,
  getCategoryList,
  getArticleLabelPage
} from '@/api/article'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar,
    'blog-main-card': MainCard,
    'blog-article-list': ArticleList,
    'blog-recent-discuss': RecentDiscuss,
    'blog-label-cloud': LabelCloud
  },
  data: () => ({ loading: true }),
  computed: {
    length: function() {
      return this.pagination.totalItems
        ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        : 0
    },
    list: function() {
      return this.desserts.filter(function(item, index) {
        return index > 0
      })
    }
  },
  async asyncData({ app, params, error }) {
    const query = {}
    query.categoryId = params.id
    const resArticle = await app.$axios.$request(getArticlePageListToC(query))
    const pagination = {}
    if (resArticle.code === '200') {
      pagination.page = resArticle.data.currentPage
      pagination.rowsPerPage = resArticle.data.pageSize
      pagination.totalItems = resArticle.data.total
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
    const resArticleLabel = await app.$axios.$request(getArticleLabelPage())
    let labels = []
    if (resArticleLabel.code === '200') {
      labels = resArticleLabel.data.records
    } else {
      return error({
        statusCode: resArticleLabel.code,
        message: resArticleLabel.message
      })
    }
    return {
      desserts: resArticle.data.records,
      pagination: pagination,
      categorys: categorys,
      labels: labels
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

.cover {
  transition: 1s all;
}

.cover:hover {
  transform: scale(1.1);
}
</style>
