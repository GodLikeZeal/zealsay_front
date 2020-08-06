<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-toolbar id="core-toolbar" class="no-background" flat prominent>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <v-text-field
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          label="Search..."
          hide-details
          color="purple"
        />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn text icon color="tertiary" to="/" v-on="on">
              <v-icon>mdi-view-dashboard</v-icon>
            </v-btn>
          </template>
          博客首页
        </v-tooltip>

        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn text icon color="tertiary" v-on="on">
              <v-badge color="error" overlap>
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon color="tertiary" v-on="on">mdi-bell</v-icon>
                  </template>
                  消息
                </v-tooltip>
              </v-badge>
            </v-btn>
          </template>
          <v-card>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-item-title v-text="notification" />
              </v-list-item>
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
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import mFilter from '@/components/core/Filter'
import { mapMutations } from 'vuex'

export default {
  components: {
    mFilter
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    },
    avatar() {
      return this.$store.state.auth.user.avatar
    },
    notifications() {
      return [
        '系统提示：欢迎注册zealsay',
        '系统提示：您关注的博客有更新',
        '系统提示：你的好友 Tina 上线了',
        'zeal 对你说: hello!',
        'Tina 回复你：好的'
      ]
    },
    responsive: {
      get() {
        return false
      },
      set() {}
    },
    responsiveInput: {
      get() {
        return false
      },
      set() {}
    },
    items() {
      return [
        {
          icon: 'mdi-account',
          href: this.$store.state.auth.user
            ? '/user/' + this.$store.state.auth.user.id
            : '',
          title: '个人主页',
          click: (e) => {
            console.log(e)
          }
        },
        {
          icon: 'fullscreen_exit',
          href: '#',
          title: '退出登录',
          click: (e) => {
            this.$auth.logout('local')
            // window.getApp.$emit('APP_LOGOUT');
          }
        }
      ]
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
    }
  }
}
</script>

<style lang="scss" scoped>
#core-toolbar a {
  text-decoration: none;
}
.no-background {
  background-color: inherit !important;
}
</style>
