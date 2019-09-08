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
          <div v-if="links.length > 0">
            <v-container>
              <v-layout justify-space-around>
                <template v-for="(item, i) in links">
                  <v-flex :key="i" md3 sm6 xs12>
                    <v-card hover>
                      <v-container fill-height fluid class="friend-container">
                        <v-layout fill-height wrap>
                          <v-flex xs12 flexbox>
                            <div
                              class="top-color"
                              :style="{ backgroundColor: item.color }"
                            ></div>
                            <v-img
                              class="avator elevation-2"
                              height="100"
                              width="100"
                              :lazy-src="item.avatar"
                              :src="item.avatar"
                            ></v-img>
                            <h2
                              class="justify-center text-md-center text-xs-center"
                            >
                              {{ item.friendName }}
                            </h2>
                            <p
                              class="card-description justify-center text-md-center text-xs-center"
                            >
                              {{ item.friendInfo }}
                            </p>
                            <div class="foot-color">
                              <p
                                class="foot-text card-description text-md-center text-xs-center"
                              >
                                {{ item.link }}
                              </p>
                              <v-btn
                                class="foot-btn"
                                block
                                color="primary"
                                target="_Blank"
                                :href="item.link"
                                >访问网站
                              </v-btn>
                            </div>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </v-container>
          </div>
          <div v-else>
            <v-container fluid fill-height>
              <v-layout align-center justify-center>
                <div class="mr-3 hidden-sm-and-down">
                  <img src="@/static/image/gif/NotFound.gif" alt="NotFound" />
                </div>
                <div class="text-md-center">
                  <h2 class="my-3 headline ">一个好友也没有!</h2>
                  <h2 class="my-3 headline ">我能怎么办?我也很绝望!</h2>
                </div>
              </v-layout>
            </v-container>
          </div>
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
import { getFriendLinkList } from '@/api/friendlink'
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
          text: '主页',
          disabled: false,
          href: '/'
        },
        {
          text: '友链',
          disabled: true,
          href: '/blog/friend'
        }
      ]
    }
  },
  async asyncData({ app, params, error }) {
    const resLink = await app.$axios.$request(getFriendLinkList())
    let links = []
    if (resLink.code === '200') {
      links = resLink.data
    } else {
      return error({
        statusCode: resLink.code,
        message: resLink.message
      })
    }
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
      links: links.records,
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
  /*background-color: indianred;*/
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
