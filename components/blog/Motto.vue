<template>
  <v-container v-if="motto">
    <v-layout>
      <v-flex md12>
        <div class="text-center word">
          <h1 class="bracket left">『</h1>
          <vue-typed-js
            class="typed"
            :show-cursor="false"
            :type-speed="100"
            :start-delay="1000"
            :back-speed="10"
            :back-delay="1000"
            :strings="['Hello', 'Welcome to zealsay!', motto.hitokoto]"
          >
            <h1 id="luke" class="hitokoto-title typing"></h1>
          </vue-typed-js>

          <h1 class="bracket right">』</h1>
          <h3 class="hitokoto_author">-「{{ motto.from }}」</h3>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Motto',
  props: {
    hitokoto: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    motto() {
      return this.hitokoto
    }
  }
}
</script>

<style lang="scss" scoped>
.bracket {
  color: white;
  font-weight: 400 !important;
  line-height: 0 !important;
  font-size: 2rem !important;
}

.hitokoto-title {
  padding: 0 3rem;
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
}

.left {
  position: absolute;
  left: 0;
  top: -2.5rem;
}

.word {
  position: relative;
  margin: 5rem 0;
}
.typed {
  display: block;
  height: 4rem;
}
</style>
