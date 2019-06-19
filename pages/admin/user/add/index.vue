<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md10>
        <material-card class="v-card-profile">
          <v-card-text class="text-xs-center">
            <v-avatar-uploader
              :url="form.avatar"
              :request="request"
              :clickable="clickable"
              :avatar="avatar"
              max-size="5120"
              @success="success"
              @failed="failed"
            />
            <h6 class="category avator text-gray ffont-weight-light mb-3">
              点击上传用户头像
            </h6>
            <h5 class="card-title font-weight-light">
              Some of us get dipped in flat, some in satin, some in gloss....
              But every once in a while you find someone who's iridescent, and
              when you do, nothing will ever compare.
            </h5>
            <p class="card-description font-weight-light">
              有人住高楼，有人在深沟，有人光万丈，有人一身锈，世人万千种，浮云莫去求，斯人若彩虹，遇上方知有。
            </p>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12 md10>
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

export default {
  name: 'Add',
  layout: 'admin',
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
    valid: false,
    clickable: true,
    avatar: {
      size: 128
    },
    roles: [],
    province: [],
    city: [],
    area: [],
    provinceLoading: false,
    cityLoading: false,
    areaLoading: false,
    files: [],
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
  async asyncData({ app, query, error }) {
    const resProvince = await app.$axios.$request(getProvinceList())
    let provinces = []
    if (resProvince.code === '200') {
      provinces = resProvince.data.map(r => {
        return {
          value: r.code,
          text: r.name
        }
      })
    } else {
      return error({
        statusCode: resProvince.code,
        message: resProvince.message
      })
    }
    const resRole = await app.$axios.$request(getRoleList())
    let roles = []
    if (resRole.code === '200') {
      roles = resRole.data.map(r => {
        return {
          value: r.value,
          text: r.name
        }
      })
    } else {
      return error({ statusCode: resRole.code, message: resRole.message })
    }
    return {
      province: provinces,
      roles: roles
    }
  },
  methods: {
    changeProvince() {
      this.cityLoading = true
      const obj = {}
      obj.code = this.form.province
      this.$axios.$request(getCityList(obj)).then(res => {
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
      this.$axios.$request(getAreaList(obj)).then(res => {
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
        // 校验通过则提交保存
        this.save()
      } else {
        this.loading = false
      }
    },
    save() {
      // 开始提交
      this.$axios
        .$request(addUser(this.form))
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
    request(form, config) {
      return this.$axios.$request(uploadImage(form), config)
    },
    success(res) {
      // Update user avatar with the latest
      this.form.avatar = res.data
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
.avator {
  margin-top: 20px;
}
</style>
