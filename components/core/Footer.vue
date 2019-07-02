<template>
  <v-footer id="core-footer" absolute>
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="tertiary--text footer-links">{{
          link.name
        }}</a>
      </span>
    </div>
    <v-spacer />
    <span class="font-weight-light copyright">
      &copy;
      {{ new Date().getFullYear() }}
      <a href="https://www.creative-tim.com/" target="_blank">zeal</a>, made
      with love
      <v-icon color="tertiary" size="17">mdi-heart</v-icon>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/dashboard' },
      { name: 'zeal', Link: 'https://www.zealsay.com' },
      { name: 'About Us', Link: 'https://www.zealsay.com/about/' },
      { name: 'Blog', Link: 'https://www.zealsay.com/category/it/' }
    ]
  })
}
</script>

<style scoped>
#core-footer {
  z-index: 0;
  height: 48px !important;
}
</style>
