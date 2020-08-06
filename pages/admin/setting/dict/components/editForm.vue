<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card ref="row">
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-container grid-list>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="form.code"
                  label="code*"
                  type="number"
                  :rules="codeRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.name"
                  label="名称*"
                  :rules="nameRules"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.enShort"
                  label="拼音简称"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.parentCode"
                  label="父层code"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.type"
                  label="类型*"
                  :rules="typeRules"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.description"
                  label="描述"
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.sort"
                  label="顺序"
                  type="number"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="darken-1" @click="handleCancel()">取消</v-btn>
        <v-btn
          outlined
          :loading="loading"
          color="primary darken-1"
          @click="handleSubmit()"
          >提交</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validateValue } from '@/util/validate'
import { updateDict } from '@/api/dict'

export default {
  name: 'Edit',
  props: {
    alert: {
      type: Boolean,
      default() {
        return {}
      }
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    name: 'edit',
    loading: false,
    nameRules: [(v) => !!v || '名称不能为空!'],
    typeRules: [
      (v) => !!v || 'code不能为空!',
      (v) => validateValue(v) || '必须是大写英文、下划线'
    ],
    codeRules: [(v) => !!v || 'code不能为空!']
  }),
  computed: {
    form() {
      return {
        id: this.row.id,
        code: this.row.code,
        name: this.row.name,
        enShort: this.row.enShort,
        parentCode: this.row.parentCode,
        type: this.row.type,
        description: this.row.description,
        sort: this.row.sort
      }
    },
    dialog: {
      get() {
        return this.alert
      },
      set() {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit('handleCancel')
    },
    handleSubmit() {
      this.loading = true
      // 开始提交
      if (this.$refs.form.validate()) {
        this.$axios
          .$request(updateDict(this.form))
          .then((res) => {
            this.loading = false
            if (res.code === '200' && res.data) {
              this.$swal({
                text: '修改成功',
                type: 'success',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000
              })
              this.$parent.refresh()
              this.$emit('handleCancel')
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
      this.loading = false
    }
  }
}
</script>
