<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card ref="row">
      <v-container fill-height fluid>
        <v-layout fill-height class="center">
          <v-flex xs12 align-center flexbox>
            <v-avatar-uploader
              :url="
                form.avatar
                  ? form.avatar
                  : 'https://pan.zealsay.com/20190317010254129000000.jpg'
              "
              :request="request"
              :clickable="clickable"
              :avatar="avatar"
              :max-size="5120"
              @success="success"
              @failed="failed"
            />
            <h6 class="category text-gray ffont-weight-light mb-3">头像预览</h6>
            <p class="card-description font-weight-light">
              支持JPG、PNG格式图片，不超过5M。拖拽或缩放图中的虚线方格可调整头像
            </p>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-title>
        <v-form ref="form" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="form.username"
                  hint="用户名不能包含空格和特殊字符"
                  label="用户名*"
                  validate-on-blur
                  :rules="usernameRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="form.name"
                  label="姓名"
                  hint="输入真实姓名"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="form.age"
                  label="年龄"
                  persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.email"
                  label="Email*"
                  :rules="emailRules"
                  type="email"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.phoneNumber"
                  label="手机号*"
                  :rules="phoneRules"
                  type="phone"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="form.sex"
                  :items="sexs"
                  item-text="text"
                  item-value="value"
                  item-avatar="avatar"
                  label="性别"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="form.role"
                  :items="roles"
                  item-text="text"
                  item-value="value"
                  label="角色"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline color="darken-1" @click="handleCancel()">取消</v-btn>
        <v-btn
          outline
          :loading="loading"
          color="primary darken-1"
          @click="handleSubmit(form)"
          >提交</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { editUser, uploadImage } from '@/api/user'
import { validateUsername, validatePhone, validateEmail } from '@/util/validate'
import { getRoleList } from '@/api/role'

export default {
  name: 'Edit',
  props: ['row', 'alert'],
  data: () => ({
    name: 'edit',
    loading: false,
    file: '',
    sexs: [
      {
        value: 1,
        text: '男',
        avatar: '<img width="15px" src="@/static/image/sex/boy.png"/>'
      },
      {
        value: 0,
        text: '女',
        avatar: '<img width="15px" src="@/static/image/sex/girl.png"/>'
      }
    ],
    valid: false,
    clickable: true,
    avatar: {
      size: 128
    },
    roles: [],
    usernameRules: [
      v => !!v || '用户名不能为空!',
      v => validateUsername(v) || '必须是中文、英文、数字包括下划线'
    ],
    phoneRules: [
      v => !!v || '手机号不能为空!',
      v => validatePhone(v) || '不是合法的手机号'
    ],
    emailRules: [v => !v || validateEmail(v) || '不是合法的邮箱']
  }),
  computed: {
    form: function() {
      return {
        id: this.row.id,
        age: this.row.age,
        avatar: this.row.avatar,
        email: this.row.email,
        name: this.row.name,
        phoneNumber: this.row.phoneNumber,
        role: this.row.role,
        sex: this.row.sex,
        username: this.row.username
      }
    },
    dialog: {
      get: function() {
        return this.alert
      },
      set: function() {}
    }
  },
  async asyncData({ app, query, error }) {
    const { code, message, data } = await app.$axios.$request(getRoleList())
    if (code === '200') {
      const roles = data.map(r => {
        return {
          value: r.value,
          text: r.name
        }
      })
      return { roles: roles }
    } else {
      return error({ statusCode: code, message: message })
    }
  },
  methods: {
    handleCancel() {
      this.$emit('handleCancel')
    },
    handleSubmit(obj) {
      this.loading = true
      this.save()
    },
    save() {
      // 开始提交
      this.$axios
        .$request(editUser(this.form))
        .then(res => {
          if (res.code === '200' && res.data) {
            this.$swal({
              text: '修改成功',
              type: 'success',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            })
            this.$parent.search('')
            this.$emit('handleCancel')
          } else {
            this.loading = false
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
          this.$swal({
            text: e.message,
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    request(form, config) {
      return this.$axios.$request(uploadImage(form), config)
    },
    success(res) {
      // Update user avatar with the latest
      this.row.avatar = res.data
    },
    failed(error) {
      this.$swal({
        text: error.message,
        type: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}
</script>

<style lang="less" scoped>
.center {
  text-align: center;
}

.avator {
  border-radius: 50%;
}
</style>
