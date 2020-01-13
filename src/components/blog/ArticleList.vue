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
                <div
                  :class="
                    'font-weight ' + 'text--' + colors[item.categoryId % 6]
                  "
                >
                  {{ item.categoryName }}
                </div>
                <h4 class="headline">{{ item.title }}</h4>
                <div class="subtitle-1">
                  {{ item.subheading }}
                  <a :href="'/blog/' + item.id" target="_Blank">阅读更多…</a>
                </div>
                <h6 class="caption text-none">
                  {{ item.authorName }} 发表于
                  {{ item.createDate | formatDate }}
                </h6>
                <h6>{{ item.readNum }}次浏览 {{ item.likeNum }}个点赞</h6>
                <div v-if="item.label">
                  <v-chip
                    v-for="(label, index) in item.label.split(',')"
                    :key="index"
                    class="chip-label"
                    :color="colors[parseInt((label.length + 6) % 6)]"
                    text-color="white"
                  >
                    <a
                      style="color: white"
                      :href="'/blog/label/' + label"
                      target="_Blank"
                    >
                      {{ label }}</a
                    >
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
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <div class="mr-3 hidden-sm-and-down">
          <img src="../../assets/gif/NotFound.gif" alt="NotFound" />
        </div>
        <div class="text-md-center">
          <h2 class="my-3 headline ">再怎么找也找不到啦!</h2>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Util from "@/util";

export default {
  name: "ArticleList",
  filters: {
    formatDate(time) {
      if (time != null && time !== "") {
        return Util.formateDate(time);
      } else {
        return "";
      }
    }
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    desserts: function() {
      return this.list;
    },
    colors: function() {
      return ["primary", "secondary", "success", "info", "warning", "danger"];
    }
  }
};
</script>

<style lang="scss" scoped>
.chip-label {
  margin: 0.3rem;
}
</style>
