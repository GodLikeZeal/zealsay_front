<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img :src="slider ? image : ''" height="100%">
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
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
                      nuxt
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>{{ grand.title }}</v-list-tile-title>
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
                    nuxt
                  >
                    <v-list-tile-content>
                      <v-list-tile-title
                        :class="[
                          $route.name.replace(/-/g, '/') ===
                          subItem.href.substring(1)
                            ? 'primary--text'
                            : ''
                        ]"
                        ><span>{{ subItem.title }}</span></v-list-tile-title
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
                nuxt
              >
                <v-list-tile-action v-if="item.icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <!-- <v-circle class="white--text pa-0 chip--x-small" v-if="item.badge" :color="item.color || 'primary'" disabled="disabled">{{ item.badge }}</v-circle> -->
                <v-list-tile-action v-if="item.subAction">
                  <v-icon class="success--text">{{ item.subAction }}</v-icon>
                </v-list-tile-action>
                <!-- <v-circle class="caption blue lighten-2 white--text mx-0" v-else-if="item.chip" label="label" small="small">{{ item.chip }}</v-circle> -->
              </v-list-tile>
            </template>
          </v-list>
        </vue-perfect-scrollbar>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex'
import menu from '@/api/menu'

export default {
  data: () => ({
    logo: '/image/logo/cat.png',
    menus: menu,
    responsive: false,
    scrollSettings: {
      maxScrollbarLength: 160
    }
  }),
  computed: {
    ...mapState('app', ['image', 'color', 'slider']),
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
      return '@/static/m.png'
    },

    sideToolbarColor() {
      return this.$vuetify.options.extra.sideNav
    }
  },
  mounted() {
    this.onResponsiveInverted()
    if (window) {
      window.addEventListener('resize', this.onResponsiveInverted)
    }
  },
  beforeDestroy() {
    if (window) {
      window.removeEventListener('resize', this.onResponsiveInverted)
    }
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted() {
      if (window) {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      }
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
#app-drawer {
  z-index: 0;
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
#core-view {
  padding-bottom: 100px;
}
</style>
