<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index" class="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <v-toolbar color="primary" dark flat>
        <nuxt-link to="/">
          <v-avatar tile>
            <img src="@/static/image/logo/cat.png" alt="logo" />
          </v-avatar>
          <v-toolbar-title style="display: inline-flex;" class="white--text"
            >zealsay
          </v-toolbar-title>
        </nuxt-link>
        <v-spacer></v-spacer>

        <v-toolbar-items style="margin-right:8rem">
          <v-btn nuxt to="/" flat>主页</v-btn>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn flat v-on="on">
                博客
              </v-btn>
            </template>
            <v-list>
              <v-list-tile v-for="(item, index) in categorys" :key="index">
                <nuxt-link :to="'/blog/category/' + item.id">
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </nuxt-link>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-btn flat>友链</v-btn>
          <v-btn flat>关于</v-btn>
          <v-btn flat>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
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
import { getArticle, getCategoryList } from '@/api/article'

export default {
  auth: false,
  data: () => ({ loading: true }),
  computed: {
    breadcrumbs: function() {
      return [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2'
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
