<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu
    :close-on-content-click="false"
    bottom
    left
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn text icon v-on="on" color="tertiary">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <div class="select-title caption text-uppercase sidebar-filter">
              主题色设置
            </div>

            <v-layout justify-center>
              <v-avatar
                v-for="c in colors"
                :key="c"
                :class="[c === color ? 'color-active my-' + c : 'my-' + c]"
                size="23"
                @click="updateColor(c)"
              />
            </v-layout>
            <v-divider class="mt-3" />
          </v-flex>
          <v-flex xs12>
            <div class="select-title caption text-uppercase sidebar-filter">
              开启侧边背景
            </div>
            <div class="d-flex justify-center">
              <v-switch v-model="left"></v-switch>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-layout justify-center>
              <v-flex xs12>
                <div class="select-title caption text-uppercase sidebar-filter">
                  侧边Images
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-for="img in images" :key="img" xs3>
            <v-img
              :class="[image === img ? 'image-active' : '']"
              :src="img"
              height="120"
              @click.native="setImage(img)"
            />
          </v-flex>
          <v-flex xs12>
            <div>
              <div class="select-title caption text-uppercase sidebar-filter">
                主题模式
              </div>

              <div class="d-flex justify-center">
                <v-btn
                  :color="dark ? '' : 'light-green'"
                  class="mr-2"
                  fab
                  icon
                  small
                  rounded
                  cyan
                  active
                  @click.native="updateTheme(false)"
                >
                  <v-icon>mdi-white-balance-sunny</v-icon>
                </v-btn>
                <v-btn
                  :color="dark ? 'light-green' : ''"
                  class="mr-2"
                  fab
                  icon
                  small
                  rounded
                  @click.native="updateTheme(true)"
                >
                  <v-icon>mdi-weather-night</v-icon>
                </v-btn>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
// Utilities
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    show: {
      type: String,
      default: "false"
    }
  },
  data: () => ({
    colors: [
      "primary",
      "secondary",
      "accent",
      "info",
      "success",
      "warning",
      "danger"
    ],
    images: [
      "https://pan.zealsay.com/slider-1.jpg",
      "https://pan.zealsay.com/slider-2.jpg",
      "https://pan.zealsay.com/slider-3.jpg",
      "https://pan.zealsay.com/slider-4.jpg"
    ]
  }),
  computed: {
    ...mapState("app", ["image", "color", "dark"]),
    left: {
      get: function() {
        return this.$store.state.app.slider;
      },
      set: function(newvalue) {
        this.setSlider(newvalue);
      }
    }
  },
  watch: {
    slider: function(newSlider) {
      this.setSlider(newSlider);
    }
  },
  methods: {
    ...mapMutations("app", ["setImage", "setColor", "setDark", "setSlider"]),
    updateColor(val) {
      let color;
      if (val === "primary") {
        color = "#1976d2";
      }
      if (val === "secondary") {
        color = "#ffc6bf";
      }
      if (val === "accent") {
        color = "#816ad6";
      }
      if (val === "info") {
        color = "#00cec9";
      }
      if (val === "success") {
        color = "#00b894";
      }
      if (val === "warning") {
        color = "#fcd783";
      }
      if (val === "danger") {
        color = "#f375b5";
      }
      this.$vuetify.theme.themes.light.primary = color;
      this.$vuetify.theme.themes.dark.primary = color;
      this.setColor(val);
    },
    updateTheme(val) {
      this.setDark(val);
      this.$vuetify.theme.dark = val;
    }
  }
};
</script>

<style scoped lang="scss">
.v-avatar,
.v-responsive {
  cursor: pointer;
}
.select-title {
  text-align: center;
  margin-top: 1rem;
}
.my-primary {
  background-color: #1976d2;
  border-color: #1976d2;
}
.my-secondary {
  background-color: #ffc6bf;
  border-color: #ffc6bf;
}
.my-accent {
  background-color: #816ad6;
  border-color: #816ad6;
}
.my-danger {
  background-color: #f375b5;
  border-color: #f375b5;
}
.my-info {
  background-color: #00cec9;
  border-color: #00cec9;
}
.my-success {
  background-color: #00b894;
  border-color: #00b894;
}
.my-warning {
  background-color: #fcd783;
  border-color: #fcd783;
}
</style>
