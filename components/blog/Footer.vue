<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-footer id="blog-footer" padless>
    <v-card
      flat
      tile
      class="primary accent-4  white--text text-center"
      width="100%"
    >
      <live2d></live2d>
      <v-card-text>
        <v-list-item-title avatar>
          <v-list-item-avatar color="white" class="avatar">
            <v-img :src="logo" height="34" contain />
          </v-list-item-avatar>
          <v-list-item-title class="title white--text">
            zealsay
          </v-list-item-title>
        </v-list-item-title>
      </v-card-text>
      <v-card-text>
        <i v-for="icon in icons" :key="icon.id">
          <template>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="icon.url"
                  class="mx-3 white--text"
                  icon
                  target="_Blank"
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
        <p class="title font-weight-light">
          勇敢且善良.
        </p>
      </v-card-text>

      <v-divider class="divider"></v-divider>

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
  name: 'BlogFooter',
  components: {
    live2d: Live2d
  },
  data: () => ({
    icons: [
      {
        icon: 'mdi-github-circle',
        url: 'https://github.com/GodLikeZeal',
        info: 'github'
      },
      {
        icon: 'mdi-github-face',
        url: 'https://gitee.com/GodLikeZeal',
        info: 'gitee'
      },
      {
        icon: 'mdi-language-c',
        url: 'https://blog.csdn.net/zealsay',
        info: 'CSDN'
      },
      {
        icon: 'mdi-skype',
        url: 'https://segmentfault.com/u/zeal_5eecb699bdb08',
        info: 'Segmentfault'
      },
      {
        icon: 'mdi-qqchat',
        url: 'https://pan.zealsay.com/zealsay/qq.png',
        info: 'QQ'
      },
      {
        icon: 'mdi-wechat',
        url: 'https://pan.zealsay.com/zealsay/wechat.jpg',
        info: '微信'
      },
      {
        icon: 'mdi-sina-weibo',
        url: 'https://weibo.com/u/7472823409/home?leftnav=1',
        info: 'sina'
      }
    ],
    logo: '/image/logo/cat.png'
  })
}
</script>

<style scoped>
.avatar {
  margin-right: 0 !important;
}
.divider {
  border-color: #aaa;
}
</style>
