<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar color="primary" flat>
    <nuxt-link to="/">
      <v-toolbar-title class="white--text title">zealsay </v-toolbar-title>
    </nuxt-link>
    <v-spacer></v-spacer>

    <v-toolbar-items class="white--text">
      <v-menu offset-y transition="slide-y-transition" class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn text class="hidden-md-and-up white--text" v-on="on">
            <v-icon>mdi-view-sequential</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <nuxt-link to="/">
              <v-list-item-title class="font-weight-medium"
                >主页</v-list-item-title
              >
            </nuxt-link>
          </v-list-item>
          <v-list-item>
            <nuxt-link to="/blog/friend">
              <v-list-item-title class="font-weight-medium"
                >友链</v-list-item-title
              >
            </nuxt-link>
          </v-list-item>
          <v-list-item>
            <nuxt-link to="/blog/about">
              <v-list-item-title class="font-weight-medium"
                >关于</v-list-item-title
              >
            </nuxt-link>
          </v-list-item>
          <template v-if="loggedIn">
            <v-list-item v-for="(item, index) in items" :key="index">
              <nuxt-link :to="item.href">
                <v-list-item-title class="font-weight-medium">{{
                  item.title
                }}</v-list-item-title>
              </nuxt-link>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item>
              <nuxt-link to="/login">
                <v-list-item-title class="font-weight-medium"
                  >登录</v-list-item-title
                >
              </nuxt-link>
            </v-list-item>
          </template>
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
            <nuxt-link :to="'/blog/category/' + item.id">
              <v-list-item-title class="subtitle-2">{{
                item.name
              }}</v-list-item-title>
            </nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn class="white--text" to="/blog/friend" text>友链</v-btn>
      <v-btn class="white--text" to="/blog/about" text>关于</v-btn>
      <v-btn class="white--text" text @click="search">
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
                :disabled="item.disabled"
                :target="item.target"
                ripple="ripple"
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
export default {
  name: 'NavBar',
  props: {
    category: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    categorys() {
      return this.category
    },
    loggedIn() {
      return this.$store.state.auth ? this.$store.state.auth.loggedIn : false
    },
    avatar() {
      return this.$store.state.auth.user.avatar
    },
    role() {
      return this.$store.state.auth.user.role
    },
    items() {
      return this.itemsMenu.filter(
        (s) =>
          s.show.includes('ALL') ||
          s.show.includes(this.$store.state.auth.user.role)
      )
    },
    itemsMenu() {
      return [
        {
          show: ['ALL'],
          icon: 'mdi-account',
          href: this.$store.state.auth.user
            ? '/user/' + this.$store.state.auth.user.id
            : '',
          title: '我的主页',
          click: (e) => {}
        },
        {
          show: ['ROLE_ADMIN', 'ROLE_EXPERIENCER'],
          icon: 'mdi-settings',
          href: '/admin/dashboard',
          title: '后台管理',
          click: (e) => {}
        },
        {
          show: ['ROLE_ADMIN', 'ROLE_EDITOR', 'ROLE_EXPERIENCER'],
          icon: 'mdi-lead-pencil',
          href: '/user/blog/add',
          title: '写篇博客',
          click: (e) => {}
        },
        {
          show: ['ALL'],
          icon: 'mdi-logout',
          href: '#',
          title: '退出登录',
          click: (e) => {
            // vm.logout()
            this.$auth.logout('local')
            // window.getApp.$emit('APP_LOGOUT');
          }
        }
      ]
    }
  },
  methods: {
    search() {
      this.$swal({
        text: '搜索我还没想好哩！',
        type: 'info',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}
</script>

<style scoped></style>
