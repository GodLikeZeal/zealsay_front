<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="index">
    <!-- header -->
    <v-card color="primary" height="450">
      <blog-nav :category="categorys"></blog-nav>
      <v-container>
        <v-layout>
          <v-flex md12>
            <div class="text-md-center word">
              <h1 class="hitokoto-title">
                <v-avatar size="120">
                  <img
                    src="https://pan.zealsay.com/20190630224926258000000.jpg"
                    alt="avatar"
                  />
                </v-avatar>
              </h1>
              <div class="row center">
                <span class="white--text font-weight-bold text-detail"
                  >zeal</span
                >
                <span class="white--text font-weight-thin ">|</span>
                <span
                  class="text-detail white--text font-weight-bold"
                  title="男"
                  ><img width="15px" src="~/static/image/sex/boy.png"
                /></span>
                <span class="white--text font-weight-thin ">|</span>
                <span class="white--text font-weight-bold text-detail"
                  >天蝎座</span
                >
              </div>
              <h5 class="white--text font-weight-medium text-detail">
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
    <v-container class="my-container">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-layout>
        <v-flex xs12 md12>
          <v-container>
            <v-layout>
              <v-flex>
                <h2 class="font-weight-regular text-gray">个人简介</h2>
                <blockquote class="blockquote">
                  对代码有洁癖的小哥哥，小石狗的偶像。
                </blockquote>
                <v-divider></v-divider>
                <h2 class="font-weight-regular text-gray">资料卡片</h2>
                <v-card flat class="card">
                  <v-layout row>
                    <v-flex xs4>
                      <a target="_Blank">
                        <v-img
                          transition="fade-transition"
                          :aspect-ratio="320 / 200"
                          class="card elevation-3 cover"
                          src="https://pan.zealsay.com/20190909104236848000000.jpg"
                          contain
                        ></v-img>
                      </a>
                    </v-flex>
                    <v-flex xs8>
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
                    </v-flex>
                  </v-layout>
                </v-card>
                <v-card flat class="card">
                  <v-layout row>
                    <v-flex xs8>
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            技术栈
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              后台方面：spring boot全家桶, mybatis-plus, oauth,
                              jwt, spring cloud全家桶,rabbitMQ,netty。
                            </p>
                            <p>
                              前端方面：vue.js, nuxt.js, jquery。
                            </p>
                            <p>
                              数据库：mysql,mongodb,redis。
                            </p>
                            <p>
                              服务器：docker,docker-compose,k8s,shell。
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-flex>
                    <v-flex xs4>
                      <a target="_Blank">
                        <v-img
                          transition="fade-transition"
                          :aspect-ratio="320 / 200"
                          class="card elevation-3 cover"
                          src="https://pan.zealsay.com/20190909102821223000000.jpg"
                          contain
                        ></v-img>
                      </a>
                    </v-flex>
                  </v-layout>
                </v-card>
                <v-card flat class="card">
                  <v-layout row>
                    <v-flex xs4>
                      <a target="_Blank">
                        <v-img
                          transition="fade-transition"
                          :aspect-ratio="320 / 200"
                          class="card elevation-3 cover"
                          src="https://pan.zealsay.com/20190909100253617000000.jpg"
                          contain
                        ></v-img>
                      </a>
                    </v-flex>
                    <v-flex xs8>
                      <v-card-title primary-title>
                        <div>
                          <div class="font-weight-regular v-card__title">
                            最爱看电影
                            <a class="font-weight-medium">《战狼2》</a>
                          </div>
                          <v-divider></v-divider>
                          <div class="v-card__text">
                            <p>
                              很少有一部电影，能让人看了之后热泪盈眶，久久不能平静。
                            </p>
                            <p>
                              电影既展现了战争的残酷，也让我们知道生活在中国和平安定的环境的幸福。
                            </p>
                            <p>
                              当长官的那句怒吼开火，老兵打完最后子弹，拿起板砖准备拼命的时候，真的是感动得一塌糊涂，影片最后出现的中国护照，更是让我感觉祖国的强大。
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-flex>
                  </v-layout>
                </v-card>
                <v-card flat class="card">
                  <v-layout row>
                    <v-flex xs8>
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
                              长大后才知道这剧看得让人多么心痛。
                            </p>
                            <p>
                              隔了这么多年，再去重温，依旧难以释怀，很怀念灵儿喊的那句逍遥哥哥，怀念陪伴在身边的月如，怀念里面的一切，到现在网易云偶尔还会日推原声带，音乐一响起就泪奔了。
                            </p>
                          </div>
                        </div>
                      </v-card-title>
                    </v-flex>
                    <v-flex xs4>
                      <a target="_Blank">
                        <v-img
                          transition="fade-transition"
                          :aspect-ratio="320 / 200"
                          class="card elevation-3 cover"
                          src="https://pan.zealsay.com/20190909092058309000000.jpg"
                          contain
                        ></v-img>
                      </a>
                    </v-flex>
                  </v-layout>
                </v-card>
                <v-divider></v-divider>
                <h2 class="font-weight-regular text-gray">写在后面</h2>
                <blockquote class="blockquote">
                  如果你能够看到这个博客，说明我们本身就很有缘分，因为我很懒，很少去宣传，假如能帮到你，那么我就会很开心了。
                </blockquote>
                <blockquote class="blockquote">
                  曾经总觉得，时间过得很慢很慢，好希望快点长大，可是发现十几年走过来，回忆一幕幕，很多的回忆都涌上心头。
                </blockquote>
                <blockquote class="blockquote">
                  正如：年少不识曲中意，回首已成曲中人。
                </blockquote>
                <blockquote class="blockquote">
                  自己很喜欢的一句话:
                </blockquote>
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

      <back-to-top :visibility-height="300" :back-position="0" />
      <!-- 页脚 -->
      <v-layout row>
        <v-flex>
          <div class="footer">
            <blog-footer v-if="$route.name !== 'Maps'" />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
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
  data: () => ({ loading: true }),
  computed: {
    breadcrumbs: function() {
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
      categorys: categorys
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
</style>
