<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card ref="row">
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                  v-model="form.name"
                  label="名称*"
                  :rules="nameRules"
                  hint="标识标签，如:docker"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.icon"
                  label="图标"
                  hint="图标，如:mdi-docker,如不选，则取名称的第一个字符！"
                  type="text"
                ></v-text-field>
                <v-select
                  v-model="form.outColor"
                  label="标签颜色"
                  :rules="colorRules"
                  :items="outColors"
                  item-avatar="icon"
                  item-text="text"
                  item-value="value"
                  required
                ></v-select>
                <v-select
                  v-model="form.avatarColor"
                  :rules="colorRules"
                  :items="outColors"
                  item-avatar="icon"
                  item-text="text"
                  item-value="value"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs6>
                <v-flex>
                  <h5 class=" font-weight-light">标签预览</h5>
                  <v-chip :color="form.outColor" text-color="white">
                    <v-avatar
                      v-if="form.icon.startsWith('http')"
                      :class="form.avatarColor"
                    >
                      <img :src="form.icon" alt="avatar" />
                    </v-avatar>
                    <v-avatar
                      v-else-if="form.icon === ''"
                      :class="form.avatarColor"
                    >
                      {{ form.name.charAt(0).toUpperCase() }}
                    </v-avatar>
                    <v-avatar v-else :class="form.avatarColor">
                      <v-icon>{{ form.icon }}</v-icon>
                    </v-avatar>
                    {{ form.name }}
                  </v-chip>
                </v-flex>
                <v-flex>
                  <p class="font-weight-light text--secondary">
                    图标支持material icons，可以参考<a
                      href="https://material.io/tools/icons"
                      >https://material.io/tools/icons</a
                    >
                    或者
                    <a href="https://materialdesignicons.com"
                      >https://materialdesignicons.com</a
                    >
                  </p>
                  <p class="text--secondary">
                    注意：您只有一次选择图标的机会哦，选错了，后期无法更改！
                  </p>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline color="darken-1" @click="handleCancel">取消</v-btn>
        <v-btn
          outline
          :loading="loading"
          color="primary darken-1"
          @click="handleSubmit"
          >提交</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { addArticleLabel } from '@/api/article'

export default {
  name: 'Add',
  props: {
    alert: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: () => ({
    name: 'add',
    loading: false,
    nameRules: [
      v => !!v || '名称不能为空',
      v => (v && v.length <= 20) || '名称不能超过20个字符'
    ],
    colorRules: [v => !!v || '名称不能为空'],
    form: {
      name: 'docker',
      icon: 'mdi-docker',
      outColor: 'teal',
      avatarColor: 'teal'
    },
    outColors: [
      { icon: 'mdi-circle', text: 'red', valueRules: 'red' },
      { icon: 'mdi-circle', text: 'pink', valueRules: 'pink' },
      { icon: 'mdi-circle', text: 'purple', valueRules: 'purple' },
      { icon: 'mdi-circle', text: 'deep-purple', valueRules: 'deep-purple' },
      { icon: 'mdi-circle', text: 'indigo', valueRules: 'indigo' },
      { icon: 'mdi-circle', text: 'blue', valueRules: 'blue' },
      { icon: 'mdi-circle', text: 'light-blue', valueRules: 'light-blue' },
      { icon: 'mdi-circle', text: 'cyan', valueRules: 'cyan' },
      { icon: 'mdi-circle', text: 'teal', valueRules: 'teal' },
      { icon: 'mdi-circle', text: 'green', valueRules: 'green' },
      { icon: 'mdi-circle', text: 'light-green', valueRules: 'light-green' },
      { icon: 'mdi-circle', text: 'lime', valueRules: 'lime' },
      { icon: 'mdi-circle', text: 'yellow', valueRules: 'yellow' },
      { icon: 'mdi-circle', text: 'amber', valueRules: 'amber' },
      { icon: 'mdi-circle', text: 'orange', valueRules: 'orange' },
      { icon: 'mdi-circle', text: 'deep-orange', valueRules: 'deep-orange' },
      { icon: 'mdi-circle', text: 'brown', valueRules: 'brown' },
      { icon: 'mdi-circle', text: 'blue-grey', valueRules: 'blue-grey' },
      { icon: 'mdi-circle', text: 'grey', valueRules: 'grey' },
      { icon: 'mdi-circle', text: 'purple', valueRules: 'purple' }
    ]
  }),
  computed: {
    dialog: {
      get: function() {
        return this.alert
      },
      set: function() {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit('handleCancelAdd')
    },
    handleSubmit() {
      this.loading = true
      // 开始提交
      if (this.$refs.form.validate()) {
        this.$axios
          .$request(addArticleLabel(this.form))
          .then(res => {
            this.loading = false
            if (res.code === '200' && res.data) {
              this.$swal({
                text: '添加成功',
                type: 'success',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000
              })
              this.$parent.search()
              this.$emit('handleCancelAdd')
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
          .catch(e => {
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
      this.loading = false
    }
  }
}
</script>
