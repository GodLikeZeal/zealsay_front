<template>
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <v-container>
        <v-layout fill-height justify-center>
          <v-flex xs12 md12 sm12 lg10>
            <div class="text-md-center word">
              <h1 v-if="$route.params.name" class="hitokoto-title">
                标签：{{ $route.params.name }}
              </h1>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container>
      <v-layout fill-height justify-center>
        <v-flex xs12 sm12 md8 lg7>
          <blog-article-list :list="list"></blog-article-list>
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
import ArticleList from '@/components/blog/ArticleList'
import RecentDiscuss from '@/components/blog/RecentDiscuss'
import LabelCloud from '@/components/blog/LabelCloud'
import { getIndexData } from '@/api/data'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar,
    'blog-article-list': ArticleList,
    'blog-recent-discuss': RecentDiscuss,
    'blog-label-cloud': LabelCloud
  },
  data: () => ({ loading: true }),
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
    const query = {}
    query.label = params.name
    const res = await app.$axios.$request(getIndexData(query))

    if (res.code === '200') {
      const motto = {}
      motto.hitokoto = res.data.hitokoto.hitokoto
      motto.creator = res.data.hitokoto.creator
      motto.from = res.data.hitokoto.from

      const pagination = {}
      pagination.page = res.data.pageInfo.currentPage
      pagination.rowsPerPage = res.data.pageInfo.pageSize
      pagination.totalItems = res.data.pageInfo.total
      const desserts = res.data.pageInfo.records
      const labels = res.data.labels
      const categorys = res.data.categorys

      return {
        desserts,
        pagination,
        categorys,
        labels
      }
    } else {
      return error({
        statusCode: res.code,
        message: res.message
      })
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
<style lang="scss" scoped>
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
