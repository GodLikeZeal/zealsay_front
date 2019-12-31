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
      :pagination.sync="pagination"
      :items="desserts"
      :total-items="pagination.totalItems"
      :loading="loading"
      hide-actions
      select-all
      class="elevation-1"
    >
      <template v-slot:no-data>
        <p class="text-md-center teal--text">
          <v-icon>sentiment_satisfied_alt</v-icon>
          已经找遍了，再怎么找也找不到啦！
        </p>
      </template>
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="[
              'column sortable',
              pagination.descending ? 'desc' : 'asc',
              header.value === pagination.sortBy ? 'active' : ''
            ]"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr :active="props.selected">
          <td class="text-xs-right" @click="props.selected = !props.selected">
            <v-checkbox
              :input-value="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-right">
            <v-avatar size="32px" color="grey lighten-4">
              <v-img
                :lazy-src="props.item.avatar"
                :src="props.item.avatar"
                alt="avatar"
              ></v-img>
            </v-avatar>
          </td>
          <td class="text-xs-right">{{ props.item.username }}</td>
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td class="text-xs-right">
            <img
              v-if="props.item.sex == 1"
              width="24px"
              src="@/static/image/sex/boy.png"
            />
            <img
              v-if="props.item.sex == 0"
              width="24px"
              src="@/static/image/sex/girl.png"
            />
          </td>
          <td class="text-xs-right">{{ props.item.age }}</td>
          <td class="text-xs-right">{{ props.item.phoneNumber }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">
            <span v-if="props.item.status == 'NORMAL'">
              正常<v-icon color="success" small
                >mdi-emoticon-excited-outline</v-icon
              >
            </span>
            <span v-if="props.item.status == 'DISABLED'">
              封禁<v-icon color="error" small
                >mdi-emoticon-devil-outline</v-icon
              >
            </span>
            <span v-if="props.item.status == 'LOCK'">
              锁定<v-icon color="warning" small
                >mdi-emoticon-dead-outline</v-icon
              >
            </span>
          </td>
          <td class="text-xs-right">
            <v-layout justify-center class="mb-2">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    flat
                    color="primary"
                    title="详情"
                    v-on="on"
                    @click="handleInfo(props.item)"
                  >
                    <v-icon>portrait</v-icon>
                  </v-btn>
                </template>
                <span>详情</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    flat
                    color="primary"
                    title="编辑"
                    v-on="on"
                    @click="handleEdit(props.item)"
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
                    flat
                    color="primary"
                    title="解封"
                    v-on="on"
                    @click="handleUnsealing(props.item)"
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
                    flat
                    color="primary"
                    title="封禁"
                    v-on="on"
                    @click="handleDisabled(props.item)"
                  >
                    <v-icon>remove_circle</v-icon>
                  </v-btn>
                </template>
                <span>封禁</span>
              </v-tooltip>
            </v-layout>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="pagination text-md-right">
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
import forms from './components/form'
import info from './components/info'
import {
  getUserList,
  disabeledUser,
  disabeledUserBatch,
  unsealingUserBatch,
  unsealingUser
} from '@/api/user'

export default {
  name: 'User',
  layout: 'admin',
  components: { forms },
  data() {
    return {
      searchData: {},
      selected: [],
      loading: true,
      headers: [
        { text: '头像', value: 'avatar' },
        { text: '用户名', value: 'username' },
        { text: '姓名', value: 'name' },
        { text: '性别', value: 'sex' },
        { text: '年龄', value: 'age' },
        { text: '手机号', value: 'phoneNumber' },
        { text: '邮箱', value: 'email' },
        { text: '状态', value: 'status' },
        { text: '操作', value: '' }
      ],
      desserts: [],
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 10, // -1 for All
        sortBy: '',
        totalItems: 2
      },
      row: {},
      dialogVisible: false,
      formVisible: false,
      title: ''
    }
  },
  computed: {
    length: {
      get: function() {
        return this.pagination.totalItems
          ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
          : 0
      },
      set: function() {}
    }
  },
  async asyncData({ app, query, error }) {
    const { code, message, data } = await app.$axios.$request(getUserList())
    if (code === '200') {
      const pagination = {}
      pagination.page = data.currentPage
      pagination.rowsPerPage = data.pageSize
      pagination.totalItems = data.total
      return { desserts: data.records, pagination: pagination }
    } else {
      return error({ statusCode: code, message: message })
    }
  },
  methods: {
    search() {
      const searchData = this.searchData
      searchData.pageSize = this.pagination.rowsPerPage
      searchData.pageNumber = this.pagination.page
      this.$axios
        .$request(getUserList(searchData))
        .then(res => {
          if (res.code === '200') {
            this.desserts = res.data.records
            this.pagination.page = res.data.currentPage
            this.pagination.rowsPerPage = res.data.pageSize
            this.pagination.totalItems = res.data.total
          } else {
            this.$swal({
              text: '拉取用户列表失败',
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
          this.loading = false
        })
    },
    toggleAll() {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    handleEdit(row) {
      this.formVisible = true
      this.row = { ...row }
      // let editDialog = this.$dialog.show(forms, {
      //     row: row,
      //     width: 600
      // });
    },
    handleCancel() {
      this.formVisible = false
    },
    handleInfo(row) {
      this.row = { ...row }
      this.$dialog.show(info, { row: row, width: 600 })
    },
    handleDisabled(row) {
      this.$swal({
        title: '确定要封禁吗？',
        text: '一旦封禁，该用户无法登录系统',
        type: 'warning',
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$axios.$request(disabeledUser(row.id)).then(res => {
            if (res.code === '200' && res.data) {
              this.$swal({
                title: '操作成功!',
                text: '该用户已经被封禁',
                type: 'success'
              })
              this.search('')
            } else {
              this.$swal({
                title: '操作失败!',
                text: res.message,
                type: 'error'
              })
            }
          })
        }
      })
    },
    handleUnsealing(row) {
      this.$swal({
        title: '确定要解封吗？',
        text: '将该用户从封禁状态改成正常状态，该用户可正常使用系统',
        type: 'warning',
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          this.$axios.$request(unsealingUser(row.id)).then(res => {
            if (res.code === '200' && res.data) {
              this.$swal({
                title: '操作成功!',
                text: '该用户已经成功解封',
                type: 'success'
              })
              this.search('')
            } else {
              this.$swal({
                title: '操作失败!',
                text: res.message,
                type: 'error'
              })
            }
          })
        }
      })
    },
    handleDisabledSelected(selected) {
      const param = selected.map(s => s.id)
      if (param.length > 0) {
        this.$swal({
          title: '确定要封禁吗？',
          text: '一旦封禁，所选用户无法登录系统',
          type: 'warning',
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            this.$axios.$request(disabeledUserBatch(param)).then(res => {
              if (res.code === '200' && res.data) {
                this.$swal({
                  title: '操作成功!',
                  text: '所选用户已经被封禁',
                  type: 'success'
                })
                this.search('')
              } else {
                this.$swal({
                  title: '操作失败!',
                  text: res.message,
                  type: 'error'
                })
              }
            })
          }
        })
      } else {
        this.$swal({
          title: '无法封禁！',
          text: '请至少选择一条需要封禁的用户！',
          type: 'warning'
        })
      }
    },
    handleUnsealingSelected(selected) {
      const param = selected.map(s => s.id)
      if (param.length > 0) {
        this.$swal({
          title: '确定要解封吗？',
          text: '将所选用户从封禁状态改成正常状态，该用户可正常使用系统',
          type: 'warning',
          showCancelButton: true
        }).then(result => {
          if (result.value) {
            this.$axios.$request(unsealingUserBatch(param)).then(res => {
              if (res.code === '200' && res.data) {
                this.$swal({
                  title: '操作成功!',
                  text: '所选用户已经成功解封',
                  type: 'success'
                })
                this.search('')
              } else {
                this.$swal({
                  title: '操作失败!',
                  text: res.message,
                  type: 'error'
                })
              }
            })
          }
        })
      } else {
        this.$swal({
          title: '无法封禁！',
          text: '请至少选择一条需要解封的用户！',
          type: 'warning'
        })
      }
    }
  }
}
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
</style>
