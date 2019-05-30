<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card class="v-card-profile">
          <div style="height: 100px;width: 100px;margin: 10px auto;">
            <vueCropper
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
            ></vueCropper>
          </div>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray ffont-weight-light mb-3">用户头像</h6>
            <h5 class="card-title font-weight-light">
              Some of us get dipped in flat, some in satin, some in gloss....
              But every once in a while you find someone who's iridescent, and
              when you do, nothing will ever compare.
            </h5>
            <p class="card-description font-weight-light">
              有人住高楼，有人在深沟，有人光万丈，有人一身锈，世人万千种，浮云莫去求，斯人若彩虹，遇上方知有。
            </p>
            <upload-btn
              class="font-weight-light"
              color="primary"
              title="上传头像"
              round
              :file-changed-callback="fileChanged"
            >
            </upload-btn>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12 md8>
        <material-card
          color="primary"
          title="用户详细信息"
          text="完善用户信息后，点击提交"
        >
          <v-form ref="form" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="form.username"
                    :rules="usernameRules"
                    hint="用户名不能包含空格和特殊字符"
                    class="purple-input"
                    label="用户名*"
                    required
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="form.password"
                    :rules="passwordRules"
                    hint="密码必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                    class="purple-input"
                    label="初始密码*"
                    required
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="form.name"
                    label="真实姓名"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    v-model="form.role"
                    :items="roles"
                    item-text="text"
                    item-value="value"
                    label="角色*"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="form.phoneNumber"
                    :rules="phoneRules"
                    label="手机号*"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    :rules="emailRules"
                    label="Email"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    v-model="form.province"
                    :items="province"
                    item-text="text"
                    item-value="value"
                    item-avatar="avatar"
                    label="省"
                    :loading="provinceLoading"
                    @change="changeProvince"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    v-model="form.city"
                    :items="city"
                    item-text="text"
                    item-value="value"
                    item-avatar="avatar"
                    label="市"
                    :loading="cityLoading"
                    @change="changeCity"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    v-model="form.area"
                    :items="area"
                    item-text="text"
                    item-value="value"
                    item-avatar="avatar"
                    label="区"
                    :loading="areaLoading"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.adrress"
                    label="详细住址"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    class="purple-input"
                    label="简介"
                    value="一个喜欢安静的程序员."
                  />
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn
                    round
                    class="mx-0 font-weight-light"
                    color="primary"
                    :loading="loading"
                    @click="submit()"
                  >
                    添加保存
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { addUser, uploadImage } from '@/api/user'
import { getProvinceList, getCityList, getAreaList } from '@/api/dict'
import { getRoleList } from '@/api/role'
import {
  validateUsername,
  validatePassword,
  validatePhone,
  validateEmail
} from '@/util/validate'
import UploadButton from 'vuetify-upload-button'

export default {
  name: 'Add',
  components: {
    'upload-btn': UploadButton
  },
  data: () => ({
    form: {
      username: '',
      password: '',
      name: '',
      avatar: 'https://pan.zealsay.com/20190317010254129000000.jpg',
      phoneNumber: '',
      email: '',
      province: '',
      city: '',
      area: '',
      adrress: '',
      introduction: '',
      role: ''
    },
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
    valid: false,
    image: 'https://pan.zealsay.com/20190317010254129000000.jpg',
    roles: [],
    province: [],
    city: [],
    area: [],
    provinceLoading: false,
    cityLoading: false,
    areaLoading: false,
    file: '',
    loading: false,
    usernameRules: [
      v => !!v || '用户名不能为空!',
      v => validateUsername(v) || '必须是中文、英文、数字包括下划线'
    ],
    passwordRules: [
      v => !!v || '密码不能为空!',
      v =>
        validatePassword(v) ||
        '必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
    ],
    phoneRules: [
      v => !!v || '手机号不能为空!',
      v => validatePhone(v) || '不是合法的手机号'
    ],
    emailRules: [v => !v || validateEmail(v) || '不是合法的邮箱']
  }),
  created() {
    this.provinceLoading = true
    getProvinceList().then(res => {
      if (res.code === '200') {
        this.province = res.data.map(r => {
          return {
            value: r.code,
            text: r.name
          }
        })
      } else {
        this.$swal({
          text: '拉取省市区信息失败',
          type: 'error',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
      }
      this.provinceLoading = false
    })
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
    changeProvince() {
      this.cityLoading = true
      const obj = {}
      obj.code = this.form.province
      getCityList(obj).then(res => {
        if (res.code === '200') {
          this.city = res.data.map(r => {
            return {
              value: r.code,
              text: r.name
            }
          })
        } else {
          this.$swal({
            text: '拉取省市区信息失败!',
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        }
        this.cityLoading = false
      })
    },
    changeCity() {
      this.areaLoading = true
      const obj = {}
      obj.code = this.form.city
      getAreaList(obj).then(res => {
        if (res.code === '200') {
          this.area = res.data.map(r => {
            return {
              value: r.code,
              text: r.name
            }
          })
        } else {
          this.$swal({
            text: '拉取省市区信息失败!',
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
        }
        this.areaLoading = false
      })
    },
    submit() {
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
          this.$refs.cropper.getCropBlob(data => {
            // do something
            const file = data
            param.append('file', file, this.file.name)
            uploadImage(param)
              .then(res => {
                if (res.code === '200') {
                  this.form.avatar = res.data
                  this.save()
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
          })
        } else {
          this.save()
        }
      }
    },
    save() {
      // 开始提交
      addUser(this.form)
        .then(res => {
          this.loading = false
          if (res.code === '200' && res.data) {
            this.$swal({
              title: '添加成功!',
              text: '您已经成功添加了一名用户',
              type: 'success'
            })
          } else {
            this.$swal({
              title: '添加失败!',
              text: res.message,
              type: 'error'
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
          self.form.avatar = this.result
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avator {
  margin-top: 20px;
  border-radius: 50%;
}
</style>
