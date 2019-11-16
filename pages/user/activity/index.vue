<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-timeline align-top>
          <v-timeline-item
            v-for="(item, i) in items"
            :key="i"
            :color="item.color"
            :icon="item.icon"
            fill-dot
          >
            <v-card :color="item.color" dark>
              <v-card-title class="title">{{ item.title }}</v-card-title>
              <v-card-text class="white text--primary">
                <p>
                  {{ item.text }}
                </p>
              </v-card-text>
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
  data: () => ({
    items: [
      {
        color: 'red lighten-2',
        icon: 'mdi-star',
        text: '浅谈自动化测试（一）',
        title: '您点赞了一篇博客'
      },
      {
        color: 'purple darken-1',
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
        color: 'indigo',
        icon: 'mdi-buffer',
        text: '您注册系统并成为zealsay小站的一员',
        title: '您成为了系统的用户'
      }
    ]
  })
}
</script>

<style scoped></style>
