<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-center word">
              <h1 class="hitokoto-title">
                <v-avatar size="120">
                  <img
                    src="https://pan.zealsay.com/avatar/20200606105310570000000.jpg"
                    alt="avatar"
                  />
                </v-avatar>
              </h1>
              <div class="justify-center center">
                <span class="white--text font-weight-bold text-detail"
                  >zeal</span
                >
                <span class="white--text font-weight-thin ">|</span>
                <span
                  class="text-detail white--text font-weight-bold"
                  title="男"
                  ><img width="15px" src="@/static/image/sex/boy.png"
                /></span>
                <span class="white--text font-weight-thin ">|</span>
                <span class="white--text font-weight-bold text-detail"
                  >天蝎座</span
                >
              </div>
              <h5 class="white--text font-weight-medium">
                一个喜欢安静，追求技术的全栈程序猿。
              </h5>
              <!--              <div>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-qqchat</v-icon>-->
              <!--                </v-btn>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-wechat</v-icon>-->
              <!--                </v-btn>-->
              <!--                <v-btn class="mx-3 white&#45;&#45;text" icon target="_Blank">-->
              <!--                  <v-icon size="24px">mdi-sina-weibo</v-icon>-->
              <!--                </v-btn>-->
              <!--              </div>-->
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-container>
      <v-layout fill-height justify-center>
        <v-flex xs12 md12 lg10>
          <v-breadcrumbs :items="breadcrumbs" class="title">
            <template v-slot:divider>
              <v-icon>chevron_right</v-icon>
            </template>
          </v-breadcrumbs>
          <v-container>
            <v-layout>
              <v-flex>
                <h2 class="font-weight-regular text-gray">个人简介</h2>
                <div class="text-center">
                  <vue-typed-js
                    class="typed"
                    :loop="true"
                    :show-cursor="false"
                    :type-speed="100"
                    :start-delay="1000"
                    :back-speed="10"
                    :back-delay="1000"
                    :strings="strings"
                  >
                    <h3 id="luke" class="typing"></h3>
                  </vue-typed-js>
                </div>

                <v-divider></v-divider>
                <h2 class="font-weight-regular text-gray">资料卡片</h2>
                <v-card v-scroll-reveal.reset flat class="card">
                  <v-row class="hidden-xs-only">
                    <v-col cols="4" class="align-self-center">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909104236848000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                    <v-col cols="8">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            毕业于
                            <a class="font-weight-medium"> 武汉科技大学 </a>
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              不知不觉的已经毕业三年了。
                            </p>
                            <p>
                              怀念食堂早上的面窝和豆浆，怀念教三楼的教室。
                            </p>
                            <p>
                              依稀记得离开的时候，夕阳印在黄家湖畔上面，没想到一别竟三年已久了，仿佛就在昨日啊。
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex d-sm-none">
                    <v-col cols="12">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909104236848000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                    <v-col cols="12">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            毕业于
                            <a class="font-weight-medium"> 武汉科技大学 </a>
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              不知不觉的已经毕业三年了。
                            </p>
                            <p>
                              怀念食堂早上的面窝和豆浆，怀念教三楼的教室。
                            </p>
                            <p>
                              依稀记得离开的时候，夕阳印在黄家湖畔上面，没想到一别竟三年已久了，仿佛就在昨日啊。
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card v-scroll-reveal.reset flat class="card">
                  <v-row class="hidden-xs-only">
                    <v-col cols="8">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            技术栈
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              后台方面：java,spring boot全家桶, mybatis, spring
                              cloud全家桶,rabbitMQ。
                            </p>
                            <p>
                              前端方面：javascript,vue.js, nuxt.js, jquery。
                            </p>
                            <p>
                              数据库：mysql,mongodb,redis。
                            </p>
                            <p>
                              服务器：docker,docker-compose,k8s,shell,nginx,ssl安全证书。
                            </p>
                            <p>游戏引擎：cocos2d,renpy,mugen,rpgmaker</p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                    <v-col cols="4" class="align-self-center">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909102821223000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex d-sm-none">
                    <v-col cols="12">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909102821223000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                    <v-col cols="12">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            技术栈
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              后台方面：java,spring boot全家桶, mybatis, spring
                              cloud全家桶,rabbitMQ。
                            </p>
                            <p>
                              前端方面：javascript,vue.js, nuxt.js, jquery。
                            </p>
                            <p>
                              数据库：mysql,mongodb,redis。
                            </p>
                            <p>
                              服务器：docker,docker-compose,k8s,shell,nginx,ssl安全证书。
                            </p>
                            <p>游戏引擎：cocos2d,renpy,mugen,rpgmaker</p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card v-scroll-reveal.reset flat class="card">
                  <v-row class="hidden-xs-only">
                    <v-col cols="4" class="align-self-center">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909100253617000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                    <v-col cols="8">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            最爱看电影
                            <a class="font-weight-medium">《战狼2》</a>
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              尽管是一部主旋律电影
                            </p>
                            <p>
                              但最近很少有一部电影，能让人看了之后热泪盈眶，久久不能平静。
                            </p>
                            <p>
                              电影既展现了战争的残酷，也让我们知道生活在中国和平安定的环境的幸福。
                            </p>
                            <p>
                              所以，此生无悔入华夏。
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex d-sm-none">
                    <v-col cols="12">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909100253617000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                    <v-col cols="12">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            最爱看电影
                            <a class="font-weight-medium">《战狼2》</a>
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              尽管是一部主旋律电影
                            </p>
                            <p>
                              但最近很少有一部电影，能让人看了之后热泪盈眶，久久不能平静。
                            </p>
                            <p>
                              电影既展现了战争的残酷，也让我们知道生活在中国和平安定的环境的幸福。
                            </p>
                            <p>
                              所以，此生无悔入华夏。
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card v-scroll-reveal.reset flat class="card">
                  <v-row class="hidden-xs-only">
                    <v-col cols="8">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            最爱看电视剧
                            <a class="font-weight-medium">《仙剑奇侠传》</a>
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              小时候爱看仙剑，喜欢里面的奇幻和武侠。
                            </p>
                            <p>
                              长大后又看出不一样的滋味。
                            </p>
                            <p>
                              青春不再，是否还能想起儿时凉席上吃瓜看剧的那种单纯的快乐.
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                    <v-col cols="4" class="align-self-center">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909092058309000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex d-sm-none ">
                    <v-col cols="12">
                      <a target="_Blank">
                        <div class="blog-card-container">
                          <v-img
                            :aspect-ratio="320 / 200"
                            transition="fade-transition"
                            class="blog-card elevation-3 cover"
                            src="https://pan.zealsay.com/20190909092058309000000.jpg"
                            contain
                          ></v-img>
                        </div>
                      </a>
                    </v-col>
                    <v-col cols="12">
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            最爱看电视剧
                            <a class="font-weight-medium">《仙剑奇侠传》</a>
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              小时候爱看仙剑，喜欢里面的奇幻和武侠。
                            </p>
                            <p>
                              长大后又看出不一样的滋味。
                            </p>
                            <p>
                              青春不再，是否还能想起儿时凉席上吃瓜看剧的那种单纯的快乐.
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-col>
                  </v-row>
                </v-card>
                <v-divider></v-divider>
                <h2 class="font-weight-regular text-gray">意见反馈</h2>
                <p>
                  若本站内容有涉及版权问题请及时联系站长进行整改，站内错误，页面bug或是其他内容建议也欢迎反馈到站长。
                </p>
                <p>
                  站长社交账号在页脚处按钮，站长邮箱：<A
                    data-auto-link="1"
                    href="mailto:admin@zealsay.com"
                    >admin@zealsay.com</A
                  >
                </p>
                <v-divider></v-divider>
                <h2 class="font-weight-regular text-gray">写在后面</h2>
                <p>
                  如果你能够看到这个博客，说明我们本身就很有缘分，假如博客能帮到你，那么我就就会很开心了。
                </p>
                <p>
                  编程，从一门课程，变成了自己的职业，现在更多的，是一种热爱，怀揣梦想，Write
                  the Code, Change the World.
                </p>
                <p>
                  当然，任何事情都不是一蹴而就，成长路上经常会遇到各种奇奇怪怪的bug。
                </p>
                <p>
                  就像是一个剃度的推子，你变强了，头也秃了～～。
                </p>
                <p>
                  但是还是想要通过自己的双手，让梦想变得触手可及，让梦不再仅仅是一场梦。
                </p>
                <p>
                  不忘初心，不负韶华。
                </p>
                <p>
                  自己很喜欢的一句话:
                </p>
                <p class="blockquote font-weight-medium text-gray">
                  Some of us get dipped in flat, some in satin, some in
                  gloss.... But every once in a while you find someone who's
                  iridescent, and when you do, nothing will ever compare.
                </p>
                <p class="blockquote font-weight-medium text-gray">
                  有人住高楼，有人在深沟，有人光万丈，有人一身锈，世人万千种，浮云莫去求，斯人若彩虹，遇上方知有。
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>

      <core-back-to-top :visibility-height="300" :back-position="0" />
    </v-container>
    <!-- 页脚 -->
    <v-layout>
      <v-flex>
        <div class="footer">
          <blog-footer v-if="$route.name !== 'Maps'" />
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import NavBar from '@/components/blog/NavBar'
import { getCategoryList } from '@/api/article'

export default {
  auth: false,
  components: {
    'blog-nav': NavBar
  },
  data: () => ({
    loading: true,
    strings: [
      '90后小哥哥，喜欢关注些技术前沿新闻，乐意分享一些知识。',
      '只对好看的UI心动，追求优雅的代码。',
      '严重强迫症患者，如果不够完美，哪怕推倒重构也在所不惜。',
      '喜欢GTA5、还有喜欢玩王者荣耀，主玩打野，我韩信李白贼溜，开黑加我，哈哈。',
      '目前在北京，在某互联网公司从事后端开发。',
      '当前主要是负责业务系统中台，主要方向为系统架构师。'
    ]
  }),
  computed: {
    breadcrumbs() {
      return [
        {
          text: '主页',
          disabled: false,
          href: '/'
        },
        {
          text: '关于',
          disabled: true,
          href: '/blog/about'
        }
      ]
    }
  },
  async asyncData({ app, params, error }) {
    const resCategory = await app.$axios.$request(getCategoryList())
    let categorys = []
    if (resCategory.code === '200') {
      categorys = resCategory.data
    } else {
      return error({
        statusCode: resCategory.code,
        message: resCategory.message
      })
    }
    return {
      categorys
    }
  },
  methods: {
    search() {
      // eslint-disable-next-line no-console
      console.log('click search')
    }
  }
}
</script>
<style lang="scss" scoped>
.index {
  background: #fafafa;
}

.hitokoto-title {
  color: white;
  font-weight: 400 !important;
  margin-top: 5rem;
  margin-bottom: 0.6rem;
  line-height: 1 !important;
  font-size: 2rem !important;
}

.word {
  position: relative;
}

.center {
  margin: 2rem auto 1rem auto;
}

.text-detail {
  margin: 0 1.5rem;
}
.typed {
  display: block;
  height: 5rem;
  font-family: 'Sigmar One', Arial;
}
</style>
