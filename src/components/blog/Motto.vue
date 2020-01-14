<template>
  <v-container v-if="motto">
    <v-layout>
      <v-flex md12>
        <div class="text-md-center word">
          <h1 class="bracket left">『</h1>
          <h1 class="hitokoto-title">
            {{ motto.hitokoto }}
          </h1>
          <h1 class="bracket right">』</h1>
          <h3 class="hitokoto_author">-「{{ motto.from }}」</h3>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Motto",
  props: {
    hitokoto: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  computed: {
    motto: function() {
      return this.hitokoto;
    }
  }
};
</script>

<style lang="scss" scoped>
.bracket {
  color: white;
  font-weight: 400 !important;
  line-height: 0 !important;
  font-size: 2rem !important;
}

.hitokoto-title {
  color: white;
  font-weight: 400 !important;
  margin-bottom: 0.6rem;
  line-height: 1 !important;
  font-size: 2rem !important;
}

.hitokoto_author {
  color: snow;
  float: right;
  margin-top: 6rem;
}

.right {
  position: absolute;
  right: 0;
  margin-right: -3rem;
}

.left {
  position: absolute;
  left: 0;
  top: -2.5rem;
  margin-left: -3rem;
}

.word {
  position: relative;
  margin: 5rem 0;
}
</style>
