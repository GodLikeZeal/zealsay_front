<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar color="primary" dark flat>
    <nuxt-link to="/">
      <v-toolbar-title class="white--text">zealsay </v-toolbar-title>
    </nuxt-link>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-menu offset-y transition="slide-y-transition" class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn flat class="hidden-md-and-up" v-on="on">
            <v-icon>mdi-view-sequential</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-tile>
            <nuxt-link to="/">
              <v-list-tile-title>主页</v-list-tile-title>
            </nuxt-link>
          </v-list-tile>
          <v-list-tile>
            <nuxt-link to="/blog/friend">
              <v-list-tile-title>友链</v-list-tile-title>
            </nuxt-link>
          </v-list-tile>
          <v-list-tile>
            <nuxt-link to="/blog/about">
              <v-list-tile-title>关于</v-list-tile-title>
            </nuxt-link>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn nuxt to="/" flat>主页</v-btn>
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            博客
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="(item, index) in categorys" :key="index">
            <nuxt-link :to="'/blog/category/' + item.id">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </nuxt-link>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn nuxt to="/blog/friend" flat>友链</v-btn>
      <v-btn nuxt to="/blog/about" flat>关于</v-btn>
      <v-btn flat>
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
          <v-btn slot="activator" flat icon class="toolbar-items">
            <v-avatar size="35px">
              <v-img :src="avatar" alt="avatar" />
            </v-avatar>
          </v-btn>
          <v-card>
            <v-list dense>
              <v-list-tile
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
                <v-list-tile-action v-if="item.icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
      </template>
      <template v-else>
        <v-btn href="/login" flat> 登录 </v-btn>
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
      default: function() {
        return []
      }
    }
  },
  computed: {
    categorys: function() {
      return this.category
    },
    loggedIn: function() {
      return this.$store.state.auth.loggedIn
    },
    avatar: function() {
      return this.$store.state.auth.user.avatar
    },
    role: function() {
      return this.$store.state.auth.user.roles
    },
    items: function() {
      return this.itemsMenu.filter(
        s => s.all || this.$store.state.auth.user.roles.indexOf('ADMIN') > -1
      )
    },
    itemsMenu: function() {
      return [
        {
          all: true,
          icon: 'mdi-account',
          href: this.$store.state.auth.user
            ? '/user/' + this.$store.state.auth.user.userId
            : '',
          title: '我的主页',
          click: e => {}
        },
        {
          all: false,
          icon: 'mdi-settings',
          href: '/admin/dashboard',
          title: '后台管理',
          click: e => {}
        },
        {
          all: true,
          icon: 'mdi-lead-pencil',
          href: '/user/blog/add',
          title: '写篇博客',
          click: e => {}
        },
        {
          all: true,
          icon: 'mdi-logout',
          href: '',
          title: '退出登录',
          click: e => {
            // vm.logout()
            this.$auth.logout('local')
            // window.getApp.$emit('APP_LOGOUT');
          }
        }
      ]
    }
  }
}
</script>

<style scoped></style>
