<template>
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
    <v-btn slot="activator" flat icon class="toolbar-items">
      <v-icon color="tertiary">mdi-settings</v-icon>
    </v-btn>
    <v-card>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">
              主题样式设置
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
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">
              侧边Images
            </div>
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
            <v-btn
              target="_blank"
              color="success"
              block
              @click.native="setImage('')"
            >
              No background
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <v-btn
              href="https://demos.creative-tim.com/vuetify-material-dashboard/documentation"
              target="_blank"
              class="white--text"
              color="warning"
              block
            >
              Documentation
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase">
              <div class=" sidebar-filter">
                Thank You for Sharing!
              </div>

              <div>
                <v-btn
                  color="indigo"
                  class="mr-2 v-btn-facebook"
                  fab
                  icon
                  small
                  round
                >
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn color="cyan" class="v-btn-twitter" fab icon small round>
                  <v-icon>mdi-twitter</v-icon>
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
      'https://pan.zealsay.com/340172-106.jpg',
      'https://pan.zealsay.com/132407-106.jpg',
      'https://pan.zealsay.com/318037-106.jpg',
      'https://pan.zealsay.com/298125-106.jpg'
    ]
  }),
  computed: {
    ...mapState('app', ['image', 'color'])
  },
  created(app) {
    let colorSet
    if (this.color === 'primary') {
      colorSet = '#9c27b0'
    }
    if (this.color === 'info') {
      colorSet = '#00bcd4'
    }
    if (this.color === 'success') {
      colorSet = '#4caf50'
    }
    if (this.color === 'warning') {
      colorSet = '#ff9800'
    }
    if (this.color === 'danger') {
      colorSet = '#f44336'
    }
    // eslint-disable-next-line no-console
    console.log(app)
    if (!colorSet === undefined) {
      app.$vuetify.theme.primary = colorSet
    }
    // eslint-disable-next-line no-console
    console.log(colorSet)
  },
  methods: {
    ...mapMutations('app', ['setImage', 'setColor']),
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
</style>
