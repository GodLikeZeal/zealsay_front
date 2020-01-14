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
                  <v-btn color="darken-1" outlined @click="cropCancel"
                    >返回</v-btn
                  >
                  <v-btn color="primary" outlined @click="cropSubmit"
                    >裁剪</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <h6 class="category avator text-gray ffont-weight-light mb-3">
              点击上传友链头像
            </h6>
            <h5 class="card-title font-weight-light">
              Isn't it a pleasure that a friend comes from a faraway place?
            </h5>
            <p class="card-description font-weight-light">
              有朋自远方来,不亦说乎？
            </p>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12 md10>
        <material-card
          color="primary"
          title="友链详细信息"
          text="完善友链信息后，点击提交"
        >
          <v-form ref="form" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="form.friendName"
                    :rules="usernameRules"
                    hint="友链名不能包含空格和特殊字符"
                    class="purple-input"
                    label="友链名*"
                    required
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="form.link"
                    :rules="linkRules"
                    hint="链接地址必须以http或者https开头，只能是合法的域名"
                    class="purple-input"
                    label="链接*"
                    required
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="form.color"
                    label="印象颜色*"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="form.friendInfo"
                    class="purple-input"
                    label="简介"
                    value="一个喜欢安静的程序员."
                  />
                </v-flex>
                <v-flex xs12 text-center>
                  <v-btn
                    rounded
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
import { saveFriendLink } from "@/api/friendlink";
import { uploadImage } from "@/api/user";
import { validateUsername, validateUrl } from "@/util/validate";

export default {
  name: "Add",
  layout: "admin",
  data: () => ({
    form: {
      id: "",
      avatar: "https://pan.zealsay.com/20190630223915548000000.jpg",
      friendName: "",
      friendInfo: "",
      link: "",
      color: ""
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
    linkRules: [
      v => !!v || "链接不能为空!",
      v => validateUrl(v) || "必须是合法的链接"
    ]
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
  methods: {
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
      saveFriendLink(this.form)
        .then(res => {
          this.loading = false;
          if (res.code === "200" && res.data) {
            this.$swal({
              title: "添加成功!",
              text: "您已经成功添加了一名用户",
              type: "success"
            });
          } else {
            this.$swal({
              title: "添加失败!",
              text: res.message,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.loading = false;
          this.$swal({
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
        uploadImage(param)
          .then(res => {
            if (res.code === "200") {
              this.form.avatar = res.data;
            } else {
              this.$swal({
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
            this.$swal({
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
