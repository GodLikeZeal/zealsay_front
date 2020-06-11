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
                  width: '65%'
                }"
              >
                <v-row class="d-flex text-center align-self-end">
                  <v-col cols="12">
                    <a
                      style="color: #d8dad0"
                      :href="'/blog/' + item.id"
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
    articles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
    // Image list
    // Sliding configuration [obj]
    blogs: [
      {
        id: '1214761089041395714',
        title: '解决Mac OS 升级后npm报错',
        subheading: 'gyp:No Xcode or CLT version',
        coverImage:
          'https://pic.zealsay.com/article/20200108120940611000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: 'ios,node',
        readNum: 37,
        likeNum: 0,
        categoryId: '1',
        categoryName: '奇淫技巧',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2020-01-08 12:09:47',
        updateDate: null
      },
      {
        id: '1145991328820584449',
        title: 'Debain 8环境安装git',
        subheading: '在linux系统Debain 8环境安装git',
        coverImage: 'https://pan.zealsay.com/20190702174254549000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: 'git',
        readNum: 99,
        likeNum: 0,
        categoryId: '1',
        categoryName: '奇淫技巧',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2019-07-02 17:43:09',
        updateDate: '2019-07-06 11:45:49'
      },
      {
        id: '1145957670474727426',
        title: '消息系统设计与实现「下篇」',
        subheading: 'web站内消息设计与实现',
        coverImage: 'https://pan.zealsay.com/20190702152918983000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: 'windows',
        readNum: 36,
        likeNum: 0,
        categoryId: '1',
        categoryName: '奇淫技巧',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2019-07-02 15:29:34',
        updateDate: '2019-07-06 16:40:24'
      },
      {
        id: '1145956986698317825',
        title: '消息系统设计与实现「上篇」',
        subheading: 'web网站的站内消息设计与实现',
        coverImage: 'https://pan.zealsay.com/20190702152640178000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: 'windows',
        readNum: 16,
        likeNum: 0,
        categoryId: '1',
        categoryName: '奇淫技巧',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2019-07-02 15:26:51',
        updateDate: '2019-07-06 11:45:20'
      },
      {
        id: '1145701104266985474',
        title: '浅谈自动化测试(二)',
        subheading: '使用nightwatch构建自动化脚本',
        coverImage: 'https://pan.zealsay.com/20190701223001148000000.jpg',
        status: 'FORMAL',
        openness: 'ALL',
        label: 'javascript,devops',
        readNum: 0,
        likeNum: 0,
        categoryId: '1',
        categoryName: '奇淫技巧',
        authorId: '1',
        authorName: 'zeal',
        authorAvatar: 'https://pan.zealsay.com/20190630224926258000000.jpg',
        createDate: '2019-07-01 22:30:04',
        updateDate: '2019-07-06 11:44:51'
      }
    ],
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
  // computed: {
  //   blogs() {
  //     return this.articles
  //   }
  // },
  mounted() {
    const that = this
    setTimeout(function() {
      console.log('看看')
      console.log(that)
      that.blogs = that.articles
    }, 20)
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
