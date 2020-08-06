<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md11>
        <v-form ref="form" lazy-validation>
          <material-card
            color="primary"
            title="配置站点作者信息"
            text="完善作者基本信息后，点击保存设置"
          >
            <v-container py-0>
              <v-layout wrap>
                <template v-for="(item, i) in config">
                  <v-flex
                    v-if="
                      item.name != null &&
                        (item.name === 'MALE' || item.name === 'FEMALE')
                    "
                    :key="i"
                    xs12
                    md12
                  >
                    <v-radio-group
                      v-model="item.name"
                      :label="item.description"
                      row
                    >
                      <v-radio label="男" value="MALE"></v-radio>
                      <v-radio label="女" value="FEMALE"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex v-else :key="i" xs12 md12>
                    <v-text-field
                      v-model="item.name"
                      :rules="titleRules"
                      hint="不能包含空格和特殊字符,不超过250个字符"
                      class="purple-input"
                      :label="item.description"
                    />
                  </v-flex>
                </template>
                <v-flex xs12 text-center>
                  <v-btn
                    :loading="loading"
                    rounded
                    color="primary"
                    @click="submit()"
                  >
                    保存设置
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </material-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getConfigAuthor, saveConfig } from '@/api/dict'

export default {
  name: 'Author',
  layout: 'admin',
  data: () => ({
    loading: false,
    titleRules: [
      (v) => !!v || '内容不能为空!',
      (v) => (v && v.length <= 250) || '内容不得超过250个字符'
    ]
  }),

  async asyncData({ app, query, error }) {
    const res = await app.$axios.$request(getConfigAuthor())
    let config = {}
    if (res.code === '200') {
      config = res.data.map((c) => {
        if (c.name === 'true' || c.name === 'false') {
          // eslint-disable-next-line no-eval
          c.name = eval(c.name.toLowerCase())
        }
        return c
      })
    } else {
      return error({
        statusCode: res.code,
        message: res.message
      })
    }
    return {
      config
    }
  },
  methods: {
    submit() {
      this.loading = true
      if (this.$refs.form.validate()) {
        // 校验通过则提交保存
        this.save()
      } else {
        this.loading = false
      }
    },
    save() {
      this.$axios
        .$request(saveConfig(this.config))
        .then((res) => {
          this.loading = false
          if (res.code === '200' && res.data) {
            this.$swal({
              text: '保存成功',
              type: 'success',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
          } else {
            this.$swal({
              text: res.message,
              type: 'error',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
          }
        })
        .catch((e) => {
          this.loading = false
          this.$swal({
            text: e.message,
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.avator {
  margin-top: 20px;
}

#editor {
  .v-show-content {
    background-color: #000;
  }
}
</style>
