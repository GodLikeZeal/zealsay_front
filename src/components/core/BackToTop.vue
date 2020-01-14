<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div :style="customStyle" class="back-to-ceiling">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-fab-transition>
          <v-btn
            v-show="visible"
            color="primary"
            dark
            absolute
            top
            right
            fab
            @click="backToTop"
          >
            <v-icon>keyboard_arrow_up</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
      <span>返回顶部</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: "64px",
          bottom: "64px",
          width: "64px",
          height: "64px",
          "border-radius": "4px",
          "line-height": "45px"
        };
      }
    },
    transitionName: {
      type: String,
      default: "fade"
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight;
    },
    backToTop() {
      if (this.isMoving) return;
      const start = window.pageYOffset;
      let i = 0;
      this.isMoving = true;
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500));
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition);
          clearInterval(this.interval);
          this.isMoving = false;
        } else {
          window.scrollTo(0, next);
        }
        i++;
      }, 16.7);
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    }
  }
};
</script>

<style scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
