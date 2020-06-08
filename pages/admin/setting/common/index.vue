<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md11>
        <material-card
          color="primary"
          title="配置网站基本信息"
          text="完善网站基本信息后，点击提交"
        >
          <v-form ref="form" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.title"
                    :rules="titleRules"
                    hint="网站标题不能包含空格和特殊字符,不超过20个字符"
                    class="purple-input"
                    label="网站标题*"
                    required
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.subheading"
                    :rules="subheadingRules"
                    hint="LOGO图片url地址"
                    class="purple-input"
                    label="LOGO图片*"
                    required
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.subheading"
                    :rules="subheadingRules"
                    class="purple-input"
                    label="版权信息"
                    required
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.subheading"
                    :rules="subheadingRules"
                    class="purple-input"
                    label="备案信息"
                    required
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="form.subheading"
                    :rules="subheadingRules"
                    hint="网站搜索引擎关键词，可提升seo优化"
                    class="purple-input"
                    label="站点关键词"
                    required
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea
                    v-model="form.subheading"
                    :rules="subheadingRules"
                    hint="网站描述，有利于搜索引擎抓取相关信息"
                    class="purple-input"
                    label="站点描述"
                    required
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <h5>站点开关</h5>
                  <v-switch></v-switch>
                  <p>站点关闭后将不能访问，后台可正常登录</p>
                </v-flex>
                <v-flex xs12 text-center>
                  <v-btn
                    :loading="loading"
                    rounded
                    color="primary"
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
    </v-layout>
  </v-container>
</template>

<script>
import { uploadArticle, uploadImageMultiple } from '@/api/user'
import {
  getCategoryList,
  saveArticle,
  getArticleLabelList
} from '@/api/article'

export default {
  name: 'Add',
  layout: 'admin',
  data: () => ({
    form: {
      title: '',
      subheading: '',
      status: 'DRAFT',
      coverImage: 'https://pan.zealsay.com/20190701222747340000000.jpg',
      label: [],
      openness: 'ALL',
      contentMd: '',
      contentHtml: ''
    },
    showCropper: false,
    img_file: {},
    category: [],
    labels: [],
    categoryLoading: false,
    cityLoading: false,
    areaLoading: false,
    file: '',
    loading: false,
    titleRules: [
      (v) => !!v || '标题不能为空!',
      (v) => (v && v.length <= 20) || '标题不得超过20个字符'
    ],
    subheadingRules: [(v) => (v && v.length <= 30) || '副标题不得超过30个字符']
  }),
  computed: {
    option() {
      return {
        img:
          this.form.coverImage ||
          'https://pan.zealsay.com/20190701222747340000000.jpg', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        canMoveBox: true, // 截图框能否拖动
        centerBox: true, // 截图框能否拖动
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [320, 200] // 截图框的宽高比例
      }
    }
  },
  async asyncData({ app, query, error }) {
    const resCategory = await app.$axios.$request(getCategoryList())
    const category = []
    if (resCategory.code === '200') {
      const de = {}
      de.text = '请选择分类目录'
      de.value = ''
      category.push(de)
      for (let i = 0; i < resCategory.data.length; i++) {
        const re = {}
        re.text = resCategory.data[i].name
        re.value = resCategory.data[i].id
        category.push(re)
      }
    } else {
      return error({
        statusCode: resCategory.code,
        message: resCategory.message
      })
    }
    const resArticleLabel = await app.$axios.$request(getArticleLabelList())
    let labels = []
    if (resArticleLabel.code === '200') {
      labels = resArticleLabel.data.map((r) => r.name)
    } else {
      return error({
        statusCode: resArticleLabel.code,
        message: resArticleLabel.message
      })
    }
    return {
      category,
      labels
    }
  },
  methods: {
    submit() {
      this.loading = true
      if (this.$refs.form.validate()) {
        // 校验通过则提交保存
        this.save()
      } else {
        this.loading = false
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
    save() {
      if (JSON.stringify(this.img_file) !== '{}') {
        const formdata = new FormData()
        for (const _img in this.img_file) {
          formdata.append('files', this.img_file[_img], _img)
        }
        this.$axios
          .$request(uploadImageMultiple(formdata))
          .then((res) => {
            if (res.code === '200') {
              for (const img in res.data) {
                // $vm.$img2Url 详情见本页末尾
                this.$refs.md.$img2Url(res.data[img].pos, res.data[img].url)
              }
              // 开始提交文章信息
              this.$axios
                .$request(saveArticle(this.form))
                .then((res) => {
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
                .catch((e) => {
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
          .catch((e) => {
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
        this.$axios
          .$request(saveArticle(this.form))
          .then((res) => {
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
          .catch((e) => {
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
    },
    fileChange(e) {
      // 上传图片
      // this.option.img
      const file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
        this.showCropper = true
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    cropCancel() {
      this.showCropper = false
      this.$refs.avator.value = ''
    },
    cropSubmit() {
      this.showCropper = false
      this.request()
    },
    request() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob((data) => {
        // do something
        const file = data
        const param = new FormData()
        param.append('file', file)
        this.$axios
          .$request(uploadArticle(param))
          .then((res) => {
            if (res.code === '200') {
              this.form.coverImage = res.data
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
          .catch((e) => {
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
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avator {
  margin-top: 20px;
}

#editor {
  .v-show-content {
    background-color: #000;
  }
}
</style>
