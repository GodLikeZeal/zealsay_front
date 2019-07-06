<template>
  <div v-if="desserts.length > 0">
    <template v-for="(item, i) in desserts">
      <v-card :key="i" flat class="card">
        <v-layout row>
          <v-flex xs6>
            <a :href="'/blog/' + item.id" target="_Blank">
              <v-img
                transition="fade-transition"
                :aspect-ratio="320 / 200"
                class="card elevation-3 cover"
                :src="item.coverImage"
                contain
              ></v-img>
            </a>
          </v-flex>
          <v-flex xs6>
            <v-card-title primary-title>
              <div>
                <div class="font-weight">
                  {{ item.categoryName }}
                </div>
                <h4>{{ item.title }}</h4>
                <div class="font-weight-medium">
                  {{ item.subheading }}
                  <a :href="'/blog/' + item.id" target="_Blank">阅读更多…</a>
                </div>
                <h5>
                  {{ item.authorName }} {{ item.createDate }} 415次浏览 2个点赞
                </h5>
                <div v-if="item.label">
                  <v-chip
                    v-for="(label, index) in item.label.split(',')"
                    :key="index"
                    :color="colors[parseInt((label.length * 5) / 5)]"
                    text-color="white"
                  >
                    {{ label }}
                  </v-chip>
                </div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </template>
  </div>
  <div v-else>
    <h2>再怎么找也找不到啦</h2>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: ['list'],
  data: () => ({
    colors: ['primary', 'success', 'info', 'warning', 'danger']
  }),
  computed: {
    desserts: function() {
      return this.list
    }
  }
}
</script>

<style lang="scss" scoped></style>
