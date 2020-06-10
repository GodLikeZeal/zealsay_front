<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!-- Make a div wrapped slider,set height and width -->
        <div style="width:100%;margin:20px auto;height:300px">
          <!-- Using the slider component -->
          <slider
            ref="slider"
            :options="options"
            @slide="slide"
            @tap="onTap"
            @init="onInit"
          >
            <!-- slideritem wrapped package with the components you need -->
            <template>
              <slider-item
                v-for="(item, index) in blogs"
                :key="index"
                :page-length="blogs.length"
                :index="index"
                :style="{
                  background: 'url(' + item.coverImage + ')',
                  backgroundSize: 'cover',
                  width: '75%'
                }"
              >
                <v-row class="d-flex text-center align-self-end">
                  <v-col cols="12">
                    <a
                      style="color: #d8dad0"
                      :to="'/blog/' + blog.id"
                      target="_Blank"
                    >
                      <h3>
                        {{ item.title }}
                      </h3>
                      <p class="Paragraph" style="margin-bottom: 2rem">
                        {{ item.subheading }}
                      </p>
                    </a>
                  </v-col>
                </v-row>
              </slider-item>
            </template>
            <!-- Customizable loading -->
            <div slot="loading">loading...</div>
          </slider>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Util from '@/util'

export default {
  name: 'MainCard',
  filters: {
    formatDate(time) {
      if (time != null && time !== '') {
        return Util.formateDate(time)
      } else {
        return ''
      }
    }
  },
  props: {
    hotArticles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
    // Image list
    blogs: [
      {
        id: '1268501327403552770',
        title: 'Family文档说明',
        subheading: 'Family开发文档描述',
        coverImage:
          'https://pan.zealsay.com/article/20200606102724933000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: 'docker,java,spring boot',
        readNum: 10,
        likeNum: 1,
        categoryId: '1149156444177149953',
        categoryName: '技术文档',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2020-06-04 19:14:18',
        updateDate: '2020-06-06 18:27:36'
      },
      {
        id: '1196311210614591489',
        title: '为什么成年人的气永远生的不彻底？',
        subheading: '为什么',
        coverImage:
          'https://pan.zealsay.com/article/2019121202145279000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: '情感',
        readNum: 79,
        likeNum: 0,
        categoryId: '1122417077350035458',
        categoryName: '杂谈游记',
        authorId: '1196277389672321025',
        authorName: '石三岁',
        authorAvatar: 'https://pan.zealsay.com/avatar/85.jpg',
        createDate: '2019-11-18 14:16:34',
        updateDate: '2019-12-12 10:14:58'
      },
      {
        id: '1186218213952720897',
        title: ' 我不怕死，我只是怕余生一个人',
        subheading: '一个人',
        coverImage:
          'https://pan.zealsay.com/article/20191102023336162000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: '情感',
        readNum: 115,
        likeNum: 1,
        categoryId: '1122417077350035458',
        categoryName: '杂谈游记',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2019-10-21 17:50:36',
        updateDate: '2019-11-02 10:33:42'
      },
      {
        id: '1173898394729451521',
        title: '美俄战忽局比局座更强吗？',
        subheading: '我们宣布不首先使用张局',
        coverImage: 'https://pan.zealsay.com/20190917095550815000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: '军事',
        readNum: 54,
        likeNum: 0,
        categoryId: '1122417077350035458',
        categoryName: '杂谈游记',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2019-09-17 17:56:02',
        updateDate: '2019-09-17 18:07:21'
      },
      {
        id: '1172068997831593986',
        title: '纯银产品复盘',
        subheading: '产品、创业',
        coverImage: 'https://pan.zealsay.com/20190915143009475000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: '津津原味',
        readNum: 51,
        likeNum: 0,
        categoryId: '1',
        categoryName: '奇淫技巧',
        authorId: '1172067255899394049',
        authorName: '吕世杰',
        authorAvatar: 'https://pan.zealsay.com/20190630225012780000000.jpg',
        createDate: '2019-09-12 16:46:40',
        updateDate: '2019-09-16 21:23:39'
      }
    ],
    // Sliding configuration [obj]
    options: {
      effect: 'coverflow',
      currentPage: 0,
      speed: 900,
      thresholdDistance: 100,
      thresholdTime: 300,
      deviation: 300,
      widthScalingRatio: 0.8,
      heightScalingRatio: 0.8,
      slidesToScroll: 1,
      loop: true,
      autoplay: '5000'
    }
  }),
  computed: {
    blog() {
      return this.item
    }
  },
  mounted() {
    const that = this
    setTimeout(function() {
      that.blogs = this.hotArticles
    }, 1)
  },
  methods: {
    // Listener event
    slide(data) {
      // console.log(data)
    },
    onTap(data) {
      console.log(data)
    },
    onInit(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
