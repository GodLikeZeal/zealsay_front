<template>
  <v-app id="conform">
    <v-container fluid fill-height>
      <v-layout align-center justify-center row>
        <div class="text-md-center">
          <div>
            <v-progress-circular
              :size="70"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <h2>登录跳转中...</h2>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Redirect",
  auth: false,
  // eslint-disable-next-line require-await
  created() {
    if (!this.$isServer) {
      const token = this.$route.query.token;
      const redirect = this.$route.query.redirect;
      if (token != null && token !== "") {
        this.$auth.setUserToken(token).then(() => {
          this.$router.push({
            path: redirect || "/"
          });
        });
      } else {
        this.$router.push({
          path: redirect || "/"
        });
      }
    }
  }
};
</script>
<style scoped lang="css">
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
