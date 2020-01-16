<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar color="primary" flat>
    <router-link to="/">
      <v-toolbar-title class="white--text title">zealsay </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <v-toolbar-items class="white--text">
      <v-menu offset-y transition="slide-y-transition" class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn text class="hidden-md-and-up white--text" v-on="on">
            <v-icon>mdi-view-sequential</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile>
            <router-link to="/">
              <v-list-tile-title class="white--text">主页</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile>
            <router-link to="/blog/friend">
              <v-list-tile-title class="white--text">友链</v-list-tile-title>
            </router-link>
          </v-list-tile>
          <v-list-tile>
            <router-link to="/blog/about">
              <v-list-tile-title class="white--text">关于</v-list-tile-title>
            </router-link>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn class="white--text" to="/" text>主页</v-btn>
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn class="white--text" text v-on="on">
            博客
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in categorys" :key="index">
            <router-link :to="'/blog/category/' + item.id">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn class="white--text" to="/blog/friend" text>友链</v-btn>
      <v-btn class="white--text" to="/blog/about" text>关于</v-btn>
      <v-btn class="white--text" text>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <template v-if="loggedIn">
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn text icon class="toolbar-items" v-on="on">
              <v-avatar size="35px">
                <v-img :src="avatar" alt="avatar" />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list dense>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="!item.href ? { name: item.name } : null"
                :href="item.href"
                ripple="ripple"
                :disabled="item.disabled"
                :target="item.target"
                rel="noopener"
                @click="item.click"
              >
                <v-list-item-action v-if="item.icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
      <template v-else>
        <v-btn href="/login" text class="white--text"> 登录 </v-btn>
      </template>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { getCategoryList } from "@/api/article";

export default {
  name: "NavBar",
  data: () => ({
    categorys: []
  }),
  computed: {
    loggedIn: function() {
      return this.$store.state.user.token;
    },
    avatar: function() {
      return this.$store.state.user.avatar;
    },
    role: function() {
      return this.$store.state.user.role;
    },
    items: function() {
      return this.itemsMenu.filter(
        s => s.all || this.$store.state.user.role === "ADMIN"
      );
    },
    itemsMenu: function() {
      return [
        {
          all: true,
          icon: "mdi-account",
          href: this.$store.state.user
            ? "/user/" + this.$store.state.user.id
            : "",
          title: "我的主页",
          click: () => {}
        },
        {
          all: false,
          icon: "mdi-settings",
          href: "/admin/dashboard",
          title: "后台管理",
          click: () => {}
        },
        {
          all: true,
          icon: "mdi-lead-pencil",
          href: "/user/blog/add",
          title: "写篇博客",
          click: () => {}
        },
        {
          all: true,
          icon: "mdi-logout",
          href: "#",
          title: "退出登录",
          click: () => {
            // vm.logout()
            this.$store.dispatch("user/LogOut").then(() => {
              // location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
              // vm.$router.push("/");
            });
          }
        }
      ];
    }
  },
  created() {
    getCategoryList()
      .then(res => {
        if (res.code === "200") {
          this.categorys = res.data;
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
          text: "拉取内容失败",
          type: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
  }
};
</script>

<style scoped></style>
