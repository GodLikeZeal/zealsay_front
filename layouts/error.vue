<template>
  <div id="appRoot">
    <div id="app" data-app="true" class="application theme--light">
      <div class="application--wrap">
        <div id="error" data-app="true" class="application theme--light">
          <div class="application--wrap">
            <div class="container fluid fill-height">
              <div class="layout align-center justify-center row">
                <div class="mr-3 hidden-sm-and-down">
                  <img src="@/static/image/gif/NotFound.gif" alt="NotFound" />
                </div>
                <div v-if="error.statusCode === 404" class="text-md-center">
                  <h1>404</h1>
                  <h2 class="my-3 headline ">
                    抱歉, 再怎么找也找不到啦!
                  </h2>
                  <div>
                    <button
                      type="button"
                      class="v-btn theme--light primary"
                      @click="goHome"
                    >
                      <div class="v-btn__content">返回首页</div>
                    </button>
                  </div>
                </div>
                <div
                  v-else-if="error.statusCode === 403"
                  class="text-md-center"
                >
                  <h1>403</h1>
                  <h2 class="my-3 headline ">
                    抱歉, 您无权访问该资源哦!
                  </h2>
                  <div>
                    <button
                      type="button"
                      class="v-btn theme--light primary"
                      @click="goHome"
                    >
                      <div class="v-btn__content">返回首页</div>
                    </button>
                    <button
                      type="button"
                      class="v-btn theme--light success"
                      @click="goLogin"
                    >
                      <div class="v-btn__content">返回登录</div>
                    </button>
                  </div>
                </div>
                <div v-else class="text-md-center">
                  <h1>500</h1>
                  <h2 class="my-3 headline ">
                    抱歉, 服务器开小差了,稍后再试试哦!
                  </h2>
                  <div>
                    <button
                      type="button"
                      class="v-btn theme--light primary"
                      @click="goHome"
                    >
                      <div class="v-btn__content">返回首页</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: function() {
        return {}
      }
    }
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
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
}

.application {
  background: none !important;
}
</style>
