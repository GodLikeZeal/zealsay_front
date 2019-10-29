<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-footer id="blog-footer" absolute>
    <v-card
      flat
      tile
      class="green accent-4  white--text text-xs-center"
      width="100%"
    >
      <live2d></live2d>
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
        <i v-for="icon in icons" :key="icon.id">
          <template>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  class="mx-3 white--text"
                  icon
                  target="_Blank"
                  :href="icon.url"
                >
                  <v-icon size="24px" v-on="on">{{ icon.icon }}</v-icon>
                </v-btn>
              </template>
              {{ icon.info }}
            </v-tooltip>
          </template>
        </i>
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
import Live2d from '@/components/core/Live2d'
export default {
  components: {
    live2d: Live2d
  },
  data: () => ({
    icons: [
      { icon: 'mdi-facebook', url: '/', info: 'facebook' },
      { icon: 'mdi-twitter', url: '/', info: 'twitter' },
      { icon: 'mdi-google-plus', url: '/', info: 'google' },
      { icon: 'mdi-linkedin', url: '/', info: 'linkedin' },
      { icon: 'mdi-instagram', url: '/', info: 'instagram' },
      {
        icon: 'mdi-github-circle',
        url: 'https://github.com/GodLikeZeal',
        info: 'github'
      },
      { icon: 'mdi-sina-weibo', url: '/', info: 'sina' }
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
