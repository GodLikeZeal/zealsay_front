<template>
  <v-card class="card">
    <v-card-title primary-title class="left_list_header">
      <h4 class="title font-weight-bold">近期评论</h4>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item-title class="left_list_item text-truncate">
          zeal发表在 <a>消息系统设计与实现「下篇」</a>
        </v-list-item-title>
        <v-divider></v-divider>
        <v-list-item-title class="left_list_item text-truncate">
          zeal发表在 <a>消息系统设计与实现「下篇」</a>
        </v-list-item-title>
        <v-divider></v-divider>
        <v-list-item-title class="left_list_item text-truncate">
          zeal发表在 <a>消息系统设计与实现「下篇」</a>
        </v-list-item-title>
        <v-divider></v-divider>
        <v-list-item-title class="left_list_item text-truncate">
          zeal发表在 <a>消息系统设计与实现「下篇」</a>
        </v-list-item-title>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RecentDiscuss"
};
</script>

<style lang="scss" scoped>
.left_list_header {
  h4 {
    margin: auto;
  }
}

.left_list_item {
  margin: 0.5rem 1.25rem;
  font-size: small;
  width: inherit;
}
</style>
