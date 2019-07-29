<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <blog-motto :hitokoto="motto"></blog-motto>
    </v-card>
    <v-container>
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-layout fill-height>
        <v-flex xs12 md12 sm6>
          <v-container>
            <v-layout>
              <v-flex xs3 md3 sm6>
                <v-card>
                  <v-img
                    class="white--text"
                    height="350"
                    src="https://pan.zealsay.com/user_info_bg.jpg"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <v-img
                            class="avator"
                            height="100"
                            width="100"
                            lazy-src="https://pan.zealsay.com/user_info_bg.jpg"
                            src="https://pan.zealsay.com/user_info_bg.jpg"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title> </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
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
import Motto from '@/components/blog/Motto'
import { getCategoryList } from '@/api/article'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar,
    'blog-motto': Motto
  },
  data: () => ({
    loading: true,
    colors: ['primary', 'success', 'info', 'warning', 'danger']
  }),
  computed: {
    breadcrumbs: function() {
      return [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: '友链',
          disabled: false,
          href: '/blog/friend'
        }
      ]
    }
  },
  async asyncData({ app, params, error }) {
    const resCategory = await app.$axios.$request(getCategoryList())
    let categorys = []
    if (resCategory.code === '200') {
      categorys = resCategory.data
    } else {
      return error({
        statusCode: resCategory.code,
        message: resCategory.message
      })
    }
    return {
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
