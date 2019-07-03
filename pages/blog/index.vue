<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index" class="index">
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
            <div v-html="article.contentHtml"></div>
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
import { getArticle } from '@/api/article'

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
  async asyncData({ app, query, error }) {
    const resArticle = await app.$axios.$request(getArticle(query.id))
    let article = {}
    if (resArticle.code === '200') {
      article = resArticle.data
    } else {
      return error({ statusCode: resArticle.code, message: resArticle.message })
    }
    return {
      article: article
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
.index {
  background: #fafafa;
}
.v-toolbar__content {
  margin-left: 1.2rem !important;
}
/*.nav-items {*/
/*  margin-right: 8rem;*/
/*}*/
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
