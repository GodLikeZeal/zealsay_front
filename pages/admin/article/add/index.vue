<template>
  <v-container fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md3>
        <material-card class="v-card-profile">
          <v-flex xs12 md12>
            <div
              class="show-preview"
              :style="{
                width: preview_img.w + 'px',
                height: preview_img.h + 'px',
                overflow: 'hidden',
                margin: '5px auto'
              }"
            >
              <div :style="preview_img.div">
                <v-img
                  ref="img"
                  class="avator"
                  :src="preview_img.url"
                  :style="preview_img.img"
                />
              </div>
            </div>
          </v-flex>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray ffont-weight-light mb-3">
              封面图片预览
            </h6>
            <p class="card-description font-weight-light">
              支持JPG、PNG格式图片，不超过5M。拖拽或缩放图中的虚线方格可调整头像，注意上方小头像预览效果
            </p>
            <div style="height: 200px;">
              <vue-cropper
                ref="cropper"
                style="background-repeat:repeat"
                :img="option.img"
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
                @realTime="realTime"
              ></vue-cropper>
            </div>
            <upload-btn
              class="font-weight-light"
              color="primary"
              title="更换封面"
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
          title="文章基本信息"
          text="完善文章信息后，点击提交"
        >
          <v-form ref="form" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
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
                <v-flex xs12 md6>
                  <v-select
                    v-model="form.categoryId"
                    :items="category"
                    item-text="text"
                    item-value="value"
                    label="分类目录*"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 md6>
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

                <v-flex xs12 text-xs-center>
                  <v-btn
                    round
                    class="font-weight-light"
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
      <v-flex xs12 md11>
        <material-card
          color="primary"
          title="编辑文章详细内容"
          text="支持使用markdown语法"
        >
          <div id="editor">
            <mavon-editor
              ref="md"
              v-model="form.contentMd"
              style="z-index:0;height: 800px"
              :ishljs="true"
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
import { uploadImage, uploadImageMultiple } from '@/api/user'
import {
  getCategoryList,
  saveArticle,
  getArticleLabelList
} from '@/api/article'
import UploadButton from 'vuetify-upload-button'
import VueCropper from 'vue-cropper'

export default {
  name: 'Add',
  layout: 'admin',
  components: {
    'upload-btn': UploadButton,
    'vue-cropper': VueCropper
  },
  data: () => ({
    form: {
      title: '',
      subheading: '',
      status: 'DRAFT',
      coverImage: 'https://pan.zealsay.com/20190317010254129000000.jpg',
      label: '',
      openness: 'ALL',
      contentMd: '',
      contentHtml: ''
    },
    img_file: {},
    valid: false,
    previews: {},
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
    image: 'https://pan.zealsay.com/20190317010254129000000.jpg',
    category: [],
    labels: [],
    categoryLoading: false,
    cityLoading: false,
    areaLoading: false,
    file: '',
    loading: false,
    titleRules: [
      v => !!v || '标题不能为空!',
      v => (v && v.length <= 20) || '标题不得超过20个字符'
    ],
    subheadingRules: [v => (v && v.length <= 30) || '副标题不得超过30个字符']
  }),
  computed: {
    preview_img: function() {
      return this.previews
    }
  },
  created() {
    this.categoryLoading = true
    getCategoryList()
      .then(res => {
        if (res.code === '200') {
          this.category = res.data.map(r => {
            return {
              value: r.id,
              text: r.name
            }
          })
        } else {
          this.$swal({
            text: '拉取分类目录信息失败',
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
        this.categoryLoading = false
      })
    getArticleLabelList()
      .then(res => {
        if (res.code === '200') {
          this.labels = res.data.map(r => r.name)
        } else {
          this.$swal({
            text: '拉取分类目录信息失败',
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
      .finally(() => {})
  },
  methods: {
    submit() {
      this.loading = true
      this.uploadimg()
      this.loading = false
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
          self.$refs.img.src = this.result
          self.image = this.result
          self.option.img = this.result
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
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data
    },
    changeData(value, render) {
      this.form.contentHtml = render
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file
    },
    $imgDel(pos) {
      delete this.img_file[pos[1]]
    },
    uploadimg($e) {
      // 第一步.将图片上传到服务器.
      this.loading = true
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
                this.form.coverImage = res.data
                this.image = res.data
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
        })
      } else {
        this.save()
      }
    },
    save() {
      if (JSON.stringify(this.img_file) !== '{}') {
        const formdata = new FormData()
        for (const _img in this.img_file) {
          formdata.append('files', this.img_file[_img], _img)
        }
        uploadImageMultiple(formdata)
          .then(res => {
            if (res.code === '200') {
              for (const img in res.data) {
                // $vm.$img2Url 详情见本页末尾
                this.$refs.md.$img2Url(res.data[img].pos, res.data[img].url)
              }
              // 开始提交文章信息
              saveArticle(this.form)
                .then(res => {
                  if (res.code === '200') {
                    this.loading = true
                    this.$swal({
                      title: '保存成功!',
                      text: '不错哟,您已经添加了一篇文章啦',
                      type: 'success'
                    })
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
            // this.$swal({
            //     text: e.message,
            //     type: 'error',
            //     toast: true,
            //     position: 'top',
            //     showConfirmButton: false,
            //     timer: 3000
            // });
          })
      } else {
        // 开始提交文章信息
        saveArticle(this.form)
          .then(res => {
            if (res.code === '200') {
              this.loading = false
              this.$swal({
                title: '保存成功!',
                text: '不错哟,您已经添加了一篇文章啦',
                type: 'success'
              })
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
      }
    }
  }
}
</script>
<style lang="less" scoped>
.avator {
  margin: 0px auto;
}

#editor {
  .v-show-content {
    background-color: #000;
  }
}
</style>
