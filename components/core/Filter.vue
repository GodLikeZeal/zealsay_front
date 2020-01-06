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
      <v-btn text icon class="toolbar-items" v-on="on">
        <v-icon color="tertiary">mdi-settings</v-icon>
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
                :class="[
                  c === color ? 'color-active color-' + c : 'color-' + c
                ]"
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
                  :color="theme === 'dark' ? '' : 'light-green'"
                  class="mr-2"
                  fab
                  icon
                  small
                  rounded
                  cyan
                  active
                  @click.native="setTheme('light')"
                >
                  <v-icon>mdi-white-balance-sunny</v-icon>
                </v-btn>
                <v-btn
                  :color="theme === 'dark' ? 'light-green' : ''"
                  class="mr-2"
                  fab
                  icon
                  small
                  rounded
                  @click.native="setTheme('dark')"
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
import { mapMutations, mapState } from 'vuex'

export default {
  props: {
    show: {
      type: String,
      default: 'false'
    }
  },
  data: () => ({
    colors: ['primary', 'info', 'success', 'warning', 'danger'],
    images: [
      'https://pan.zealsay.com/slider-1.jpg',
      'https://pan.zealsay.com/slider-2.jpg',
      'https://pan.zealsay.com/slider-3.jpg',
      'https://pan.zealsay.com/slider-4.jpg'
    ]
  }),
  computed: {
    ...mapState('app', ['image', 'color', 'theme']),
    left: {
      get: function() {
        return this.$store.state.app.slider
      },
      set: function(newvalue) {
        this.setSlider(newvalue)
      }
    }
  },
  watch: {
    slider: function(newSlider, oldSlider) {
      this.setSlider(newSlider)
    }
  },
  methods: {
    ...mapMutations('app', ['setImage', 'setColor', 'setTheme', 'setSlider']),
    updateColor(val) {
      let color
      if (val === 'primary') {
        color = '#9c27b0'
      }
      if (val === 'info') {
        color = '#00bcd4'
      }
      if (val === 'success') {
        color = '#4caf50'
      }
      if (val === 'warning') {
        color = '#ff9800'
      }
      if (val === 'danger') {
        color = '#f44336'
      }
      this.$vuetify.theme.primary = color
      this.setColor(val)
    }
  }
}
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
</style>
