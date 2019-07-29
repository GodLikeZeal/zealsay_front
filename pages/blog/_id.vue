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
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container>
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
            <core-footer v-if="$route.name !== 'Maps'" />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NavBar from '@/components/blog/NavBar'
import { getArticle, getCategoryList } from '@/api/article'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar
  },
  data: () => ({ loading: true }),
  computed: {
    breadcrumbs: function() {
      return [
        {
          text: 'Home',
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
  async asyncData({ app, params, error }) {
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
    return {
      article: article,
      categorys: categorys
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
@import '../../assets/scss/styles/markdown/markdown';
@import '../../assets/scss/styles/markdown/github-markdown';
@import '../../assets/scss/styles/markdown/atelier-plateau-dark';
.index {
  background: #fafafa;
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
</style>
