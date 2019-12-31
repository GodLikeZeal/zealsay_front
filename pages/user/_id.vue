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
                  user.cityName ? user.cityName : '未知地区'
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
    <v-container class="my-container fill">
      <v-layout>
        <v-flex xs12 md12>
          <v-tabs fixed-tabs>
            <v-tab key="activity"> 动态 </v-tab>
            <v-tab key="blog"> 博客 </v-tab>
            <v-tab key="like"> 喜欢 </v-tab>
            <v-tab key="info"> 资料 </v-tab>
            <v-tab-item key="activity">
              <activity :actions="actions"></activity>
            </v-tab-item>
            <v-tab-item key="blog">
              <blog :desserts="blogs" :category="categorys"></blog>
            </v-tab-item>
            <v-tab-item key="like"
              ><like :desserts="likes" :category="categorys"></like
            ></v-tab-item>
            <v-tab-item key="info"
              ><info :form="user" :province="province" :roles="roles"></info
            ></v-tab-item>
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
import Like from './like'
import Activity from './activity'
import Blog from './blog'
import Info from './info'
import NavBar from '@/components/blog/NavBar'
import { getCategoryList } from '@/api/article'
import { getProvinceList } from '@/api/dict'
import { getRoleList } from '@/api/role'
import {
  getUserById,
  getCurrentUserBlog,
  getCurrentUserLikeBlog,
  getCurrentUserActions
} from '@/api/user'

export default {
  components: {
    'blog-nav': NavBar,
    like: Like,
    activity: Activity,
    blog: Blog,
    info: Info
  },
  data: () => ({
    loading: true
  }),
  computed: {
    like: {
      get: function() {
        return {
          page: 1,
          rowsPerPage: 12,
          totalItems: 1
        }
      },
      set: function() {}
    }
  },
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
    const objBlog = {}
    objBlog.pageNumber = 1
    objBlog.pageSize = 12
    const resBlog = await app.$axios.$request(getCurrentUserBlog(objBlog))
    let blogs = []
    if (resBlog.code === '200') {
      blogs = resBlog.data.records
    } else {
      return error({
        statusCode: resBlog.code,
        message: resBlog.message
      })
    }
    const objLike = {}
    objLike.pageNumber = 1
    objLike.pageSize = 12
    const resLike = await app.$axios.$request(getCurrentUserLikeBlog(objLike))
    let likes = []
    if (resLike.code === '200') {
      likes = resLike.data.records
    } else {
      return error({
        statusCode: resLike.code,
        message: resLike.message
      })
    }
    let actions = []
    const resActions = await app.$axios.$request(getCurrentUserActions())
    if (resActions.code === '200') {
      actions = resActions.data
    } else {
      return error({
        statusCode: resActions.code,
        message: resActions.message
      })
    }
    const resProvince = await app.$axios.$request(getProvinceList())
    let provinces = []
    if (resProvince.code === '200') {
      provinces = resProvince.data.map(r => {
        return {
          value: r.code,
          text: r.name
        }
      })
    } else {
      return error({
        statusCode: resProvince.code,
        message: resProvince.message
      })
    }
    const resRole = await app.$axios.$request(getRoleList())
    let roles = []
    if (resRole.code === '200') {
      roles = resRole.data.map(r => {
        return {
          value: r.value,
          text: r.name
        }
      })
    } else {
      return error({ statusCode: resRole.code, message: resRole.message })
    }
    return {
      categorys: categorys,
      user: user,
      blogs: blogs,
      likes: likes,
      actions: actions,
      province: provinces,
      roles: roles
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
.fill {
  max-width: inherit;
}
</style>
