<template>
  <v-row>
    <v-col cols="12">
      <v-card flat>
        <v-subheader>站点统计</v-subheader>
        <v-container fill-height fluid grid-list-xl>
          <v-layout wrap>
            <v-flex sm6 xs12 md6 lg3>
              <material-stats-card
                color="green"
                icon="mdi-book-open"
                title="文章数量"
                :value="blogNum"
                sub-icon="mdi-update"
                sub-text="最后更新于刚刚"
              />
            </v-flex>
            <v-flex sm6 xs12 md6 lg3>
              <material-stats-card
                color="orange"
                icon="mdi-account-circle"
                title="用户总数"
                :value="userNum"
                sub-icon="mdi-update"
                sub-text="最后更新于刚刚"
              />
            </v-flex>
            <v-flex sm6 xs12 md6 lg3>
              <material-stats-card
                color="red"
                icon="mdi-book-plus"
                title="今日新增文章"
                :value="blogAddNum"
                sub-icon="mdi-update"
                sub-text="最后更新于刚刚"
              />
            </v-flex>
            <v-flex sm6 xs12 md6 lg3>
              <material-stats-card
                color="info"
                icon="mdi-account-plus"
                title="今日新增注册用户"
                :value="userAddNum"
                sub-icon="mdi-update"
                sub-text="最后更新于刚刚"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <!--      <v-card flat>-->
      <!--        <v-subheader>服务监控</v-subheader>-->
      <!--        <v-container fill-height fluid grid-list-xl>-->
      <!--          <v-layout wrap>-->
      <!--            <v-flex sm6 xs12 md4 lg3>-->
      <!--              <v-card class="text-center">-->
      <!--                <v-card-subtitle>rabbitmq</v-card-subtitle>-->
      <!--                <v-card-text>-->
      <!--                  <h3-->
      <!--                    v-if="health.details.rabbit.status === 'UP'"-->
      <!--                    class="text-success"-->
      <!--                  >-->
      <!--                    运行中<v-icon color="success" large class="mr-2">-->
      <!--                      mdi-power-plug-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                  <h3 v-else class="text-danger">-->
      <!--                    未运行<v-icon color="danger" large class="mr-2">-->
      <!--                      mdi-power-plug-off-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                </v-card-text>-->
      <!--                <v-divider class="mx-3" />-->
      <!--                <v-card-actions>-->
      <!--                  <v-icon color="primary" size="20" class="mr-2">-->
      <!--                    mdi-power-socket-us-->
      <!--                  </v-icon>-->
      <!--                  <span-->
      <!--                    class="caption font-weight-light"-->
      <!--                    v-text="'版本号:' + health.details.rabbit.details.version"-->
      <!--                  />-->
      <!--                </v-card-actions>-->
      <!--              </v-card>-->
      <!--            </v-flex>-->
      <!--            <v-flex sm6 xs12 md4 lg3>-->
      <!--              <v-card class="text-center">-->
      <!--                <v-card-subtitle>数据库</v-card-subtitle>-->
      <!--                <v-card-text>-->
      <!--                  <h3-->
      <!--                    v-if="health.details.db.status === 'UP'"-->
      <!--                    class="text-success"-->
      <!--                  >-->
      <!--                    运行中<v-icon color="success" large class="mr-2">-->
      <!--                      mdi-power-plug-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                  <h3 v-else class="text-danger">-->
      <!--                    未运行<v-icon color="danger" large class="mr-2">-->
      <!--                      mdi-power-plug-off-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                </v-card-text>-->
      <!--                <v-divider class="mx-3" />-->
      <!--                <v-card-actions>-->
      <!--                  <v-icon color="primary" size="20" class="mr-2">-->
      <!--                    mdi-database-->
      <!--                  </v-icon>-->
      <!--                  <span-->
      <!--                    class="caption font-weight-light"-->
      <!--                    v-text="'数据库:' + health.details.db.details.database"-->
      <!--                  />-->
      <!--                </v-card-actions>-->
      <!--              </v-card>-->
      <!--            </v-flex>-->
      <!--            <v-flex sm6 xs12 md4 lg3>-->
      <!--              <v-card class="text-center">-->
      <!--                <v-card-subtitle>redis</v-card-subtitle>-->
      <!--                <v-card-text>-->
      <!--                  <h3-->
      <!--                    v-if="health.details.redis.status === 'UP'"-->
      <!--                    class="text-success"-->
      <!--                  >-->
      <!--                    运行中<v-icon color="success" large class="mr-2">-->
      <!--                      mdi-power-plug-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                  <h3 v-else class="text-danger">-->
      <!--                    未运行<v-icon color="danger" large class="mr-2">-->
      <!--                      mdi-power-plug-off-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                </v-card-text>-->
      <!--                <v-divider class="mx-3" />-->
      <!--                <v-card-actions>-->
      <!--                  <v-icon color="primary" size="20" class="mr-2">-->
      <!--                    mdi-webpack-->
      <!--                  </v-icon>-->
      <!--                  <span-->
      <!--                    class="caption font-weight-light"-->
      <!--                    v-text="'版本号:' + health.details.redis.details.version"-->
      <!--                  />-->
      <!--                </v-card-actions>-->
      <!--              </v-card>-->
      <!--            </v-flex>-->
      <!--            <v-flex sm6 xs12 md4 lg3>-->
      <!--              <v-card class="text-center">-->
      <!--                <v-card-subtitle>邮箱</v-card-subtitle>-->
      <!--                <v-card-text>-->
      <!--                  <h3-->
      <!--                    v-if="health.details.mail.status === 'UP'"-->
      <!--                    class="text-success"-->
      <!--                  >-->
      <!--                    运行中<v-icon color="success" large class="mr-2">-->
      <!--                      mdi-power-plug-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                  <h3 v-else class="text-danger">-->
      <!--                    未运行<v-icon color="danger" large class="mr-2">-->
      <!--                      mdi-power-plug-off-->
      <!--                    </v-icon>-->
      <!--                  </h3>-->
      <!--                </v-card-text>-->
      <!--                <v-divider class="mx-3" />-->
      <!--                <v-card-actions>-->
      <!--                  <v-icon color="primary" size="20" class="mr-2">-->
      <!--                    mdi-email-outline-->
      <!--                  </v-icon>-->
      <!--                  <span-->
      <!--                    class="caption font-weight-light"-->
      <!--                    v-text="'location:' + health.details.mail.details.location"-->
      <!--                  />-->
      <!--                </v-card-actions>-->
      <!--              </v-card>-->
      <!--            </v-flex>-->
      <!--          </v-layout>-->
      <!--        </v-container>-->
      <!--      </v-card>-->
    </v-col>
  </v-row>
</template>

<script>
import { getDashboardData } from '@/api/data'

export default {
  layout: 'admin',
  data: () => ({}),
  async asyncData({ app, error }) {
    const res = await app.$axios.$request(getDashboardData())

    let userNum = {}
    let userAddNum = {}
    let blogNum = {}
    let blogAddNum = {}
    if (res.code === '200') {
      userNum = res.data.userNum
      userAddNum = res.data.userAddNum
      blogNum = res.data.blogNum
      blogAddNum = res.data.blogAddNum
    } else {
      return error({
        statusCode: res.code,
        message: res.message
      })
    }

    return {
      userNum,
      userAddNum,
      blogNum,
      blogAddNum
    }
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>
<style scoped lang="scss"></style>
