<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="info"
          type="Line"
        >
          <h4 class="title font-weight-light">日活跃用户</h4>
          <p class="category d-inline-flex font-weight-light">
            <v-icon color="green" small>
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp; 相比较昨天
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >最后更新于4分钟前</span
            >
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">网站浏览量</h4>
          <p class="category d-inline-flex font-weight-light">
            本周数据一览
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >最后更新10分钟前</span
            >
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="green"
          type="Line"
        >
          <h3 class="title font-weight-light">文章新增量</h3>
          <p class="category d-inline-flex font-weight-light">
            上周数据展示
          </p>

          <template slot="actions">
            <v-icon class="mr-2" small>
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light"
              >最后更新于26分钟之前</span
            >
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-store"
          title="Revenue"
          value="$34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="硬盘使用"
          value="49/50"
          small-value="GB"
          sub-icon="mdi-alert"
          sub-icon-color="error"
          sub-text="Get More Space..."
          sub-text-color="text-primary"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="已修复Issues"
          value="75"
          sub-icon="mdi-tag"
          sub-text="Tracked from Github"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex md12 lg6>
        <material-card
          color="orange"
          title="活跃排行榜"
          text="最后更新于5分钟前"
        >
          <v-data-table :headers="headers" :items="items">
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ _id, item }">
              <td>{{ _id + 1 }}</td>
              <td>{{ item.name }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
              <td class="text-xs-right">{{ item.country }}</td>
              <td class="text-xs-right">{{ item.city }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex md12 lg6>
        <material-card class="card-tabs" color="green">
          <v-flex slot="header">
            <v-tabs v-model="tabs" background-color="transparent">
              <span
                class="subheading font-weight-light mr-3"
                style="align-self: center"
                >Tasks:</span
              >
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-bug</v-icon>
                Bugs
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-code-tags</v-icon>
                Website
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">mdi-cloud</v-icon>
                Server
              </v-tab>
            </v-tabs>
          </v-flex>

          <v-tabs-items v-model="tabs">
            <v-tab-item v-for="n in 3" :key="n">
              <v-list two-line>
                <v-list-item-group multiple>
                  <v-list-item>
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox
                          v-model="active"
                          color="primary"
                          @click="toggle"
                        />
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          [refactor]首页展示优化
                        </v-list-item-title>
                      </v-list-item-content>

                      <div class="d-flex">
                        <v-tooltip top content-class="top">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="v-btn--simple"
                              color="success"
                              icon
                              v-on="on"
                            >
                              <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>Edit</span>
                        </v-tooltip>

                        <v-tooltip top content-class="top">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="v-btn--simple"
                              color="danger"
                              icon
                              v-on="on"
                            >
                              <v-icon color="error">mdi-close</v-icon>
                            </v-btn>
                          </template>
                          <span>Close</span>
                        </v-tooltip>
                      </div>
                    </template>
                  </v-list-item>
                  <v-divider />
                  <v-list-item>
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox
                          v-model="active"
                          color="primary"
                          @click="toggle"
                        />
                      </v-list-item-action>
                      <v-list-item-title>
                        [feat]增加评论系统
                      </v-list-item-title>

                      <div class="d-flex">
                        <v-tooltip top content-class="top">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="v-btn--simple"
                              color="success"
                              icon
                              v-on="on"
                            >
                              <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>Edit</span>
                        </v-tooltip>

                        <v-tooltip top content-class="top">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="v-btn--simple"
                              color="danger"
                              icon
                              v-on="on"
                            >
                              <v-icon color="error">mdi-close</v-icon>
                            </v-btn>
                          </template>
                          <span>Close</span>
                        </v-tooltip>
                      </div>
                    </template>
                  </v-list-item>
                  <v-divider />
                  <v-list-item @click="complete(2)">
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox
                          v-model="active"
                          color="primary"
                          @click="toggle"
                        />
                      </v-list-item-action>
                      <v-list-item-title>
                        [fix]: 修复alert弹窗在移动端展示异常
                      </v-list-item-title>

                      <div class="d-flex">
                        <v-tooltip top content-class="top">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="v-btn--simple"
                              color="success"
                              icon
                              v-on="on"
                            >
                              <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>Edit</span>
                        </v-tooltip>

                        <v-tooltip top content-class="top">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              class="v-btn--simple"
                              color="danger"
                              icon
                              v-on="on"
                            >
                              <v-icon color="error">mdi-close</v-icon>
                            </v-btn>
                          </template>
                          <span>Close</span>
                        </v-tooltip>
                      </div>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs-items>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            'Ja',
            'Fe',
            'Ma',
            'Ap',
            'Mai',
            'Ju',
            'Jul',
            'Au',
            'Se',
            'Oc',
            'No',
            'De'
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            'screen and (max-width: 640px)',
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0]
                }
              }
            }
          ]
        ]
      },
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: '名称',
          value: 'name'
        },
        {
          sortable: false,
          text: '价值',
          value: 'salary',
          align: 'right'
        },
        {
          sortable: false,
          text: '国家',
          value: 'country',
          align: 'right'
        },
        {
          sortable: false,
          text: '城市',
          value: 'city',
          align: 'right'
        }
      ],
      items: [
        {
          id: '001',
          name: 'zeal',
          country: '中国',
          city: '北京',
          salary: '$35,738'
        },
        {
          id: '002',
          name: 'editor',
          country: '中国',
          city: '天津',
          salary: '$23,738'
        },
        {
          id: '003',
          name: '小明',
          country: '中国',
          city: '上海',
          salary: '$56,142'
        },
        {
          id: '004',
          name: '桔梗',
          country: '日本',
          city: '大阪',
          salary: '$38,735'
        },
        {
          id: '005',
          name: '山的那边',
          country: '中国',
          city: '武汉',
          salary: '$63,542'
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index]
    }
  }
}
</script>
