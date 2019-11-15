<template>
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-md-center word">
              <h1 class="hitokoto-title">
                <v-avatar size="120">
                  <img :src="user.avatar" alt="avatar" />
                </v-avatar>
              </h1>
              <div class="row center">
                <span class="white--text font-weight-bold text-detail">{{
                  user.username
                }}</span>
                <span class="white--text font-weight-thin ">|</span>
                <span
                  class="text-detail white--text font-weight-bold"
                  title="男"
                  ><img
                    v-if="user.sex == 1"
                    width="15px"
                    src="~/static/image/sex/boy.png"/>
                  <img
                    v-if="user.sex == 2"
                    width="15px"
                    src="~/static/image/sex/girl.png"
                /></span>
                <span class="white--text font-weight-thin ">|</span>
                <span class="white--text font-weight-bold text-detail">{{
                  user.city ? user.sex : '未知地区'
                }}</span>
              </div>
              <h5 class="white--text font-weight-medium text-detail">
                {{ user.introduction }}
              </h5>
              <!--              <div>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-qqchat</v-icon>-->
              <!--                </v-btn>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-wechat</v-icon>-->
              <!--                </v-btn>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-sina-weibo</v-icon>-->
              <!--                </v-btn>-->
              <!--              </div>-->
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container class="my-container">
      <v-layout>
        <v-flex xs12 md12>
          <v-tabs fixed-tabs>
            <v-tab key="activity"> 动态 </v-tab>
            <v-tab key="blog"> 博客 </v-tab>
            <v-tab key="like"> 喜欢 </v-tab>
            <v-tab key="info"> 资料 </v-tab>
            <v-tab-item key="activity">
              <v-container>
                <v-layout>
                  <v-flex>
                    <v-list three-line>
                      <template v-for="(item, index) in items">
                        <v-subheader v-if="item.header" :key="item.header">
                          {{ item.header }}
                        </v-subheader>

                        <v-divider
                          v-else-if="item.divider"
                          :key="index"
                          :inset="item.inset"
                        ></v-divider>

                        <v-list-tile v-else :key="item.title" avatar>
                          <v-list-tile-avatar>
                            <img :src="item.avatar" />
                          </v-list-tile-avatar>

                          <v-list-tile-content>
                            <v-list-tile-title
                              v-html="item.title"
                            ></v-list-tile-title>
                            <v-list-tile-sub-title
                              v-html="item.subtitle"
                            ></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </template>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>
            <v-tab-item key="blog">blog</v-tab-item>
            <v-tab-item key="like">like</v-tab-item>
            <v-tab-item key="info">info</v-tab-item>
          </v-tabs>
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
import { getCategoryList } from '@/api/article'
import { getUserById } from '@/api/user'

export default {
  components: {
    'blog-nav': NavBar
  },
  data: () => ({
    loading: true,
    items: [
      { header: 'Today' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: '胡歌',
        subtitle:
          "<span class='text--primary'>评论了</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: '张学友 <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>喜欢了</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: '杨幂',
        subtitle:
          "<span class='text--primary'>发表了</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: '刘亦菲',
        subtitle:
          "<span class='text--primary'>点赞了</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: '鲁迅y',
        subtitle:
          "<span class='text--primary'>阅读了</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  }),
  computed: {},
  async asyncData({ app, params, error }) {
    if (
      params.id == null ||
      params.id === '' ||
      params.id === undefined ||
      params.id === 'undefined'
    ) {
      return error({
        statusCode: 404,
        message: '该页面不存在'
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
    const resUser = await app.$axios.$request(getUserById(params.id))
    let user = {}
    if (resUser.code === '200') {
      if (resUser.data) {
        user = resUser.data
      } else {
        return error({
          statusCode: 404,
          message: '该页面不存在'
        })
      }
    } else {
      return error({
        statusCode: resUser.code,
        message: resUser.message
      })
    }
    return {
      categorys: categorys,
      user: user
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
.center {
  margin: 2rem auto 1rem auto;
}
.text-detail {
  margin: 0 1.5rem;
}
</style>
