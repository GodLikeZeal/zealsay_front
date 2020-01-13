<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-img
          class="white--text"
          height="350"
          src="https://pan.zealsay.com/info-1.jpg"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <v-img
                  class="avator"
                  height="100"
                  width="100"
                  :lazy-src="row.avatar"
                  :src="row.avatar"
                ></v-img>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div class="row center">
            <span class="indigo--text text-detail">{{ row.age }} 岁</span>
            <span v-if="row.sex == 1" class="text-detail" title="男"
              ><img width="15px" src="@/static/image/sex/boy.png"
            /></span>
            <span v-if="row.sex == 0" class="text-detail" title="女"
              ><img width="15px" src="@/static/image/sex/girl.png"
            /></span>
            <span class="indigo--text text-detail">{{ row.username }}</span>
          </div>
          <v-card-text>
            <p class="grey--text">
              <span class="text-detail">姓名 ：{{ row.name }}</span>
              <span>城市：{{ row.city ? row.city : "暂无" }}</span>
              <span class="text-detail">注册于：{{ row.registerAt }} </span>
            </p>
            <p v-if="row.phoneNumber">
              <span class="text-detail grey--text"
                >手机号 ：{{ row.phoneNumber }}</span
              >
              <v-icon small color="success"> fa-check-circle</v-icon>
              <span class="green--text"> 已绑定</span>
            </p>
            <p v-else>
              <span class="text-detail grey--text">手机号 ：无</span>
              <v-icon small color="warning"> fa-exclamation-circle</v-icon>
              <span class="orange--text"> 未绑定</span>
            </p>
            <p v-if="row.email">
              <span class="text-detail grey--text"
                >邮 箱 ：{{ row.email }}</span
              >
              <v-icon small color="success"> fa-check-circle</v-icon>
              <span class="green--text"> 已绑定</span>
            </p>
            <p v-else>
              <span class="text-detail grey--text">邮 箱 ：无</span>
              <v-icon small color="warning"> fa-exclamation-circle</v-icon>
              <span class="orange--text"> 未绑定</span>
            </p>
            <p class="grey--text">
              <span class="text-detail"
                >地址 ：{{ row.address ? row.address : "无" }}</span
              >
            </p>
            <p v-if="row.label" class="grey--text">
              <span class="text-detail">TA的标签</span>
              <v-chip
                v-for="label in row.label.split(',')"
                :key="label"
                :color="color[parseInt(Math.random() * 6, 10)]"
                small
              >
                <v-avatar>
                  <v-img
                    :src="icon[parseInt(Math.random() * 20, 10)]"
                    :lazy-src="icon[parseInt(Math.random() * 20, 10)]"
                    alt="label"
                  />
                </v-avatar>
                {{ label }}
              </v-chip>
            </p>
          </v-card-text>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Info",
  props: {
    alert: {
      type: Object,
      default: function() {
        return {};
      }
    },
    row: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: () => ({
    icon: [
      require("@/assets/food/南瓜.png"),
      require("@/assets/food/吐司.png"),
      require("@/assets/food/夏威夷果.png"),
      require("@/assets/food/山楂片.png"),
      require("@/assets/food/开心果.png"),
      require("@/assets/food/抹茶麻薯.png"),
      require("@/assets/food/杏仁.png"),
      require("@/assets/food/板栗.png"),
      require("@/assets/food/柠檬干.png"),
      require("@/assets/food/炭烤肠.png"),
      require("@/assets/food/猪肉铺.png"),
      require("@/assets/food/瓜子.png"),
      require("@/assets/food/芒果干.png"),
      require("@/assets/food/花生.png"),
      require("@/assets/food/草莓干.png"),
      require("@/assets/food/蒸蛋糕.png"),
      require("@/assets/food/蚕豆.png"),
      require("@/assets/food/蛋黄酥.png"),
      require("@/assets/food/辣条.png"),
      require("@/assets/food/鱿鱼仔.png")
    ],
    color: ["info", "success", "primary", "warning", "error", "admin.vue"]
  })
};
</script>

<style lang="less" scoped>
.avator {
  margin: 160px auto auto;
  border-radius: 50%;
}

.center {
  margin: 0 auto;
}

.text-detail {
  margin: 0 15px;
}
</style>
