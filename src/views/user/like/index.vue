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
export default {
  name: "Like",
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
  },
  methods: {
    handleDel(row) {
      this.$axios
        .$request(disLikeArticle(row.id))
        .then(res => {
          if (res.code === "200" && res.data) {
            location.reload();
            this.$swal({
              text: "已经从喜欢列表移除！",
              type: "success",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          } else {
            this.$swal({
              text: res.message,
              type: "error",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
        .catch(e => {
          this.$swal({
            text: e.message,
            type: "error",
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
