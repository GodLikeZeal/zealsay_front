<template>
  <v-card class="card">
    <v-card-title primary-title class="left_list_header">
      <h4 class="title font-weight-bold">热门标签</h4>
    </v-card-title>
    <v-card-text>
      <v-chip
        v-for="label in labels"
        :key="label.id"
        small
        :color="label.outColor"
        text-color="white"
        class="chip-label"
      >
        <v-avatar v-if="label.icon.startsWith('http')">
          <img :src="label.icon" alt="trevor" />
        </v-avatar>
        <v-avatar v-else-if="label.icon === ''" :class="label.avatarColor">
          {{ label.name.charAt(0).toUpperCase() }}
        </v-avatar>
        <v-avatar v-else>
          <v-icon>{{ label.icon }}</v-icon>
        </v-avatar>
        <a
          style="color: white"
          :href="'/blog/label/' + label.name"
          target="_Blank"
        >
          {{ label.name }}</a
        >
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "LabelCloud",
  props: {
    items: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    labels: function() {
      return this.items;
    }
  }
};
</script>

<style lang="scss" scoped>
.left_list_header {
  h4 {
    margin: auto;
  }
}

.left_list_item {
  margin: 0.5rem 1.25rem;
  font-size: small;
  width: inherit;
}
.chip-label {
  margin: 0.2rem;
}
</style>
