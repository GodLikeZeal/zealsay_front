<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-timeline align-top>
          <v-timeline-item
            v-for="(item, i) in actions"
            :key="i"
            :color="color[parseInt((item.action.length + 15) % 15)]"
            :icon="'mdi-star'"
            fill-dot
          >
            <v-card
              :color="color[parseInt((item.action.length + 15) % 15)]"
              dark
            >
              <template v-if="item.action === 'REGISTER'">
                <v-card-title class="title"
                  >您注册系统并成为zealsay小站的一员</v-card-title
                >
                <v-card-text class="white text--primary">
                  <p>
                    您成为了系统的用户
                  </p>
                </v-card-text>
              </template>
              <template v-if="item.action === 'UNSEALING'">
                <v-card-title class="title">您已经被管理员解封</v-card-title>
                <v-card-text class="white text--primary">
                  <p>
                    您表现不错，已经被管理员解除封印！
                  </p>
                </v-card-text>
              </template>
              <template v-if="item.action === 'BAN'">
                <v-card-title class="title">您已经被管理员封禁</v-card-title>
                <v-card-text class="white text--primary">
                  <p>
                    您因为不合规操作，已经被管理员使用仙术封印！
                  </p>
                </v-card-text>
              </template>
              <template v-if="item.action === 'UP'">
                <v-card-title class="title">{{ item.targetName }}</v-card-title>
                <v-card-text class="white text--primary">
                  <p>您上架了一篇文章！</p>
                </v-card-text>
              </template>
              <template v-if="item.action === 'DOWN'">
                <v-card-title class="title">{{ item.targetName }}</v-card-title>
                <v-card-text class="white text--primary">
                  <p>您下架了一篇文章！</p>
                </v-card-text>
              </template>
              <template v-if="item.action === 'LIKE_BLOG'">
                <v-card-title class="title">{{ item.targetName }}</v-card-title>
                <v-card-text class="white text--primary">
                  <p>您点赞了一篇博客！</p>
                </v-card-text>
              </template>
              <template v-if="item.action === 'DISLIKE_BLOG'">
                <v-card-title class="title">{{ item.targetName }}</v-card-title>
                <v-card-text class="white text--primary">
                  <p>您移情别恋已不再喜欢该博客！</p>
                </v-card-text>
              </template>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Activity',
  props: {
    actions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: () => ({
    color: [
      'red',
      'pink',
      'purple',
      'deep-purple',
      'indigo',
      'blue',
      'light-blue',
      'cyan',
      'teal',
      'green',
      'light-green',
      'lime',
      'yellow',
      'amber',
      'orange'
    ],
    icons: {
      register: 'mdi-star',
      UNSEALING: 'how_to_reg',
      BAN: 'remove_circle',
      UP: 'trending_up',
      DOWN: 'trending_down',
      LIKE_BLOG: 'mdi-heart-outline',
      DISLIKE_BLOG: 'mdi-heart-broken',
      PUBLISH_BLOG: 'mdi-book-variant',
      COMMENT_BLOG: 'mdi-book-variant',
      REPLY_BLOG: 'mdi-airballoon'
    },
    items: [
      {
        color: 'red lighten-2',
        icon: 'mdi-star',
        text: '浅谈自动化测试（一）',
        title: '您点赞了一篇博客'
      },
      {
        color: 'purple lighten-1',
        icon: 'mdi-book-variant',
        text: 'Debain 8环境安装git',
        title: '您发表了一篇博客'
      },
      {
        color: 'green lighten-1',
        icon: 'mdi-airballoon',
        text: '您在《Debain 8环境安装git》中评论说：“在centos中如何安装呢？”',
        title: '您评论了一篇博客'
      },
      {
        color: 'indigo lighten-1',
        icon: 'mdi-buffer',
        text: '您注册系统并成为zealsay小站的一员',
        title: '您成为了系统的用户'
      }
    ]
  })
}
</script>

<style scoped></style>
