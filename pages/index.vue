<template>
  <div id="index">
    <!-- header -->
    <v-card color="primary">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="white--text">zealsay</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn flat>主页</v-btn>
          <v-btn flat>分类</v-btn>
          <v-btn flat>友链</v-btn>
          <v-btn flat>关于</v-btn>
          <v-btn flat><v-icon>search</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-layout>
          <div class="col-md-10 col-md-offset-1 text-center">
            <h1 class="hitokoto-title">一天吐槽太多次的话，梗也是会用完的。</h1>
          </div>
        </v-layout>
      </v-container>
    </v-card>
    <v-container fluid>
      <!-- 内容 -->
      <div>
        内容
      </div>
      <!-- 页脚 -->
      <div>
        <core-footer v-if="$route.name !== 'Maps'" />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>
.v-toolbar__content {
  margin-left: 120px !important;
}
</style>
