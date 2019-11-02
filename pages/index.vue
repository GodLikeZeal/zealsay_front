<template>
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <blog-motto :hitokoto="motto"></blog-motto>
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
import Motto from '@/components/blog/Motto'
import MainCard from '@/components/blog/MainCard'
import ArticleList from '@/components/blog/ArticleList'
import RecentDiscuss from '@/components/blog/RecentDiscuss'
import LabelCloud from '@/components/blog/LabelCloud'
import { getHitokoto } from '@/api/service'
import {
  getArticleLabelPage,
  getArticlePageListToC,
  getCategoryList
} from '@/api/article'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar,
    'blog-motto': Motto,
    'blog-main-card': MainCard,
    'blog-article-list': ArticleList,
    'blog-recent-discuss': RecentDiscuss,
    'blog-label-cloud': LabelCloud
  },
  data: () => ({
    loading: true,
    colors: ['primary', 'success', 'info', 'warning', 'danger']
  }),
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
    const resHitokoto = await app.$axios.$request(getHitokoto())
    const motto = {}
    if (resHitokoto.code === '200') {
      motto.hitokoto = resHitokoto.data.hitokoto
      motto.creator = resHitokoto.data.creator
      motto.from = resHitokoto.data.from
    } else {
      return error({
        statusCode: resHitokoto.code,
        message: resHitokoto.message
      })
    }
    const resArticle = await app.$axios.$request(getArticlePageListToC())
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
      motto: motto,
      desserts: resArticle.data.records,
      pagination: pagination,
      categorys: categorys,
      labels: labels
    }
  },
  methods: {
    search() {
      const searchData = {}
      searchData.pageSize = this.pagination.rowsPerPage
      searchData.pageNumber = this.pagination.page
      this.$axios
        .$request(getArticlePageListToC(searchData))
        .then(res => {
          if (res.code === '200') {
            this.desserts = res.data.records
            // this.pagination.page = res.data.currentPage;
            // this.pagination.rowsPerPage = res.data.pageSize;
            this.pagination.totalItems = res.data.total
          } else {
            this.$swal({
              text: '拉取文章列表失败',
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
    }
  }
}
</script>
<style lang="less" scoped>
.index {
  background: #fafafa;
}

.v-toolbar__content {
  margin-left: 1.2em !important;
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
  font-size: small;
  width: inherit;
}

.cover {
  transition: 1s all;
}

.cover:hover {
  transform: scale(1.1);
}
</style>
