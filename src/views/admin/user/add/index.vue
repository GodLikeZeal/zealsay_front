<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md10>
        <material-card class="v-card-profile">
          <v-card-text class="text-center">
            <v-dialog v-model="showCropper" persistent width="800px">
              <template v-slot:activator="{ on }">
                <label for="uploads">
                  <a>
                    <v-avatar size="96">
                      <img :src="form.avatar" alt="avatar" />
                    </v-avatar>
                  </a>
                </label>
                <input
                  id="uploads"
                  ref="avator"
                  type="file"
                  style="display: none;"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                  @change="fileChange($event)"
                />
              </template>
              <v-card>
                <v-card-title>
                  <div style="width: 800px;height: 400px;">
                    <vueCropper
                      ref="cropper"
                      style="background-repeat:repeat"
                      :output-size="option.outputSize"
                      :output-type="option.outputType"
                      :info="option.info"
                      :can-scale="option.canScale"
                      :can-move-box="option.canMoveBox"
                      :center-box="option.centerBox"
                      :auto-crop="option.autoCrop"
                      :fixed="option.fixed"
                      :fixed-number="option.fixedNumber"
                      :img="option.img"
                    ></vueCropper>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="darken-1" outline @click="cropCancel"
                    >返回</v-btn
                  >
                  <v-btn color="primary" outline @click="cropSubmit"
                    >裁剪</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
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
                    v-model="form.email"
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
                <v-flex xs12 text-center>
                  <v-btn
                    rounded
                    class="mx-0"
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
import { addUser, uploadAvatar } from "@/api/user";
import { getProvinceList, getCityList, getAreaList } from "@/api/dict";
import { getRoleList } from "@/api/role";
import {
  validateUsername,
  validatePassword,
  validatePhone,
  validateEmail
} from "@/util/validate";

export default {
  name: "Add",
  layout: "admin",
  data: () => ({
    form: {
      username: "",
      password: "",
      name: "",
      avatar: "https://pan.zealsay.com/20190630225012780000000.jpg",
      phoneNumber: "",
      email: "",
      province: "",
      city: "",
      area: "",
      adrress: "",
      introduction: "",
      role: ""
    },
    showCropper: false,
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
      v => !!v || "用户名不能为空!",
      v => validateUsername(v) || "必须是中文、英文、数字包括下划线"
    ],
    passwordRules: [
      v => !!v || "密码不能为空!",
      v =>
        validatePassword(v) ||
        "必须以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
    ],
    phoneRules: [
      v => !!v || "手机号不能为空!",
      v => validatePhone(v) || "不是合法的手机号"
    ],
    emailRules: [v => !v || validateEmail(v) || "不是合法的邮箱"]
  }),
  computed: {
    option: function() {
      return {
        img:
          this.form.avatar ||
          "https://pan.zealsay.com/20190630225012780000000.jpg", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        canMoveBox: true, // 截图框能否拖动
        centerBox: true, // 截图框能否拖动
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      };
    }
  },
  created() {
    getProvinceList()
      .then(res => {
        if (res.code === "200") {
          this.province = res.data.map(r => {
            return {
              value: r.code,
              text: r.name
            };
          });
        } else {
          this.$swal.fire({
            text: res.message,
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
      .catch(() => {
        this.$swal.fire({
          text: "拉取省份信息失败!",
          icon: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
    getRoleList()
      .then(res => {
        if (res.code === "200") {
          this.roles = res.data.map(r => {
            return {
              value: r.value,
              text: r.name
            };
          });
        } else {
          this.$swal.fire({
            text: res.message,
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
      .catch(() => {
        this.$swal.fire({
          text: "拉取角色信息失败!",
          icon: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
  },
  methods: {
    changeProvince() {
      this.cityLoading = true;
      const obj = {};
      obj.code = this.form.province;
      this.$axios.$request(getCityList(obj)).then(res => {
        if (res.code === "200") {
          this.city = res.data.map(r => {
            return {
              value: r.code,
              text: r.name
            };
          });
        } else {
          this.$swal.fire({
            text: "拉取省市区信息失败!",
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
        this.cityLoading = false;
      });
    },
    changeCity() {
      this.areaLoading = true;
      const obj = {};
      obj.code = this.form.city;
      this.$axios.$request(getAreaList(obj)).then(res => {
        if (res.code === "200") {
          this.area = res.data.map(r => {
            return {
              value: r.code,
              text: r.name
            };
          });
        } else {
          this.$swal.fire({
            text: "拉取省市区信息失败!",
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
        this.areaLoading = false;
      });
    },
    submit() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        // 校验通过则提交保存
        this.save();
      } else {
        this.loading = false;
      }
    },
    save() {
      // 开始提交
      this.$axios
        .$request(addUser(this.form))
        .then(res => {
          this.loading = false;
          if (res.code === "200" && res.data) {
            this.$swal.fire({
              title: "添加成功!",
              text: "您已经成功添加了一名用户",
              icon: "success"
            });
          } else {
            this.$swal.fire({
              title: "添加失败!",
              text: res.message,
              icon: "error"
            });
          }
        })
        .catch(e => {
          this.loading = false;
          this.$swal.fire({
            text: e.message,
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fileChange(e) {
      // 上传图片
      // this.option.img
      const file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      const reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data;
        this.showCropper = true;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    cropCancel() {
      this.showCropper = false;
      this.$refs.avator.value = "";
    },
    cropSubmit() {
      this.showCropper = false;
      this.request();
    },
    request() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(data => {
        // do something
        const file = data;
        const param = new FormData();
        param.append("file", file);
        this.$axios
          .$request(uploadAvatar(param))
          .then(res => {
            if (res.code === "200") {
              this.form.avatar = res.data;
            } else {
              this.$swal.fire({
                text: res.message,
                type: "error",
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000
              });
            }
          })
          .catch(e => {
            this.$swal.fire({
              text: e.message,
              type: "error",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          })
          .finally(() => {});
      });
    }
  }
};
</script>
<style lang="less" scoped>
.avator {
  margin-top: 20px;
}
</style>
