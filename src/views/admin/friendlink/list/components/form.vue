<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card ref="row">
      <v-container fill-height fluid>
        <v-layout fill-height class="center">
          <v-flex xs12 align-center flexbox>
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
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="form.friendName"
                  hint="友链名不能包含空格和特殊字符"
                  label="友链名*"
                  validate-on-blur
                  :rules="usernameRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  v-model="form.color"
                  label="印象颜色*"
                  persistent-hint
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="form.link"
                  :rules="linkRules"
                  label="链接*"
                  hint="链接地址必须以http或者https开头，只能是合法的域名"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="form.friendInfo" label="简介"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="darken-1" @click="handleCancel()">取消</v-btn>
        <v-btn
          outlined
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
import { uploadImage } from "@/api/user";
import { validateUsername, validateUrl } from "@/util/validate";
import { updateFriendLinkById } from "@/api/friendlink";

export default {
  name: "Edit",
  props: {
    alert: {
      type: Boolean,
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
    showCropper: false,
    valid: false,
    clickable: true,
    avatar: {
      size: 128
    },
    roles: [],
    usernameRules: [
      v => !!v || "用户名不能为空!",
      v => validateUsername(v) || "必须是中文、英文、数字包括下划线"
    ],
    linkRules: [
      v => !!v || "链接不能为空!",
      v => validateUrl(v) || "必须是合法的链接"
    ]
  }),
  computed: {
    form: function() {
      return {
        id: this.row.id,
        avatar: this.row.avatar,
        friendName: this.row.friendName,
        friendInfo: this.row.friendInfo,
        link: this.row.link,
        color: this.row.color
      };
    },
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
    },
    dialog: function() {
      return this.alert;
    }
  },
  created() {},
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleSubmit() {
      this.loading = true;
      this.save();
    },
    save() {
      // 开始提交
      updateFriendLinkById(this.form)
        .then(res => {
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
          this.$swal.fire({
            text: e.message,
            type: "error",
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
          .$request(uploadImage(param))
          .then(res => {
            if (res.code === "200") {
              this.row.avatar = res.data;
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
.center {
  text-align: center;
}

.avator {
  border-radius: 50%;
}
</style>
