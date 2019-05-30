<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
  >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
    <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <v-btn
      icon
      href="https://github.com/GodLikeZeal/zealsay_material_ui.git"
    >
      <v-icon>fa fa-github</v-icon>
    </v-btn>
    <v-btn
      icon
      @click="handleFullScreen()"
    >
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <v-menu
      offset-y
      origin="center center"
      class="elelvation-1"
      :nudge-bottom="14"
      transition="scale-transition"
    >
      <v-btn
        icon
        flat
        slot="activator"
      >
        <v-badge
          color="red"
          overlap
        >
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
      </v-btn>
      <notification-list></notification-list>
    </v-menu>
    <v-menu
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <router-link
              v-ripple
              class="toolbar-items"
              to="/user-profile"
      >
        <v-avatar size="30px">
          <img
                  :src="avatar"
                  alt="Michael Wang"
          />
        </v-avatar>
      </router-link>
      <v-list class="pa-0">
        <v-list-tile
          v-for="(item,index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
          :target="item.target"
          rel="noopener"
          :key="index"
        >
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import { mapGetters } from 'vuex';
import NotificationList from './NotificationList';
import Util from '@/util';
const vm=this;
export default {
  name: 'app-toolbar',
  components: {
    NotificationList
  },
  data: (vm) => ({
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: e => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: e => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: e => {
          vm.logout()
          // window.getApp.$emit('APP_LOGOUT');
        }
      }
    ]
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
    ...mapGetters(['name', 'avatar', 'roles'])
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
            location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
          });
    }
  }
};
</script>
