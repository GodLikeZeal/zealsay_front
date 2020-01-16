<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="con">
    <v-container>
      <v-layout row wrap fill-height justify-end>
        <v-flex xs6 sm3 md1>
          <v-btn color="primary" title="刷新" @click="refresh()">
            刷新 <br />
            <v-icon small>refresh</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm3 md1>
          <v-btn color="success" title="添加" @click="handleAdd()">
            添加 <br />
            <v-icon small>add_circle</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm3 md1>
          <v-btn
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
import addForm from "./components/addForm";
import editForm from "./components/editForm";
import { getRolePageList, deleteRole, deleteRoleBatch } from "@/api/role";

export default {
  name: "Role",
  layout: "admin",
  components: { addForm, editForm },
  data() {
    return {
      searchData: {},
      selected: [],
      loading: true,
      headers: [
        { text: "名称", value: "name" },
        { text: "VALUE", value: "value" },
        { text: "功能描述", value: "description" },
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
      addFormVisible: false,
      editFormVisible: false,
      title: ""
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
      getRolePageList(searchData)
        .then(res => {
          if (res.code === "200") {
            this.desserts = res.data.records;
            this.pagination.page = res.data.currentPage;
            this.pagination.rowsPerPage = res.data.pageSize;
            this.pagination.totalItems = res.data.total;
          } else {
            this.$swal.fire({
              text: "拉取角色列表失败",
              icon: "error",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
        .catch(e => {
          this.$swal.fire({
            text: e.message,
            icon: "error",
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
    refresh(obj) {
      this.$axios.$request(getRolePageList(obj)).then(res => {
        this.desserts = res.data.records;
        this.pagination.page = res.data.currentPage;
        this.pagination.rowsPerPage = res.data.pageSize;
        this.pagination.totalItems = res.data.total;
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
    handleCancelAdd() {
      this.addFormVisible = false;
    },
    handleCancelEdit() {
      this.editFormVisible = false;
    },
    handleAdd() {
      this.addFormVisible = true;
    },
    handleEdit(row) {
      this.editFormVisible = true;
      this.row = { ...row };
    },
    handleDelete(row) {
      this.$swal
        .fire({
          title: "确定要删除吗？",
          text: "一旦删除，该角色下的用户都无法使用",
          icon: "warning",
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            this.$axios
              .$request(deleteRole(row.id))
              .then(res => {
                this.loading = false;
                if (res.code === "200" && res.data) {
                  this.$swal.fire({
                    title: "删除成功",
                    text: "该角色已经安全删除",
                    icon: "success"
                  });
                  this.refresh();
                } else {
                  this.$swal.fire({
                    title: "删除失败",
                    text: res.message,
                    icon: "error"
                  });
                }
              })
              .catch(e => {
                this.loading = false;
                this.$swal.fire({
                  text: e.message,
                  icon: "error",
                  toast: true,
                  position: "top",
                  showConfirmButton: false,
                  timer: 3000
                });
              });
          }
        });
    },
    handleDeleteSelected(selected) {
      const param = selected.map(s => s.id);
      if (param.length > 0) {
        this.$swal
          .fire({
            title: "确定要删除吗？",
            text: "一旦删除，所选角色下的用户都无法使用",
            icon: "warning",
            showCancelButton: true
          })
          .then(result => {
            if (result.value) {
              this.$axios.$request(deleteRoleBatch(param)).then(res => {
                if (res.code === "200" && res.data) {
                  this.$swal.fire({
                    title: "删除成功",
                    text: "所选用户已经被封禁",
                    icon: "success"
                  });
                  this.refresh();
                } else {
                  this.$swal.fire({
                    title: "删除失败",
                    text: res.message,
                    icon: "error"
                  });
                }
              });
            }
          });
      } else {
        this.$swal.fire({
          title: "无法删除！",
          text: "请至少选择一条需要删除的角色！",
          icon: "warning"
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
</style>
