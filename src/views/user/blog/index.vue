<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-layout row wrap>
      <v-flex v-for="card in desserts" :key="card.id" xs6 sm3 md4>
        <v-card class="card" hover>
          <v-img :src="card.coverImage" height="200px"> </v-img>

          <v-card-title>
            <div>
              <div class="subheading text-truncate text-title">
                {{ card.title }}
              </div>
              <h6 class="grey--text text-truncate">
                {{ card.subheading }}
              </h6>
              <span
                v-if="card.status === 'FORMAL'"
                class="caption text-truncate green--text"
                >已发布</span
              >
              <span
                v-if="card.status === 'DRAFT'"
                class="caption text-truncate orange--text"
                >草稿</span
              >
              <span
                v-if="card.status === 'DOWN'"
                class="caption text-truncate red--text"
                >下架</span
              >
            </div>
          </v-card-title>
          <v-card-actions>
            <v-tooltip v-if="card.openness === 'SELFONLY'" top>
              <template v-slot:activator="{ on }">
                <v-icon medium v-on="on">mdi-lock-outline</v-icon>
              </template>
              仅自己可见
            </v-tooltip>
            <v-tooltip v-else top>
              <template v-slot:activator="{ on }">
                <v-icon medium v-on="on">mdi-eye-outline</v-icon>
              </template>
              公开
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon :href="'/blog/' + card.id" target="_Blank">
                  <v-icon medium v-on="on">mdi-information-outline</v-icon>
                </v-btn>
              </template>
              查看
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  :href="'/user/blog/edit?id=' + card.id"
                  target="_Blank"
                >
                  <v-icon medium v-on="on">mdi-pencil</v-icon>
                </v-btn>
              </template>
              编辑
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Blog",
  props: {
    pagination: {
      type: Object,
      default: function() {
        return {};
      }
    },
    desserts: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.text-title {
  width: 100%;
}
</style>
