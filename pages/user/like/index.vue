<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-for="card in desserts" :key="card.id" xs6 sm3 md4>
        <v-card class="card" hover>
          <v-img :src="card.coverImage" height="200px"> </v-img>

          <v-card-title primary-title>
            <div class="subheading text-truncate text-title">
              {{ card.title }}
            </div>
            <h6 class="grey--text text-truncate">
              {{ card.subheading }}
            </h6>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'Like',
  props: {
    pagination: {
      type: Object,
      default: function() {
        return {}
      }
    },
    desserts: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      color: ['primary', 'secondary', 'success', 'info', 'warning', 'danger']
    }
  },
  computed: {},
  methods: {
    handleEdit(row) {
      this.$router.push({ path: '/user/blog/edit', query: { id: row.id } })
    },
    handleInfo(row) {
      this.row = { ...row }
      this.$swal({
        title: '操作成功!',
        text: '预览功能正在开发中，别急嘛',
        type: 'success'
      })
      // this.$dialog.show(info, {row: row, width: 600})
    }
  }
}
</script>
<style lang="less" scoped>
.text-title {
  width: 100%;
}
</style>
