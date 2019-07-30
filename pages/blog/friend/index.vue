<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="250">
      <blog-nav :category="categorys"></blog-nav>
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
            <v-layout justify-space-around>
              <v-flex md3 sm6 xs12>
                <v-card>
                  <v-container fill-height fluid class="friend-container">
                    <v-layout fill-height wrap>
                      <v-flex xs12 flexbox>
                        <div class="top-color"></div>
                        <v-img
                          class="avator elevation-2"
                          height="100"
                          width="100"
                          lazy-src="https://pan.zealsay.com/20190630223915548000000.jpg"
                          src="https://pan.zealsay.com/20190630223915548000000.jpg"
                        ></v-img>
                        <h2
                          class="justify-center text-md-center text-xs-center"
                        >
                          jinjinyike
                        </h2>
                        <p
                          class="card-description justify-center text-md-center text-xs-center"
                        >
                          前端大神萌妹
                        </p>
                        <div class="foot-color">
                          <p
                            class="foot-text card-description text-md-center text-xs-center"
                          >
                            jinjinyike.zealsay.com
                          </p>
                          <v-btn class="foot-btn" block color="success"
                            >访问网站</v-btn
                          >
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
              <v-flex md3 sm6 xs12>
                <v-card>
                  <v-container fill-height fluid class="friend-container">
                    <v-layout fill-height wrap>
                      <v-flex xs12 flexbox>
                        <div class="top-color"></div>
                        <v-img
                          class="avator elevation-2"
                          height="100"
                          width="100"
                          lazy-src="https://pan.zealsay.com/20190630223915548000000.jpg"
                          src="https://pan.zealsay.com/20190630223915548000000.jpg"
                        ></v-img>
                        <h2
                          class="justify-center text-md-center text-xs-center"
                        >
                          jinjinyike
                        </h2>
                        <p
                          class="card-description justify-center text-md-center text-xs-center"
                        >
                          前端大神萌妹
                        </p>
                        <div class="foot-color">
                          <p
                            class="foot-text card-description text-md-center text-xs-center"
                          >
                            jinjinyike.zealsay.com
                          </p>
                          <v-btn class="foot-btn" block color="success"
                            >访问网站</v-btn
                          >
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-flex>
              <v-flex md3 sm6 xs12>
                <v-card>
                  <v-container fill-height fluid class="friend-container">
                    <v-layout fill-height wrap>
                      <v-flex xs12 flexbox>
                        <div class="top-color"></div>
                        <v-img
                          class="avator elevation-2"
                          height="100"
                          width="100"
                          lazy-src="https://pan.zealsay.com/20190630223915548000000.jpg"
                          src="https://pan.zealsay.com/20190630223915548000000.jpg"
                        ></v-img>
                        <h2
                          class="justify-center text-md-center text-xs-center"
                        >
                          jinjinyike
                        </h2>
                        <p
                          class="card-description justify-center text-md-center text-xs-center"
                        >
                          前端大神萌妹
                        </p>
                        <div class="foot-color">
                          <p
                            class="foot-text card-description text-md-center text-xs-center"
                          >
                            jinjinyike.zealsay.com
                          </p>
                          <v-btn class="foot-btn" block color="success"
                            >访问网站</v-btn
                          >
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
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
import { getCategoryList } from '@/api/article'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar
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
.top-color {
  width: 100%;
  height: 8rem;
  background-color: teal;
}
.foot-color {
  display: inline-table;
  width: 100%;
  height: 2rem;
  background-color: #fef8f4;
}
.foot-btn {
  width: 80%;
  margin: 1rem auto;
}
.foot-text {
  margin-top: 1rem;
}
.avator {
  margin: -3rem auto auto;
  border-radius: 50%;
}
.friend-container {
  padding: 0;
}
.center {
  margin: 0 auto;
}
</style>
