<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card ref="row">
      <v-container fill-height fluid>
        <v-layout fill-height class="center">
          <v-flex xs12 align-center flexbox>
            <vue-initials-img
              class="avator"
              height="64"
              width="64"
              :lazy-src="form.avatar"
              :src="form.avatar"
            />
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
import { editUser, uploadImage } from "@/api/user";
import {
  validateUsername,
  validatePhone,
  validateEmail
} from "@/util/validate";
import { getRoleList } from "@/api/role";

export default {
  name: "Edit",
  props: {
    alert: {
      type: Object,
      default: function() {
        return {};
      }
    },
    row: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: () => ({
    name: "edit",
    loading: false,
    file: "",
    avatar: "",
    sexs: [
      {
        value: 1,
        text: "男",
        avatar: '<img width="15px" src="/static/image/sex/boy.png"/>'
      },
      {
        value: 0,
        text: "女",
        avatar: '<img width="15px" src="/static/image/sex/girl.png"/>'
      }
    ],
    roles: [],
    usernameRules: [
      v => !!v || "用户名不能为空!",
      v => validateUsername(v) || "必须是中文、英文、数字包括下划线"
    ],
    phoneRules: [
      v => !!v || "手机号不能为空!",
      v => validatePhone(v) || "不是合法的手机号"
    ],
    emailRules: [v => !v || validateEmail(v) || "不是合法的邮箱"]
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
      };
    },
    dialog: {
      get: function() {
        return this.alert;
      },
      set: function() {}
    }
  },
  created() {
    if (!this.roles.length) {
      getRoleList().then(res => {
        if (res.code === "200") {
          this.roles = res.data.map(r => {
            return {
              value: r.value,
              text: r.name
            };
          });
        } else {
          this.$swal.fire({
            text: "拉取角色信息失败",
            type: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
    }
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleSubmit(obj) {
      this.loading = true;
      if (this.$refs.form.validate()) {
        // 先上传头像
        if (!(this.file === "")) {
          const param = new FormData();
          param.append("file", this.file);
          uploadImage(param)
            .then(res => {
              if (res.code === "200") {
                this.form.avatar = res.data;
                // 开始提交
                editUser(this.form)
                  .then(res => {
                    this.loading = false;
                    if (res.code === "200" && res.data) {
                      this.$swal.fire({
                        text: "修改成功",
                        type: "success",
                        toast: true,
                        position: "top",
                        showConfirmButton: false,
                        timer: 3000
                      });
                      this.$parent.search("");
                      this.$emit("handleCancel");
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
                    this.loading = false;
                    this.$swal.fire({
                      text: e.message,
                      type: "error",
                      toast: true,
                      position: "top",
                      showConfirmButton: false,
                      timer: 3000
                    });
                  });
              } else {
                this.loading = false;
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
              this.loading = false;
              this.$swal.fire({
                text: e.message,
                type: "error",
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000
              });
            });
        }
        // 开始提交
        editUser(this.form)
          .then(res => {
            if (res.code === "200" && res.data) {
              this.loading = false;
              this.$swal.fire({
                text: "修改成功",
                type: "success",
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000
              });
              this.$parent.search("");
              this.$emit("handleCancel");
            } else {
              this.loading = false;
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
            this.loading = false;
            this.$swal.fire({
              text: e.message,
              type: "error",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          });
      }
      this.loading = false;
    },
    fileChanged(file) {
      // handle file here. File will be an object.
      // If multiple prop is true, it will return an object array of files.
      const self = this;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        self.file = file;
        // 创建一个reader
        const reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          self.row.avatar = this.result;
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.center {
  text-align: center;
}

.avator {
  border-radius: 50%;
}
</style>
