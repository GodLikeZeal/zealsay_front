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
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn icon @click="handleDel(card)">
                  <v-icon medium v-on="on">delete_outline</v-icon>
                </v-btn>
              </template>
              不再喜欢
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { disLikeArticle } from "@/api/article";
import { getCurrentUserLikeBlog } from "@/api/user";
export default {
  name: "Like",
  data: () => ({
    desserts: []
  }),
  created() {
    getCurrentUserLikeBlog()
      .then(res => {
        if (res.code === "200") {
          this.desserts = res.data.records;
        } else {
          this.$swal.fire({
            text: res.message,
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
      .catch(() => {
        this.$swal.fire({
          text: "拉取文章失败",
          icon: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
  },
  methods: {
    handleDel(row) {
      disLikeArticle(row.id)
        .then(res => {
          if (res.code === "200" && res.data) {
            location.reload();
            this.$swal.fire({
              text: "已经从喜欢列表移除！",
              icon: "success",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          } else {
            this.$swal.fire({
              text: res.message,
              icon: "error",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
        .catch(e => {
          this.$swal.fire({
            text: e.message,
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.text-title {
  width: 100%;
}
</style>
