<template>
  <v-toolbar id="core-toolbar" flat prominent>
    <!--    <div class="v-toolbar-title">-->
    <!--      <v-toolbar-title class="tertiary&#45;&#45;text font-weight-light">-->
    <!--        <v-btn-->
    <!--          v-if="responsive"-->
    <!--          class="default v-btn&#45;&#45;simple"-->
    <!--          icon-->
    <!--          @click.stop="onClickBtn"-->
    <!--        >-->
    <!--          <v-icon>mdi-view-list</v-icon>-->
    <!--        </v-btn>-->
    <!--        {{ title }}-->
    <!--      </v-toolbar-title>-->
    <!--    </div>-->

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
            <v-avatar size="35px">
              <v-img :src="this.$auth.user.avatar" alt="avatar" />
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
</template>

<script>
import { mapMutations } from 'vuex'
import mFilter from '@/components/core/Filter'

export default {
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
    responsive: false,
    responsiveInput: false,
    items: [
      {
        icon: 'mdi-account',
        href: vm.$store.state.auth.user
          ? '/user/' + vm.$store.state.auth.user.userId
          : '',
        title: '我的主页',
        click: e => {}
      },
      {
        icon: 'mdi-home',
        href: '/',
        title: '回到首页',
        click: e => {}
      },
      {
        icon: 'mdi-logout',
        href: '#',
        title: '退出登录',
        click: e => {
          this.$auth.logout('local')
          // window.getApp.$emit('APP_LOGOUT');
        }
      }
    ]
  }),
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
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
    async logout() {
      await this.$auth.logout().then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs)
      })
    }
  }
}
</script>

<style scoped>
#core-toolbar a {
  text-decoration: none;
}
#core-toolbar {
  background: none;
}
</style>
