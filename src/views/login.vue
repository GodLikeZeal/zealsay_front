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
                    src="../assets/logo.png"
                    alt="Vue Material Admin"
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
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="model.username"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.password"
                  ></v-text-field>
                  <v-alert :value="alert" type="error">
                    {{ msg }}
                  </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading"
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
export default {
  data() {
    return {
      alert: false,
      msg: "aa",
      loading: false,
      model: {
        username: "zeal",
        password: "123456"
      },
      redirect: undefined,
      visible: false,
      errMsg: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    login() {
      this.loading = true;
      // 登录接口待调试
      this.$store
        .dispatch("user/LoginByUsername", this.model)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: this.redirect || "/dashboard" });
        })
        .catch(err => {
          this.loading = false;
          this.visible = true;
          this.errMsg = err.message;
          setTimeout(() => {
            this.visible = false;
          }, 3000);
        });
    }
  }
};
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
