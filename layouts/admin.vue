<template>
  <div id="appRoot">
    <template>
      <v-app>
        <!--<core-filter/>-->

        <!--  toolbar模块>-->
        <v-toolbar id="core-toolbar" flat prominent style="background: #eee;">
          <div class="v-toolbar-title">
            <v-toolbar-title class="tertiary--text font-weight-light">
              <v-btn
                v-if="responsive"
                class="default v-btn--simple"
                dark
                icon
                @click.stop="onClickBtn"
              >
                <v-icon>mdi-view-list</v-icon>
              </v-btn>
              {{ title }}
            </v-toolbar-title>
          </div>

          <v-spacer />
          <v-toolbar-items>
            <v-flex align-center layout py-2>
              <v-text-field
                v-if="responsiveInput"
                class="mr-4 mt-2 purple-input"
                label="Search..."
                hide-details
                color="purple"
              />
              <router-link v-ripple class="toolbar-items" to="/">
                <v-icon color="tertiary">mdi-view-dashboard</v-icon>
              </router-link>
              <v-menu
                bottom
                left
                content-class="dropdown-menu"
                offset-y
                transition="slide-y-transition"
              >
                <router-link
                  slot="activator"
                  v-ripple
                  class="toolbar-items"
                  to="/dashboard"
                >
                  <v-badge color="error" overlap>
                    <template slot="badge">
                      {{ notifications.length }}
                    </template>
                    <v-icon color="tertiary">mdi-bell</v-icon>
                  </v-badge>
                </router-link>
                <v-card>
                  <v-list dense>
                    <v-list-tile
                      v-for="notification in notifications"
                      :key="notification"
                      @click="onClick"
                    >
                      <v-list-tile-title v-text="notification" />
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-menu>
              <mFilter></mFilter>
              <v-menu
                bottom
                left
                content-class="dropdown-menu"
                offset-y
                transition="slide-y-transition"
              >
                <v-btn slot="activator" flat icon class="toolbar-items">
                  <v-avatar size="30px">
                    <v-img :src="avatar" alt="Michael Wang" />
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
            </v-flex>
          </v-toolbar-items>
        </v-toolbar>

        <!--  drawer模块 -->
        <v-navigation-drawer
          id="app-drawer"
          v-model="inputValue"
          app
          dark
          floating
          persistent
          mobile-break-point="991"
          width="260"
        >
          <v-img :src="image" height="100%">
            <v-layout class="fill-height" tag="v-list" column>
              <v-list-tile avatar>
                <v-list-tile-avatar color="white">
                  <v-img :src="logo" height="34" contain />
                </v-list-tile-avatar>
                <v-list-tile-title class="title">
                  zealsay
                </v-list-tile-title>
              </v-list-tile>
              <v-divider />
              <v-list-tile v-if="responsive">
                <v-text-field
                  class="purple-input search-input"
                  label="Search..."
                  color="purple"
                />
              </v-list-tile>
              <!--<v-list-tile-->
              <!--v-for="(link, i) in links"-->
              <!--:key="i"-->
              <!--:to="link.name"-->
              <!--:active-class="color"-->
              <!--avatar-->
              <!--class="v-list-item"-->
              <!--&gt;-->
              <!--<v-list-tile-action>-->
              <!--<v-icon>{{ link.icon }}</v-icon>-->
              <!--</v-list-tile-action>-->
              <!--<v-list-tile-title-->
              <!--v-text="link.text"-->
              <!--/>-->
              <!--</v-list-tile>-->
              <vue-perfect-scrollbar
                class="drawer-menu--scroll"
                :settings="scrollSettings"
              >
                <v-list dense expand>
                  <template v-for="(item, i) in menus">
                    <!--group with subitems-->
                    <v-list-group
                      v-if="item.items"
                      :key="item.name"
                      :group="item.group"
                      :prepend-icon="item.icon"
                      no-action="no-action"
                    >
                      <v-list-tile slot="activator" ripple="ripple">
                        <v-list-tile-content>
                          <v-list-tile-title>{{
                            item.title
                          }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <template v-for="(subItem, t) in item.items">
                        <!--sub group-->
                        <v-list-group
                          v-if="subItem.items"
                          :key="subItem.name"
                          :group="subItem.group"
                          sub-group="sub-group"
                        >
                          <v-list-tile slot="activator" ripple="ripple">
                            <v-list-tile-content>
                              <v-list-tile-title>{{
                                subItem.title
                              }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile
                            v-for="(grand, c) in subItem.children"
                            :key="c"
                            :to="genChildTarget(item, grand)"
                            :href="grand.href"
                            ripple="ripple"
                          >
                            <v-list-tile-content>
                              <v-list-tile-title>{{
                                grand.title
                              }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list-group>
                        <!--child item-->
                        <v-list-tile
                          v-else
                          :key="t"
                          :to="genChildTarget(item, subItem)"
                          :href="subItem.href"
                          :disabled="subItem.disabled"
                          :target="subItem.target"
                          ripple="ripple"
                        >
                          <v-list-tile-content>
                            <v-list-tile-title
                              ><span>{{
                                subItem.title
                              }}</span></v-list-tile-title
                            >
                          </v-list-tile-content>
                          <!-- <v-circle class="white--text pa-0 circle-pill" v-if="subItem.badge" color="red" disabled="disabled">{{ subItem.badge }}</v-circle> -->
                          <v-list-tile-action v-if="subItem.action">
                            <v-icon
                              :class="[subItem.actionClass || 'success--text']"
                              >{{ subItem.action }}</v-icon
                            >
                          </v-list-tile-action>
                        </v-list-tile>
                      </template>
                    </v-list-group>
                    <v-subheader v-else-if="item.header" :key="i">{{
                      item.header
                    }}</v-subheader>
                    <v-divider v-else-if="item.divider" :key="i"></v-divider>
                    <!--top-level link-->
                    <v-list-tile
                      v-else
                      :key="item.name"
                      :to="!item.href ? { name: item.name } : null"
                      :href="item.href"
                      ripple="ripple"
                      :disabled="item.disabled"
                      :target="item.target"
                      rel="noopener"
                    >
                      <v-list-tile-action v-if="item.icon">
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile-content>
                      <!-- <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> -->
                      <v-list-tile-action v-if="item.subAction">
                        <v-icon class="success--text">{{
                          item.subAction
                        }}</v-icon>
                      </v-list-tile-action>
                      <!-- <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> -->
                    </v-list-tile>
                  </template>
                </v-list>
              </vue-perfect-scrollbar>
            </v-layout>
          </v-img>
        </v-navigation-drawer>

        <!--  main  view-->
        <v-content>
          <div id="core-view">
            <v-fade-transition mode="out-in">
              <router-view />
            </v-fade-transition>
          </div>
          <v-footer
            v-if="$route.name !== 'Maps'"
            id="core-footer"
            absolute
            height="82"
          >
            <div class="footer-items">
              <span v-for="link in links" :key="link.name">
                <a :href="link.Link" class="tertiary--text footer-links">{{
                  link.name
                }}</a>
              </span>
            </div>
            <v-spacer />
            <span class="font-weight-light copyright">
              &copy;
              {{ new Date().getFullYear() }}
              <a href="https://www.creative-tim.com/" target="_blank">zeal</a>,
              made with love
              <v-icon color="tertiary" size="17">mdi-heart</v-icon>
            </span>
          </v-footer>
        </v-content>
      </v-app>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import mFilter from '@/components/core/Filter'
import menu from '@/api/menu'

export default {
  name: 'Admin',
  components: {
    mFilter
  },
  data: vm => ({
    notifications: [
      'Mike, John responded to your email',
      'You have 5 new tasks',
      "You're now a friend with Andrew",
      'Another Notification',
      'Another One'
    ],
    title: null,
    logo: '/assets/image/logo/cat.png',
    responsive: false,
    responsiveInput: false,
    items: [
      {
        icon: 'mdi-account',
        href: '#',
        title: 'Profile',
        click: e => {}
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: e => {}
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
    ],
    menus: menu,
    scrollSettings: {
      maxScrollbarLength: 160
    },
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'zeal', Link: 'https://www.zealsay.com' },
      { name: 'About Us', Link: 'https://www.zealsay.com/about/' },
      { name: 'Blog', Link: 'https://www.zealsay.com/category/it/' }
    ]
  }),
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    },
    ...mapGetters('user', ['name', 'avatar', 'roles']),
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get() {
        return this.$store.state.app.drawer
      },
      set(val) {
        this.setDrawer(val)
      }
    },
    items() {
      return this.$t('Layout.View.items')
    },
    computeGroupActive() {
      return true
    },
    computeLogo() {
      return '/static/m.png'
    },

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav
    }
  },
  watch: {
    $route(val) {
      this.title = val.name
    }
  },
  mounted() {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer)
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true
        this.responsiveInput = false
      } else {
        this.responsive = false
        this.responsiveInput = true
      }
    },
    logout() {
      this.$store.dispatch('user/LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    genChildTarget(item, subItem) {
      if (subItem.href) return
      if (subItem.component) {
        return {
          name: subItem.component
        }
      }
      return { name: `${item.group}/${subItem.name}` }
    }
  }
}
</script>
<style scoped lang="scss">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
#core-toolbar a {
  text-decoration: none;
}
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }

  .v-image__image--contain {
    top: 9px;
    height: 60%;
  }

  .search-input {
    margin-bottom: 30px !important;
    padding-left: 15px;
    padding-right: 15px;
  }
}
#core-footer {
  z-index: 0;
}
</style>
