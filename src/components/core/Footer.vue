<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-footer id="blog-footer">
    <v-card flat tile class=" accent-4  grey--text text-center" width="100%">
      <v-card-text>
        <v-list-item-title avatar>
          <v-list-item-avatar class="avatar">
            <v-img :src="logo" height="34" contain />
          </v-list-item-avatar>
          <v-list-item-title class="title">
            zealsay
          </v-list-item-title>
        </v-list-item-title>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey--text">
        <p>
          Copyright &copy; {{ new Date().getFullYear() }} | All right reserved
        </p>
        <p>
          鄂ICP备17008798号 Powered by
          <a class="pink--text" href="https://blog.zealsay.com/" target="_blank"
            >zeal</a
          >, made with love
          <v-icon color="pink" size="17">mdi-heart</v-icon>
        </p>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      { icon: "mdi-facebook", url: "/", info: "facebook" },
      { icon: "mdi-twitter", url: "/", info: "twitter" },
      { icon: "mdi-google-plus", url: "/", info: "google" },
      { icon: "mdi-linkedin", url: "/", info: "linkedin" },
      { icon: "mdi-instagram", url: "/", info: "instagram" },
      {
        icon: "mdi-github-circle",
        url: "https://github.com/GodLikeZeal",
        info: "github"
      },
      { icon: "mdi-sina-weibo", url: "/", info: "sina" }
    ],
    logo: "/cat.png"
  })
};
</script>

<style scoped>
#blog-footer {
  background-color: initial;
  height: auto;
}
.avatar {
  margin-right: 0 !important;
}
</style>
