<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md11>
        <material-card
          color="primary"
          title="文章基本信息"
          text="完善文章信息后，点击提交"
        >
          <v-form ref="form" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs6 md6>
                  <v-card-text class="text-xs-center">
                    <v-dialog v-model="showCropper" persistent width="800px">
                      <template v-slot:activator="{ on }">
                        <label for="uploads">
                          <a>
                            <v-img
                              class="elevation-3"
                              style="margin: auto"
                              :src="form.coverImage"
                              contain
                              height="200"
                              width="320"
                              alt="coverImage"
                            ></v-img>
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
                    <h6
                      class="category avator text-gray ffont-weight-light mb-3"
                    >
                      点击修改封面图片，支持JPG、PNG格式图片，不超过5M。
                    </h6>
                  </v-card-text>
                </v-flex>
                <v-flex xs6 md6>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-radio-group v-model="form.openness" row label="公开度">
                        <v-radio label="仅自己" value="SELFONLY"></v-radio>
                        <v-radio label="所有人" value="ALL"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-radio-group v-model="form.status" row label="状 态">
                        <v-radio label="草稿" value="DRAFT"></v-radio>
                        <v-radio label="发布" value="FORMAL"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-select
                        v-model="form.categoryId"
                        :items="category"
                        item-text="text"
                        item-value="value"
                        label="分类目录*"
                        required
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-select
                        v-model="form.label"
                        attach
                        chips
                        multiple
                        :items="labels"
                        label="标签"
                        class="purple-input"
                      >
                      </v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.title"
                    :rules="titleRules"
                    hint="标题不能包含空格和特殊字符,不超过20个字符"
                    class="purple-input"
                    label="标题*"
                    required
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.subheading"
                    :rules="subheadingRules"
                    hint="副标题不能超过30个字符"
                    class="purple-input"
                    label="副标题*"
                    required
                  />
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn
                    rounded
                    color="primary"
                    :loading="loading"
                    @click="submit()"
                  >
                    保存文章
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md11>
        <material-card
          color="primary"
          title="编辑文章详细内容"
          text="支持使用markdown语法"
        >
          <div id="editor" class="mavonEditor">
            <mavon-editor
              ref="md"
              v-model="form.contentMd"
              style="z-index:0;height: 800px"
              :ishljs="true"
              code-style="atelier-plateau-dark"
              @change="changeData"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
            />
          </div>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { uploadArticle, uploadImageMultiple } from "@/api/user";
import {
  getArticle,
  getCategoryList,
  updateArticle,
  getArticleLabelList
} from "@/api/article";

export default {
  name: "Edit",
  layout: "admin",
  data: () => ({
    showCropper: false,
    img_file: {},
    valid: false,
    clickable: true,
    avatar: {
      size: 192,
      tile: true
    },
    categorys: [],
    labels: [],
    form: {},
    categoryLoading: false,
    cityLoading: false,
    areaLoading: false,
    file: "",
    loading: false,
    titleRules: [
      v => !!v || "标题不能为空!",
      v => (v && v.length <= 20) || "标题不得超过20个字符"
    ],
    subheadingRules: [v => (v && v.length <= 30) || "副标题不得超过30个字符"]
  }),
  computed: {
    option: function() {
      return {
        img:
          this.form.coverImage ||
          "https://pan.zealsay.com/20190630225012780000000.jpg", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        canMoveBox: true, // 截图框能否拖动
        centerBox: true, // 截图框能否拖动
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [320, 200] // 截图框的宽高比例
      };
    }
  },
  created() {
    getCategoryList()
      .then(res => {
        if (res.code === "200") {
          let categorys = [];
          const de = {};
          de.text = "请选择分类目录";
          de.value = "";
          categorys.push(de);
          for (let i = 0; i < res.data.length; i++) {
            const re = {};
            re.text = res.data[i].name;
            re.value = res.data[i].id;
            categorys.push(re);
          }
          this.categorys = categorys;
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
          text: "拉取文章分类失败",
          icon: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
    getArticleLabelList()
      .then(res => {
        if (res.code === "200") {
          this.labels = res.data.map(r => r.name);
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
          text: "拉取标签失败",
          icon: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
    getArticle(this.$route.query.id)
      .then(res => {
        if (res.code === "200") {
          this.form = res.data;
          this.form.label = this.form.label ? this.form.label.split(",") : [];
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
          text: "拉取文章失败",
          icon: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
  },
  methods: {
    submit() {
      this.loading = true;
      this.save();
      this.loading = false;
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    changeData(value, render) {
      this.form.contentHtml = render;
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos[1]];
    },
    save() {
      if (JSON.stringify(this.img_file) !== "{}") {
        const formdata = new FormData();
        for (const _img in this.img_file) {
          formdata.append("files", this.img_file[_img], _img);
        }
        uploadImageMultiple(formdata)
          .then(res => {
            if (res.code === "200") {
              for (const img in res.data) {
                // $vm.$img2Url 详情见本页末尾
                this.$refs.md.$img2Url(res.data[img].pos, res.data[img].url);
              }
              // 开始提交文章信息
              updateArticle(this.form)
                .then(res => {
                  if (res.code === "200") {
                    this.loading = false;
                    this.$swal.fire({
                      title: "保存成功!",
                      text: "不错哟,您已经添加了一篇文章啦",
                      type: "success"
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
          .catch(() => {
            this.loading = false;
          });
      } else {
        // 开始提交文章信息
        updateArticle(this.form)
          .then(res => {
            if (res.code === "200") {
              this.loading = false;
              this.$swal.fire({
                title: "保存成功!",
                text: "太棒啦,文章已经更新了哦",
                type: "success"
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
        uploadArticle(param)
          .then(res => {
            if (res.code === "200") {
              this.form.coverImage = res.data;
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

#editor {
  .v-show-content {
    background-color: #000;
  }
}
</style>
