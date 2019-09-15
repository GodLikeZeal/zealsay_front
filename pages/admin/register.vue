<template>
  <v-app id="register">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card>
              <v-card-title
                class="title font-weight-regular justify-space-between"
              >
                <span>{{ currentTitle }}</span>
                <v-avatar
                  color="primary lighten-2"
                  class="subheading white--text"
                  size="24"
                  v-text="step"
                ></v-avatar>
              </v-card-title>

              <v-window v-model="step">
                <div class="layout column align-center">
                  <img
                    src="@/static/image/logo/logo.png"
                    alt="Zealsay Admin"
                    width="200"
                    height="150"
                  />
                  <h1 class="flex my-4 primary--text">zealsay 注册引导</h1>
                </div>
                <v-form ref="form1" lazy-validation>
                  <v-window-item :value="1">
                    <v-card-text>
                      <v-text-field
                        v-model="form.username"
                        hint="用户名不能包含空格和特殊字符"
                        label="用户名"
                        :rules="usernameRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="form.password"
                        required
                        :rules="passwordRules"
                        hint="密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                        label="密码"
                        type="password"
                      ></v-text-field>
                      <v-text-field
                        v-model="form.passwordConfirm"
                        :rules="passwordRules"
                        hint="密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                        label="确认密码"
                        type="password"
                      ></v-text-field>
                      <span
                        v-if="passwordValid"
                        class="caption amber--text text--darken-1"
                      >
                        {{ errMsg }}
                      </span>
                    </v-card-text>
                  </v-window-item>
                </v-form>
                <v-window-item :value="2">
                  <v-card-text>
                    <v-text-field
                      :rules="phoneRules"
                      hint="绑定手机号可以使用手机号加验证码登录，也可以在忘记密码后通过手机号找回密码"
                      label="手机号"
                      mask="nnn nnnn nnnn"
                    ></v-text-field>
                    <v-layout>
                      <v-flex md8
                        ><v-text-field label="验证码"></v-text-field
                      ></v-flex>
                      <v-flex md4>
                        <v-btn
                          :disabled="!canSend"
                          color="primary"
                          @click="send"
                          >{{ validText }}</v-btn
                        ></v-flex
                      >
                    </v-layout>
                    <span
                      v-if="validFlag"
                      class="caption grey--text text--darken-1"
                    >
                      {{ validMsg }}
                    </span>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="3">
                  <div class="pa-3 text-xs-center">
                    <v-img
                      class="mb-3"
                      contain
                      height="128"
                      src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                    ></v-img>
                    <h3 class="title font-weight-light mb-2">
                      Welcome to Vuetify
                    </h3>
                    <span class="caption grey--text"
                      >Thanks for signing up!</span
                    >
                  </div>
                </v-window-item>
              </v-window>
              <v-divider></v-divider>

              <v-card-actions v-if="step === 1">
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="step === 3"
                  color="primary"
                  depressed
                  :loading="oneLoading"
                  @click="oneStep"
                >
                  下一步
                </v-btn>
              </v-card-actions>
              <v-card-actions v-if="step === 2">
                <v-btn depressed @click="step--">
                  返回上一步
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="step === 3"
                  color="primary"
                  depressed
                  @click="step++"
                >
                  提交注册
                </v-btn>
              </v-card-actions>
              <v-card-actions v-if="step === 3">
                <v-btn :disabled="step === 1" depressed @click="step--">
                  返回上一步
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="step === 3"
                  color="primary"
                  depressed
                  @click="step++"
                >
                  完成注册
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
import {
  validatePassword,
  validatePhone,
  validateUsername
} from '@/util/validate'
import { loginByUsername } from '@/api/login'

export default {
  layout: 'default',
  auth: false,
  data: () => ({
    step: 1,
    alert: false,
    msg: 'aa',
    oneLoading: false,
    model: {
      username: 'test',
      password: 'test123456'
    },
    form: {
      username: '',
      password: '',
      passwordConfirm: '',
      phoneNumber: '',
      validCode: ''
    },
    redirect: null,
    validText: '发送验证码',
    validMsg: '验证码不正确',
    validFlag: false,
    canSend: true,
    timer: null,
    timeCount: 45,
    errMsg: '',
    passwordValid: false,
    usernameRules: [
      v => !!v || '用户名不能为空!',
      v => validateUsername(v) || '必须是中文、英文、数字包括下划线'
    ],
    passwordRules: [
      v => !!v || '密码不能为空!',
      v =>
        validatePassword(v) ||
        '必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
    ],
    phoneRules: [
      v => !!v || '手机号不能为空!',
      v => validatePhone(v) || '不是合法的手机号'
    ]
  }),
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return '创建账户'
        case 2:
          return '绑定手机号'
        default:
          return '完成注册'
      }
    }
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
    oneStep() {
      this.oneLoading = true
      if (this.$refs.form1.validate()) {
        // 校验通过则提交保存
        if (this.form.passwordConfirm === this.form.password) {
          this.passwordValid = false
          this.step++
          this.oneLoading = false
        } else {
          this.errMsg = '请保证两次输入的密码保持一致!'
          this.passwordValid = true
          this.oneLoading = false
        }
      } else {
        this.oneLoading = false
      }
    },
    send() {
      const that = this
      if (!this.canSend) return
      this.canSend = false
      that.cloak = setInterval(function() {
        // eslint-disable-next-line no-console
        console.log('进入')
        that.timeCount--
        if (that.timeCount > 0) {
          // eslint-disable-next-line no-console
          console.log('设置')
          that.validText = that.timeCount + ' s后可重新发送'
        }
        if (that.timeCount <= 0) {
          // 当倒计时小于等于0时清除定时器
          clearInterval(that.cloak)
          // eslint-disable-next-line no-console
          console.log('完成')
          that.validText = '发送验证码'
          that.timeCount = 45
          // 这里重新开启
          that.canSend = true
        }
      }, 1000)
    },
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
          this.$swal({
            text: err.message,
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        })
    },
    submit() {
      this.loading = true
      if (this.$refs.form.validate()) {
        // 校验通过则提交保存
        this.save()
      } else {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped lang="less">
#register {
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
