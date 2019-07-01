<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="@/static/image/logo/logo.png"
                    alt="Zealsay Admin"
                    width="200"
                    height="150"
                  />
                  <h1 class="flex my-4 primary--text">zealsay 后台系统</h1>
                </div>
                <v-alert :value="visible" type="info">
                  {{ errMsg }}
                </v-alert>
                <v-form>
                  <v-text-field
                    v-model="model.username"
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="model.password"
                    append-icon="lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-alert :value="alert" type="error">
                    {{ msg }}
                  </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon medium color="light-green">mdi-wechat </v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon medium color="light-blue">mdi-qqchat</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon medium color="light-grey">mdi-github-circle</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" :loading="loading" @click="login"
                  >登 录
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import qs from 'qs'
import { mapState } from 'vuex'

export default {
  layout: 'default',
  auth: false,
  data: () => ({
    alert: false,
    msg: 'aa',
    loading: false,
    model: {
      username: 'test',
      password: 'test123456'
    },
    redirect: undefined,
    visible: false,
    errMsg: ''
  }),
  computed: {
    ...mapState('app', ['color'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    if (!this.$isServer) {
      const val = this.color
      if (val === 'info') {
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.bubbly()
      } else if (val === 'success') {
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.bubbly({
          colorStart: '#fff4e6',
          colorStop: '#ffe9e4',
          blur: 1,
          compose: 'source-over',
          bubbleFunc: () => `hsla(${Math.random() * 50}, 100%, 50%, .3)`
        })
      } else if (val === 'warning') {
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.bubbly({
          colorStart: '#4c004c',
          colorStop: '#1a001a',
          bubbleFunc: () =>
            `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.25})`
        })
      } else if (val === 'danger') {
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.bubbly({
          colorStart: '#111',
          colorStop: '#422',
          bubbleFunc: () => `hsla(0, 100%, 50%, ${Math.random() * 0.25})`
        })
      } else {
        // eslint-disable-next-line nuxt/no-globals-in-created
        window.bubbly()
      }
    }
  },
  methods: {
    login() {
      this.loading = true
      // 登录接口待调试
      const data = this.model
      this.$auth
        .loginWith('local', { data: qs.stringify(data) })
        .then(() => {
          this.loading = false
          this.$router.push({
            path: this.redirect || '/admin/dashboard'
          })
        })
        .catch(err => {
          this.loading = false
          this.visible = true
          this.errMsg = err.message
          setTimeout(() => {
            this.visible = false
          }, 3000)
        })
      // this.$store
      //   .dispatch('user/LoginByUsername', this.model)
      //   .then(() => {
      //     this.loading = false
      //     this.$router.push({ path: this.redirect || '/admin/Dashboard' })
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.visible = true
      //     this.errMsg = err.message
      //     setTimeout(() => {
      //       this.visible = false
      //     }, 3000)
      //   })
    }
  }
}
</script>
<style scoped lang="less">
#login {
  height: 0%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
  background: none;
}
</style>
