<template>
  <v-row v-if="mounted" cols="12">
    <v-col class="d-flex align-center justify-center">
      <img src="@/static/image/gif/NotFound.gif" alt="NotFound" />
      <div v-if="error.statusCode === 404" class="text-center">
        <h1>404</h1>
        <h2 class="my-3 headline ">
          抱歉, 再怎么找也找不到啦!
        </h2>
        <div>
          <v-btn color="primary" @click="goHome">
            返回首页
          </v-btn>
        </div>
      </div>
      <div v-else-if="error.statusCode === 403" class="text-center">
        <h1>403</h1>
        <h2 class="my-3 headline ">
          抱歉, 您还未进行认证!
        </h2>
        <div>
          <v-btn color="primary" @click="goHome">
            返回首页
          </v-btn>
          <v-btn color="success" @click="goLogin">
            返回登录
          </v-btn>
        </div>
      </div>
      <div v-else-if="error.statusCode === 401" class="text-center">
        <h1>401</h1>
        <h2 class="my-3 headline ">
          抱歉, 您无权访问该资源哦!
        </h2>
        <div>
          <v-btn color="primary" @click="goHome">
            返回首页
          </v-btn>
          <v-btn color="success" @click="goLogin">
            返回登录
          </v-btn>
        </div>
      </div>
      <div v-else class="text-center">
        <h1>500</h1>
        <h2 class="my-3 headline ">
          抱歉, 服务器开小差了,稍后再试试哦!
        </h2>
        <div>
          <v-btn color="primary" @click="goHome">
            返回首页
          </v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    mounted: false
  }),
  mounted() {
    setTimeout(() => {
      this.mounted = true
    }, 5)
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/' })
    },
    goLogin() {
      this.$router.push({ path: '/admin/login' })
    }
  }
}
</script>
<style scoped lang="css">
h1 {
  font-size: 150px !important;
  line-height: 150px !important;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}

.application {
  background: none !important;
}
</style>
