<template>
  <v-app id="login" class="primary">
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
      <bubbly-bg></bubbly-bg>
    </v-content>
  </v-app>
</template>

<script>
import qs from 'qs'

export default {
  layout: 'default',
  auth: false,
  data() {
    return {
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
  created() {},
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
<style scoped lang="css">
#login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
}
</style>
