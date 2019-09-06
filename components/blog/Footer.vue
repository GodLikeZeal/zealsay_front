<template>
  <v-footer id="core-footer" absolute>
    <v-card
      flat
      tile
      class="green accent-4  white--text text-xs-center"
      width="100%"
    >
      <v-card-text>
        <v-layout justify-center>
          <v-list-tile avatar>
            <v-list-tile-avatar color="white">
              <v-img :src="logo" height="34" contain />
            </v-list-tile-avatar>
            <v-list-tile-title class="title">
              zealsay
            </v-list-tile-title>
          </v-list-tile>
        </v-layout>
      </v-card-text>
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text" style="display: block">
        <blockquote class="blockquote">
          勇敢且善良.
        </blockquote>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
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
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'zeal', Link: 'https://www.zealsay.com' },
      { name: 'About Us', Link: 'https://www.zealsay.com/about/' },
      { name: 'Blog', Link: 'https://www.zealsay.com/category/it/' }
    ],
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-google-plus',
      'mdi-linkedin',
      'mdi-instagram',
      'mdi-github-circle',
      'mdi-sina-weibo'
    ],
    logo: '/image/logo/cat.png'
  })
}
</script>

<style scoped>
/*#core-footer {*/
/*  z-index: 0;*/
/*  height: 48px !important;*/
/*}*/
</style>
