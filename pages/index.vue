<template>
  <div id="index">
    <!-- header -->
    <v-card tile flat color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <blog-motto :hitokoto="motto"></blog-motto>
    </v-card>
    <v-container>
      <v-layout fill-height justify-center>
        <v-flex xs12 md12 sm12 lg10>
          <blog-main-slider :hotArticles="hotArticles"></blog-main-slider>
          <!--          <blog-main-card :item="desserts[0]"></blog-main-card>-->
        </v-flex>
      </v-layout>
      <v-layout fill-height justify-center>
        <v-flex xs12 sm12 md8 lg7>
          <blog-article-list :list="list"></blog-article-list>
          <!-- page分页-->
          <div class="pagination text-center">
            <v-pagination
              v-model="pagination.page"
              :length="length"
              circle
              color="primary"
              @input="search"
            ></v-pagination>
          </div>
        </v-flex>
        <v-flex class="hidden-sm-and-down" md4 lg3>
          <!-- 最近评论 -->
          <blog-recent-discuss></blog-recent-discuss>
          <!-- 标签云 -->
          <blog-label-cloud :items="labels"></blog-label-cloud>
        </v-flex>
      </v-layout>

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
import NavBar from '@/components/blog/NavBar'
import Motto from '@/components/blog/Motto'
// import MainCard from '@/components/blog/MainCard'
import MainSlider from '@/components/blog/MainSlider'
import ArticleList from '@/components/blog/ArticleList'
import RecentDiscuss from '@/components/blog/RecentDiscuss'
import LabelCloud from '@/components/blog/LabelCloud'
import { getIndexData } from '@/api/data'
import { getArticlePageListToC, getCategoryList } from '@/api/article'
import { mapMutations } from 'vuex'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar,
    'blog-motto': Motto,
    // 'blog-main-card': MainCard,
    'blog-main-slider': MainSlider,
    'blog-article-list': ArticleList,
    'blog-recent-discuss': RecentDiscuss,
    'blog-label-cloud': LabelCloud
  },
  data: () => ({
    loading: true,
    colors: ['primary', 'success', 'info', 'warning', 'danger']
  }),
  computed: {
    length() {
      return this.pagination.totalItems
        ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        : 0
    },
    // list() {
    //   return this.desserts.filter(function(item, index) {
    //     return index > 0
    //   })
    // },
    list() {
      return this.desserts
    }
  },
  async asyncData({ app, params, error, store }) {
    const res = await app.$axios.$request(getIndexData())
    const motto = {}
    const pagination = {}
    let desserts = {}
    let labels = []
    let hotArticles = []
    if (res.code === '200') {
      motto.hitokoto = res.data.hitokoto.hitokoto
      motto.creator = res.data.hitokoto.creator
      motto.from = res.data.hitokoto.from

      pagination.page = res.data.pageInfo.currentPage
      pagination.rowsPerPage = res.data.pageInfo.pageSize
      pagination.totalItems = res.data.pageInfo.total
      desserts = res.data.pageInfo.desserts
      labels = res.data.labels
      hotArticles = res.data.hotArticles
    } else {
      return error({
        statusCode: res.code,
        message: res.message
      })
    }
    let categorys = []
    if (store.$app && store.$app.$state && store.$app.$state.categorys) {
      categorys = store.$app.$state.categorys
    } else {
      const resCategory = await app.$axios.$request(getCategoryList())
      if (resCategory.code === '200') {
        categorys = resCategory.data
        console.log(store)
        // store.setCategorys(categorys)
      } else {
        return error({
          statusCode: resCategory.code,
          message: resCategory.message
        })
      }
    }

    return {
      motto,
      desserts,
      hotArticles,
      pagination,
      categorys,
      labels
    }
  },
  methods: {
    ...mapMutations('app', ['setCategorys']),
    search() {
      const searchData = {}
      searchData.pageSize = this.pagination.rowsPerPage
      searchData.pageNumber = this.pagination.page
      this.$axios
        .$request(getArticlePageListToC(searchData))
        .then((res) => {
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
</script>
<style lang="scss" scoped>
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
  margin: 0.5em;
  border-radius: 0.5em;
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
