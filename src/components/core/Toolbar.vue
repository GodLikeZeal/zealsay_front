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
        <v-btn text icon color="tertiary" to="/">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
        <v-menu
          bottom
          left
          content-class="dropdown-menu"
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn text icon color="tertiary" v-on="on" to="/">
              <v-badge color="error" overlap>
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-icon color="tertiary">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
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
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import mFilter from "@/components/core/Filter";

export default {
  components: {
    mFilter
  },
  data: vm => ({
    notifications: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One"
    ],
    title: null,
    responsive: false,
    responsiveInput: false,
    items: [
      {
        icon: "mdi-account",
        href: "#",
        title: "Profile",
        click: e => {
          console.log(e);
        }
      },
      {
        icon: "settings",
        href: "#",
        title: "Settings",
        click: e => {
          console.log(e);
        }
      },
      {
        icon: "fullscreen_exit",
        href: "#",
        title: "Logout",
        click: () => {
          vm.logout();
          // window.getApp.$emit('APP_LOGOUT');
        }
      }
    ]
  }),

  watch: {
    $route(val) {
      this.title = val.name;
    }
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav;
    },
    ...mapGetters("user", ["name", "avatar", "roles"])
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
        this.responsiveInput = false;
      } else {
        this.responsive = false;
        this.responsiveInput = true;
      }
    },
    logout() {
      this.$store.dispatch("user/LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#core-toolbar a {
  text-decoration: none;
}
.no-background {
  background-color: inherit !important;
}
</style>
