<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card ref="row">
      <v-container fill-height fluid>
        <v-layout fill-height class="center">
          <v-flex xs12 align-center flexbox>
            <div style="height: 100px;width: 100px;margin: 10px auto;">
              <vue-cropper
                ref="cropper"
                style="background-repeat:repeat"
                :img="form.avatar"
                :output-size="option.outputSize"
                :output-type="option.outputType"
                :info="option.info"
                :can-scale="option.canScale"
                :can-move-box="option.canMoveBox"
                :center-box="option.centerBox"
                :auto-crop="option.autoCrop"
                :auto-crop-width="option.autoCropWidth"
                :auto-crop-height="option.autoCropHeight"
                :fixed="option.fixed"
                :fixed-number="option.fixedNumber"
              ></vue-cropper>
            </div>
            <h6 class="category text-gray ffont-weight-light mb-3">头像预览</h6>
            <p class="card-description font-weight-light">
              支持JPG、PNG格式图片，不超过5M。拖拽或缩放图中的虚线方格可调整头像
            </p>
            <upload-btn
              outline
              color="indigo"
              title="点击修改头像"
              :file-changed-callback="fileChanged"
            >
            </upload-btn>
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
import UploadButton from 'vuetify-upload-button'
import VueCropper from 'vue-cropper'

export default {
  name: 'Edit',
  components: {
    'upload-btn': UploadButton,
    'vue-cropper': VueCropper
  },
  props: ['row', 'alert'],
  data: () => ({
    name: 'edit',
    loading: false,
    file: '',
    option: {
      img: 'https://pan.zealsay.com/20190317010254129000000.jpg', // 裁剪图片的地址
      info: true, // 裁剪框的大小信息
      outputSize: 1, // 裁剪生成图片的质量
      outputType: 'jpeg', // 裁剪生成图片的格式
      canScale: true, // 图片是否允许滚轮缩放
      autoCrop: true, // 是否默认生成截图框
      canMoveBox: true, // 截图框能否拖动
      centerBox: true, // 截图框能否拖动
      autoCropWidth: 150, // 默认生成截图框宽度
      autoCropHeight: 150, // 默认生成截图框高度
      fixed: true, // 是否开启截图框宽高固定比例
      fixedNumber: [4, 4] // 截图框的宽高比例
    },
    sexs: [
      {
        value: 1,
        text: '男',
        avatar: '<img width="15px" src="../../../../../assets/sex/boy.png"/>'
      },
      {
        value: 0,
        text: '女',
        avatar: '<img width="15px" src="../../../../../assets/sex/girl.png"/>'
      }
    ],
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
  created() {
    if (!this.roles.length) {
      getRoleList().then(res => {
        if (res.code === '200') {
          this.roles = res.data.map(r => {
            return {
              value: r.value,
              text: r.name
            }
          })
        } else {
          this.$swal({
            text: '拉取角色信息失败',
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        }
      })
    }
  },
  methods: {
    handleCancel() {
      this.$emit('handleCancel')
    },
    handleSubmit(obj) {
      this.loading = true
      if (this.$refs.form.validate()) {
        // 先上传头像
        if (!(this.file === '')) {
          const param = new FormData()
          // 获取截图的base64 数据
          // this.$refs.cropper.getCropData((data) => {
          //     // do something
          //     console.log(data)
          // });
          // 获取截图的blob数据
          this.$refs.cropper
            .getCropBlob(data => {
              // do something
              const file = data
              param.append('file', file, this.file.name)
              uploadImage(param)
                .then(res => {
                  if (res.code === '200') {
                    this.form.avatar = res.data
                    this.save()
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
                  this.$swal({
                    text: e.message,
                    type: 'error',
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000
                  })
                })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.save()
        }
      }
    },
    save() {
      // 开始提交
      editUser(this.form)
        .then(res => {
          if (res.code === '200' && res.data) {
            this.loading = false
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
        .finally(() => {
          this.loading = false
        })
    },
    fileChanged(file) {
      if (!file.type.includes('image/')) {
        this.$swal({
          text: '请选择一张图片文件',
          type: 'error',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        return
      }
      // handle file here. File will be an object.
      // If multiple prop is true, it will return an object array of files.
      const self = this
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        self.file = file
        // 创建一个reader
        const reader = new FileReader()
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function() {
          self.row.avatar = this.result
          self.form.avatar = this.result
        }
      } else {
        this.$swal({
          text: '要选择一张图片文件才行呢！',
          type: 'error',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
      }
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
