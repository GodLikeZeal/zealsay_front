<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="con">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="searchData.name"
            label="Solo"
            placeholder="姓名"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="searchData.phoneNumber"
            label="Solo"
            placeholder="手机号码"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="searchData.email"
            label="Solo"
            placeholder="邮箱"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs6 sm2 md1>
          <v-btn color="info" @click="search(searchData)"
            >搜索 <br />
            <v-icon small>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm2 md1>
          <v-btn
            color="success"
            title="解封"
            @click="handleUnsealingSelected(selected)"
          >
            解封 <br />
            <v-icon small>how_to_reg</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm2 md1>
          <v-btn
            color="error"
            title="禁用"
            @click="handleDisabledSelected(selected)"
          >
            封禁 <br />
            <v-icon small>mdi-cancel</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :page.sync="pagination.page"
      :items-per-page="pagination.rowsPerPage"
      :items="desserts"
      :server-items-length="pagination.totalItems"
      show-select
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:no-data>
        <p class="text-center teal--text">
          已经找遍了，再怎么找也找不到啦！
        </p>
      </template>
      <template v-slot:item.avatar="{ item }">
        <v-avatar size="32px" color="grey lighten-4">
          <img :src="item.avatar" :lazy-src="item.avatar" alt="avatar" />
        </v-avatar>
      </template>
      <template v-slot:item.sex="{ item }">
        <img
          v-if="item.sex == 1"
          width="24px"
          src="../../../../assets/sex/boy.png"
        />
        <img
          v-if="item.sex == 0"
          width="24px"
          src="../../../../assets/sex/girl.png"
        />
      </template>
      <template v-slot:item.status="{ item }">
        <span v-if="item.status == 'NORMAL'">
          正常<v-icon color="success" small
            >mdi-emoticon-excited-outline</v-icon
          >
        </span>
        <span v-if="item.status == 'DISABLED'">
          封禁<v-icon color="error" small>mdi-emoticon-devil-outline</v-icon>
        </span>
        <span v-if="item.status == 'LOCK'">
          锁定<v-icon color="warning" small>mdi-emoticon-dead-outline</v-icon>
        </span>
      </template>
      <template v-slot:item.command="{ item }">
        <v-layout justify-center class="mb-2">
          <template>
            <div class="text-center">
              <v-dialog width="800">
                <template v-slot:activator="{ on }">
                  <v-btn icon text color="primary" title="详情" v-on="on">
                    <v-icon>portrait</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-img
                    class="white--text"
                    height="270"
                    src="https://pan.zealsay.com/user_info_bg.jpg"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <v-img
                            class="avator"
                            height="100"
                            width="100"
                            :lazy-src="item.avatar"
                            :src="item.avatar"
                          ></v-img>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="6">
                          <span class="text-detail grey--text"
                            >用户名 ：{{ item.username }}</span
                          >
                        </v-col>
                        <v-col cols="6">
                          <span class="text-detail grey--text"
                            >姓名 ：{{ item.name }}</span
                          >
                        </v-col>
                        <v-col cols="6">
                          <span
                            v-if="item.sex == 1"
                            class="text-detail grey--text"
                            title="男"
                            >性别 ：<img
                              width="15px"
                              src="../../../../assets/sex/boy.png"
                          /></span>
                          <span
                            v-if="item.sex == 0"
                            class="text-detail grey--text"
                            title="女"
                            >性别 ：<img
                              width="15px"
                              src="../../../../assets/sex/girl.png"
                          /></span>
                        </v-col>
                        <v-col cols="6">
                          <span class="text-detail grey--text"
                            >城市：{{
                              item.cityName ? item.cityName : "暂无"
                            }}</span
                          >
                        </v-col>
                        <v-col cols="6">
                          <span class="text-detail grey--text"
                            >年龄：{{ item.age ? item.age : "未知" }}</span
                          >
                        </v-col>
                        <v-col cols="6">
                          <span class="text-detail grey--text"
                            >注册于：{{ item.registerAt }}</span
                          >
                        </v-col>
                        <v-col cols="12">
                          <span v-if="item.phoneNumber">
                            <span class="text-detail grey--text"
                              >手机号 ：{{ item.phoneNumber }}</span
                            >
                            <v-icon small color="success">
                              mdi-checkbox-marked-circle</v-icon
                            >
                            <span class="green--text"> 已绑定</span>
                          </span>
                          <span v-else>
                            <span class="text-detail grey--text"
                              >手机号 ：无</span
                            >
                            <v-icon small color="warning">
                              mdi-exclamation</v-icon
                            >
                            <span class="orange--text"> 未绑定</span>
                          </span>
                        </v-col>
                        <v-col cols="12">
                          <span v-if="item.email">
                            <span class="text-detail grey--text"
                              >邮 箱 ：{{ item.email }}</span
                            >
                            <v-icon small color="success">
                              mdi-checkbox-marked-circle</v-icon
                            >
                            <span class="green--text"> 已绑定</span>
                          </span>
                          <span v-else>
                            <span class="text-detail grey--text"
                              >邮 箱 ：无</span
                            >
                            <v-icon small color="warning">
                              mdi-exclamation</v-icon
                            >
                            <span class="orange--text"> 未绑定</span>
                          </span>
                        </v-col>
                        <v-col cols="12">
                          <p class="grey--text">
                            <span class="text-detail"
                              >地址 ：{{
                                item.address ? item.address : "无"
                              }}</span
                            >
                          </p>
                        </v-col>
                        <v-col cols="12">
                          <span v-if="item.label" class=" grey--text">
                            <span class="text-detail">TA的标签</span>
                            <v-chip
                              v-for="label in item.label.split(',')"
                              :key="label"
                              :color="color[parseInt(Math.random() * 6, 10)]"
                              small
                            >
                              <v-avatar>
                                <v-img
                                  :src="icon[parseInt(Math.random() * 20, 10)]"
                                  :lazy-src="
                                    icon[parseInt(Math.random() * 20, 10)]
                                  "
                                  alt="label"
                                />
                              </v-avatar>
                              {{ label }}
                            </v-chip>
                          </span>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card-title>
                </v-card>
              </v-dialog>
            </div>
          </template>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                text
                color="primary"
                title="编辑"
                v-on="on"
                @click="handleEdit(item)"
              >
                <v-icon>create</v-icon>
              </v-btn>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                text
                color="primary"
                title="解封"
                v-on="on"
                @click="handleUnsealing(item)"
              >
                <v-icon>how_to_reg</v-icon>
              </v-btn>
            </template>
            <span>解封</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                text
                color="primary"
                title="封禁"
                v-on="on"
                @click="handleDisabled(item)"
              >
                <v-icon>remove_circle</v-icon>
              </v-btn>
            </template>
            <span>封禁</span>
          </v-tooltip>
        </v-layout>
      </template>
    </v-data-table>
    <div class="pagination">
      <v-pagination
        v-model="pagination.page"
        circle
        color="primary"
        :length="length"
        @input="search"
      ></v-pagination>
    </div>
    <div>
      <forms
        :row="row"
        :alert="formVisible"
        @handleCancel="handleCancel"
      ></forms>
    </div>
  </div>
</template>
<script>
import forms from "./components/form";
import {
  getUserList,
  disabeledUser,
  disabeledUserBatch,
  unsealingUserBatch,
  unsealingUser
} from "@/api/user";

export default {
  name: "User",
  layout: "admin",
  components: { forms },
  data() {
    return {
      searchData: {},
      selected: [],
      loading: true,
      headers: [
        { text: "头像", value: "avatar" },
        { text: "用户名", value: "username" },
        { text: "姓名", value: "name" },
        { text: "性别", value: "sex" },
        { text: "年龄", value: "age" },
        { text: "手机号", value: "phoneNumber" },
        { text: "邮箱", value: "email", align: "center" },
        { text: "状态", value: "status" },
        { text: "操作", value: "command", align: "center" }
      ],
      desserts: [],
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10, // -1 for All
        sortBy: "",
        totalItems: 2
      },
      row: {},
      dialogVisible: false,
      formVisible: false,
      title: "",
      icon: [
        require("@/assets/food/南瓜.png"),
        require("@/assets/food/吐司.png"),
        require("@/assets/food/夏威夷果.png"),
        require("@/assets/food/山楂片.png"),
        require("@/assets/food/开心果.png"),
        require("@/assets/food/抹茶麻薯.png"),
        require("@/assets/food/杏仁.png"),
        require("@/assets/food/板栗.png"),
        require("@/assets/food/柠檬干.png"),
        require("@/assets/food/炭烤肠.png"),
        require("@/assets/food/猪肉铺.png"),
        require("@/assets/food/瓜子.png"),
        require("@/assets/food/芒果干.png"),
        require("@/assets/food/花生.png"),
        require("@/assets/food/草莓干.png"),
        require("@/assets/food/蒸蛋糕.png"),
        require("@/assets/food/蚕豆.png"),
        require("@/assets/food/蛋黄酥.png"),
        require("@/assets/food/辣条.png"),
        require("@/assets/food/鱿鱼仔.png")
      ],
      color: ["info", "success", "primary", "warning", "error", "admin.vue"]
    };
  },
  computed: {
    length: {
      get: function() {
        return this.pagination.totalItems
          ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
          : 0;
      },
      set: function() {}
    }
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      const searchData = this.searchData;
      searchData.pageSize = this.pagination.rowsPerPage;
      searchData.pageNumber = this.pagination.page;
      getUserList(searchData)
        .then(res => {
          if (res.code === "200") {
            this.desserts = res.data.records;
            this.pagination.page = res.data.currentPage;
            this.pagination.rowsPerPage = res.data.pageSize;
            this.pagination.totalItems = res.data.total;
          } else {
            this.$swal({
              text: "拉取用户列表失败",
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
        .finally(() => {
          this.loading = false;
        });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    handleEdit(row) {
      this.formVisible = true;
      this.row = { ...row };
      // let editDialog = this.$dialog.show(forms, {
      //     row: row,
      //     width: 600
      // });
    },
    handleCancel() {
      this.formVisible = false;
    },

    handleDisabled(row) {
      this.$swal({
        title: "确定要封禁吗？",
        text: "一旦封禁，该用户无法登录系统",
        type: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$axios.$request(disabeledUser(row.id)).then(res => {
            if (res.code === "200" && res.data) {
              this.$swal({
                title: "操作成功!",
                text: "该用户已经被封禁",
                type: "success"
              });
              this.search("");
            } else {
              this.$swal({
                title: "操作失败!",
                text: res.message,
                type: "error"
              });
            }
          });
        }
      });
    },
    handleUnsealing(row) {
      this.$swal({
        title: "确定要解封吗？",
        text: "将该用户从封禁状态改成正常状态，该用户可正常使用系统",
        type: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$axios.$request(unsealingUser(row.id)).then(res => {
            if (res.code === "200" && res.data) {
              this.$swal({
                title: "操作成功!",
                text: "该用户已经成功解封",
                type: "success"
              });
              this.search("");
            } else {
              this.$swal({
                title: "操作失败!",
                text: res.message,
                type: "error"
              });
            }
          });
        }
      });
    },
    handleDisabledSelected(selected) {
      const param = selected.map(s => s.id);
      if (param.length > 0) {
        this.$swal({
          title: "确定要封禁吗？",
          text: "一旦封禁，所选用户无法登录系统",
          type: "warning",
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            this.$axios.$request(disabeledUserBatch(param)).then(res => {
              if (res.code === "200" && res.data) {
                this.$swal({
                  title: "操作成功!",
                  text: "所选用户已经被封禁",
                  type: "success"
                });
                this.search("");
              } else {
                this.$swal({
                  title: "操作失败!",
                  text: res.message,
                  type: "error"
                });
              }
            });
          }
        });
      } else {
        this.$swal({
          title: "无法封禁！",
          text: "请至少选择一条需要封禁的用户！",
          type: "warning"
        });
      }
    },
    handleUnsealingSelected(selected) {
      const param = selected.map(s => s.id);
      if (param.length > 0) {
        this.$swal({
          title: "确定要解封吗？",
          text: "将所选用户从封禁状态改成正常状态，该用户可正常使用系统",
          type: "warning",
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            this.$axios.$request(unsealingUserBatch(param)).then(res => {
              if (res.code === "200" && res.data) {
                this.$swal({
                  title: "操作成功!",
                  text: "所选用户已经成功解封",
                  type: "success"
                });
                this.search("");
              } else {
                this.$swal({
                  title: "操作失败!",
                  text: res.message,
                  type: "error"
                });
              }
            });
          }
        });
      } else {
        this.$swal({
          title: "无法封禁！",
          text: "请至少选择一条需要解封的用户！",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.con {
  padding: 0 20px;
}

.layout > .flex {
  padding: 8px;
}

.v-icon {
  color: #2196f3;
  cursor: pointer;
}

.img {
  width: 30px;
  height: 30px;
}

.v-image__image {
  width: 30px;
  height: 30px;
}

.text-success {
  color: forestgreen;
  font-weight: bold;
  padding: 0 12px !important;
}

.text-error {
  color: #dc6752;
  font-weight: bold;
  padding: 0 12px !important;
}

.text-warning {
  color: #dca173;
  font-weight: bold;
  padding: 0 12px !important;
}

.pagination {
  margin: 20px;
}
.avator {
  margin: 90px auto auto;
  border-radius: 50%;
}

.center {
  margin: 0 auto;
}

.text-detail {
  margin: 0 15px;
}
</style>
