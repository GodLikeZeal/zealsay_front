<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="con">
    <v-container fluid>
      <v-layout row wrap fill-height>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="searchData.code"
            label="Solo"
            placeholder="code"
            solo
            @keyup.enter="search"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="searchData.name"
            label="Solo"
            placeholder="名称"
            solo
            @keyup.enter="search"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="searchData.parentCode"
            label="Solo"
            placeholder="父层code"
            solo
            @keyup.enter="search"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="searchData.description"
            label="Solo"
            placeholder="描述"
            solo
            @keyup.enter="search"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md4>
          <v-select
            v-model="searchData.type"
            solo
            :items="types"
            item-text="text"
            item-value="value"
            label="请选择分类目录"
            @keyup.enter="search"
          ></v-select>
        </v-flex>
        <v-flex xs6 sm3 md2 lg1>
          <v-btn
            block
            color="primary"
            title="刷新"
            @click="refresh(searchData)"
          >
            查询 <br />
            <v-icon small>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm3 md2 lg1>
          <v-btn block color="success" title="添加" @click="handleAdd()">
            添加 <br />
            <v-icon small>add_circle</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm3 md2 lg1>
          <v-btn
            block
            color="error"
            title="删除"
            @click="handleDeleteSelected(selected)"
          >
            删除 <br />
            <v-icon small>remove_circle</v-icon>
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
        <p class="text-md-center teal--text">
          已经找遍了，再怎么找也找不到啦！
        </p>
      </template>
      <template v-slot:item.command="{ item }">
        <v-layout justify-center class="mb-2">
          <v-btn
            icon
            text
            color="primary"
            title="编辑"
            @click="handleEdit(item)"
          >
            <v-icon>create</v-icon>
          </v-btn>
          <v-btn
            icon
            text
            color="primary"
            title="删除"
            @click="handleDelete(item)"
          >
            <v-icon>remove_circle</v-icon>
          </v-btn>
        </v-layout>
      </template>
    </v-data-table>
    <div class="pagination">
      <v-pagination
        v-model="pagination.page"
        :length="length"
        total-visible="10"
        class="justify-start"
        circle
        color="primary"
        @input="search"
      ></v-pagination>
    </div>
    <div>
      <add-form
        :alert="addFormVisible"
        @handleCancel="handleCancelAdd"
      ></add-form>
    </div>
    <div>
      <edit-form
        :row="row"
        :alert="editFormVisible"
        @handleCancel="handleCancelEdit"
      ></edit-form>
    </div>
  </div>
</template>
<script>
import { getDictPage, getTypeList, deleteById, deleteByBatch } from '@/api/dict'
import addForm from './components/addForm'
import editForm from './components/editForm'

export default {
  name: 'Dict',
  layout: 'admin',
  components: { addForm, editForm },
  data() {
    return {
      searchData: {},
      selected: [],
      loading: true,
      headers: [
        { text: 'code', value: 'code', width: 10 },
        { text: '名称', value: 'name', width: 30 },
        { text: '类型', value: 'type', width: 10 },
        { text: '父层code', value: 'parentCode', width: 10 },
        { text: '描述', value: 'description', width: 10 },
        { text: '操作', value: 'command', align: 'center', width: 10 }
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
      addFormVisible: false,
      editFormVisible: false,
      title: ''
    }
  },
  computed: {
    length: {
      get() {
        return this.pagination.totalItems
          ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
          : 0
      },
      set() {}
    }
  },
  async asyncData({ app, query, error }) {
    const res = await app.$axios.$request(getDictPage())
    const pagination = {}
    if (res.code === '200') {
      pagination.page = res.data.currentPage
      pagination.rowsPerPage = res.data.pageSize
      pagination.totalItems = res.data.total
    } else {
      return error({ statusCode: res.code, message: res.message })
    }
    const reslist = await app.$axios.$request(getTypeList())
    const types = []
    if (reslist.code === '200') {
      const de = {}
      de.text = '请选择分类目录'
      de.value = ''
      types.push(de)
      for (let i = 0; i < reslist.data.length; i++) {
        const re = {}
        re.text = reslist.data[i].type + '-' + reslist.data[i].description
        re.value = reslist.data[i].type
        types.push(re)
      }
    } else {
      return error({ statusCode: reslist.code, message: reslist.message })
    }
    return { desserts: res.data.records, pagination, types }
  },
  methods: {
    search() {
      const searchData = this.searchData
      searchData.pageSize = this.pagination.rowsPerPage
      searchData.pageNumber = this.pagination.page
      this.$axios
        .$request(getDictPage(searchData))
        .then((res) => {
          if (res.code === '200') {
            this.desserts = res.data.records
            this.pagination.page = res.data.currentPage
            this.pagination.rowsPerPage = res.data.pageSize
            this.pagination.totalItems = res.data.total
          } else {
            this.$swal({
              text: '拉取字典数据列表失败',
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
        .finally(() => {
          this.loading = false
        })
    },
    refresh(obj) {
      this.$axios.$request(getDictPage(obj)).then((res) => {
        this.desserts = res.data.records
        this.pagination.page = res.data.currentPage
        this.pagination.rowsPerPage = res.data.pageSize
        this.pagination.totalItems = res.data.total
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
    handleCancelAdd() {
      this.addFormVisible = false
    },
    handleCancelEdit() {
      this.editFormVisible = false
    },
    handleAdd() {
      this.addFormVisible = true
    },
    handleEdit(row) {
      this.editFormVisible = true
      this.row = { ...row }
    },
    handleDelete(row) {
      this.$swal({
        title: '确定要删除吗？',
        type: 'warning',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          console.log(row)
          this.$axios
            .$request(deleteById(row.id))
            .then((res) => {
              this.loading = false
              if (res.code === '200' && res.data) {
                this.$swal({
                  title: '删除成功',
                  type: 'success'
                })
                this.refresh()
              } else {
                this.$swal({
                  title: '删除失败',
                  text: res.message,
                  type: 'error'
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
      })
    },
    handleDeleteSelected(selected) {
      const param = selected.map((s) => s.id)
      if (param.length > 0) {
        this.$swal({
          title: '确定要删除吗？',
          type: 'warning',
          showCancelButton: true
        }).then((result) => {
          if (result.value) {
            this.$axios.$request(deleteByBatch(param)).then((res) => {
              if (res.code === '200' && res.data) {
                this.$swal({
                  title: '删除成功',
                  type: 'success'
                })
                this.refresh()
              } else {
                this.$swal({
                  title: '删除失败',
                  text: res.message,
                  type: 'error'
                })
              }
            })
          }
        })
      } else {
        this.$swal({
          title: '无法删除！',
          text: '请至少选择一条需要删除的数据字典！',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
