<template>
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav></blog-nav>
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-center word">
              <h1 class="hitokoto-title">
                <v-avatar size="120">
                  <img :src="user.avatar" alt="avatar" />
                </v-avatar>
              </h1>
              <div class="row justify-center center">
                <span class="white--text font-weight-bold text-detail">{{
                  user.username
                }}</span>
                <span class="white--text font-weight-thin ">|</span>
                <span
                  class="text-detail white--text font-weight-bold"
                  title="男"
                  ><img
                    v-if="user.sex == 1"
                    width="15px"
                    src="../../assets/sex/boy.png"/>
                  <img
                    v-if="user.sex == 2"
                    width="15px"
                    src="../../assets/sex/girl.png"
                /></span>
                <span class="white--text font-weight-thin ">|</span>
                <span class="white--text font-weight-bold text-detail">{{
                  user.cityName ? user.cityName : "未知地区"
                }}</span>
              </div>
              <h5 class="white--text font-weight-medium text-detail">
                {{ user.introduction }}
              </h5>
              <!--              <div>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-qqchat</v-icon>-->
              <!--                </v-btn>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-wechat</v-icon>-->
              <!--                </v-btn>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-sina-weibo</v-icon>-->
              <!--                </v-btn>-->
              <!--              </div>-->
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container class="fill">
      <v-row>
        <v-col cols="12">
          <v-tabs centered>
            <v-tab key="activity"> 动态 </v-tab>
            <v-tab key="blog"> 博客 </v-tab>
            <v-tab key="like"> 喜欢 </v-tab>
            <v-tab key="info"> 资料 </v-tab>

            <v-tab-item key="activity"><activity></activity></v-tab-item>
            <v-tab-item key="blog"><blog></blog></v-tab-item>
            <v-tab-item key="like"><like></like></v-tab-item>
            <v-tab-item key="info"><info></info></v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
      <core-back-to-top :visibility-height="300" :back-position="0" />
    </v-container>
    <!-- 页脚 -->
    <v-layout row>
      <v-flex>
        <div class="footer">
          <blog-footer v-if="$route.name !== 'Maps'" />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Like from "./like";
import Activity from "./activity";
import Blog from "./blog";
import Info from "./info";
import NavBar from "@/components/blog/NavBar";

import { getUserById } from "@/api/user";

import { mapState } from "vuex";
export default {
  components: {
    "blog-nav": NavBar,
    like: Like,
    activity: Activity,
    blog: Blog,
    info: Info
  },
  data: () => ({
    loading: true,
    user: {}
  }),
  computed: {
    ...mapState("user", ["id"])
  },
  created() {
    if (
      this.$route.params.id == null ||
      this.$route.params.id === "" ||
      this.$route.params.id === undefined ||
      this.$route.params.id === "undefined" ||
      this.$route.params.id !== this.id
    ) {
      this.$router.push("/404");
    }
    getUserById(this.$route.params.id)
      .then(res => {
        if (res.code === "200") {
          this.user = res.data;
        } else {
          this.$swal.fire({
            text: res.message,
            type: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
      .catch(() => {
        this.$swal.fire({
          text: "拉取省份失败",
          type: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      console.log("click search");
    }
  }
};
</script>
<style lang="scss" scoped>
.index {
  background: #fafafa;
}
.hitokoto-title {
  color: white;
  font-weight: 400 !important;
  margin-top: 5rem;
  margin-bottom: 0.6rem;
  line-height: 1 !important;
  font-size: 2rem !important;
}
.word {
  position: relative;
}
.center {
  margin: 2rem auto 1rem auto;
}
.text-detail {
  margin: 0 1.5rem;
}
.fill {
  max-width: inherit;
}
</style>
