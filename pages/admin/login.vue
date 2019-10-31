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
                  <h1 class="flex my-4 primary--text">zealsay 说你想说</h1>
                </div>
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
                  <a nuxt href="register">注册账号</a> OR
                  <a class="right">忘记密码？</a>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <!--                <v-btn title="微信登录" icon>-->
                <!--                  <v-icon medium color="light-green">mdi-wechat </v-icon>-->
                <!--                </v-btn>-->
                <!--                <v-btn title="QQ登录" icon>-->
                <!--                  <v-icon medium color="light-blue">mdi-qqchat</v-icon>-->
                <!--                </v-btn>-->
                <v-btn
                  title="github登录"
                  nuxt
                  href="/app/api/v1/oauth/login/github"
                  icon
                >
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
import { loginByUsername } from '@/api/login'

export default {
  layout: 'default',
  auth: false,
  data: () => ({
    alert: false,
    loading: false,
    model: {
      username: 'test',
      password: 'test123'
    },
    errMsg: ''
  }),
  created() {
    if (!this.$isServer) {
      const str = localStorage.getItem('vuex')
      let val
      if (str) {
        val = JSON.parse(str).app.color
      }
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
    async login() {
      this.loading = true
      // 登录接口待调试
      const data = this.model
      const code = await this.$axios
        .$request(loginByUsername(data))
        .then(res => {
          if (res.code === '200') {
            return res.code
          } else {
            this.$swal({
              text: res.message,
              type: 'error',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
          }
        })
        .catch(err => {
          this.$swal({
            text: err.message,
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        })
      if (!(code === '200')) {
        this.loading = false
        return
      }
      const redirect = this.$route.query.redirect
      this.$auth
        .loginWith('local', { data: qs.stringify(data) })
        .then(() => {
          this.loading = false
          this.$router.push({
            path: redirect || '/'
          })
        })
        .catch(err => {
          this.loading = false
          this.$swal({
            text: err.message,
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        })
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
