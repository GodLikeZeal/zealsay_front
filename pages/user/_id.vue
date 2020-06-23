<template>
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-center word">
              <h1 class="hitokoto-title">
                <v-avatar size="120">
                  <img :src="user.avatar" alt="avatar" />
                </v-avatar>
              </h1>
              <div class="row justify-center center">
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
                    src="@/static/image/sex/boy.png"/>
                  <img v-else width="15px" src="@/static/image/sex/girl.png"
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
    <v-container class="fill">
      <v-layout wrap>
        <v-flex md12>
          <v-tabs centered>
            <v-tab key="activity" class="font-weight-bold"> 动态</v-tab>
            <v-tab key="blog" class="font-weight-bold"> 博客</v-tab>
            <v-tab key="like" class="font-weight-bold"> 喜欢</v-tab>
            <v-tab key="info" class="font-weight-bold"> 资料</v-tab>
            <v-tab-item key="activity">
              <activity :actions="actions"></activity>
            </v-tab-item>
            <v-tab-item key="blog">
              <blog
                :desserts="blogs"
                :category="categorys"
                :owner="owner"
              ></blog>
            </v-tab-item>
            <v-tab-item key="like">
              <like
                :desserts="likes"
                :category="categorys"
                :owner="owner"
              ></like>
            </v-tab-item>
            <v-tab-item key="info">
              <info
                :form="user"
                :province="province"
                :roles="roles"
                :owner="owner"
              ></info>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
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
import { getUserData } from '@/api/data'
import Info from './info'
import Blog from './blog'
import Activity from './activity'
import Like from './like'

export default {
  components: {
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
      get() {
        return {
          page: 1,
          rowsPerPage: 12,
          totalItems: 1
        }
      },
      set() {}
    }
  },
  async asyncData({ app, params, store, error }) {
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

    const res = await app.$axios.$request(getUserData(params.id))
    if (res.code === '200') {
      const categorys = res.data.categorys
      const user = res.data.user
      const blogs = res.data.userPage.records
      const likes = res.data.likePage.records
      const actions = res.data.actions
      const province = res.data.province.map((r) => {
        return {
          value: r.code,
          text: r.name
        }
      })
      const roles = res.data.roles.map((r) => {
        return {
          value: r.value,
          text: r.name
        }
      })
      let owner = false
      if (
        store.state.auth &&
        store.state.auth.user &&
        store.state.auth.user.id
      ) {
        owner = store.state.auth.user.id === user.id
      }

      return {
        categorys,
        user,
        blogs,
        likes,
        actions,
        province,
        roles,
        owner
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
