<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="con">
    <v-container>
      <v-layout row wrap @keyup.enter="search">
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="searchData.title"
            label="Solo"
            placeholder="文章标题"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="searchData.label"
            label="Solo"
            placeholder="标签关键字"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="searchData.authorName"
            label="Solo"
            placeholder="作者名称"
            solo
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-menu
            v-model="startmenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="searchData.startDate"
                label="创建时间检索开始时间"
                prepend-icon="event"
                readonly
                solo
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="searchData.startDate"
              @input="startmenu = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-menu
            v-model="endmenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="searchData.endDate"
                label="创建时间检索结束时间"
                prepend-icon="event"
                readonly
                solo
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="searchData.endDate"
              @input="endmenu = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-select
            v-model="searchData.categoryId"
            solo
            :items="category"
            item-text="text"
            item-value="value"
            label="请选择分类目录"
            required
          ></v-select>
        </v-flex>
        <v-flex xs6 sm2 md1>
          <v-btn color="info" @click="search"
            >搜索 <br />
            <v-icon small>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs6 sm2 md1>
          <v-btn color="success" title="添加" @click="handleAdd">
            添加 <br />
            <v-icon small>add</v-icon>
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
      <template v-slot:item.coverImage="{ item }">
        <v-img
          height="32px"
          width="32px"
          aspect-ratio="1.0"
          :lazy-src="item.coverImage"
          :src="item.coverImage"
          alt="avatar"
        ></v-img>
      </template>
      <template v-slot:item.title="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <div class="limit-width text-truncate" v-on="on">
              {{ item.title }}
            </div>
          </template>
          {{ item.title }}
        </v-tooltip>
      </template>
      <template v-slot:item.subheading="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <div class="limit-width text-truncate" v-on="on">
              {{ item.subheading }}
            </div>
          </template>
          {{ item.subheading }}
        </v-tooltip>
      </template>
      <template v-slot:item.status="{ item }">
        <span v-if="item.status == 'FORMAL'" class="text-success">
          发布 <v-icon color="success" small>important_devices</v-icon>
        </span>
        <span v-if="item.status == 'DRAFT'" class="text-warning">
          草稿 <v-icon color="warning" small>speaker_notes</v-icon>
        </span>
        <span v-if="item.status == 'DOWN'" class="text-error">
          下架<v-icon color="error" small>trending_down</v-icon>
        </span>
      </template>
      <template v-slot:item.openness="{ item }">
        <span v-if="item.openness == 'ALL'" class="text-success">
          所有人 <v-icon color="success" small>visibility</v-icon>
        </span>
        <span v-if="item.openness == 'SELFONLY'" class="text-info">
          仅自己 <v-icon color="info" small>visibility_off</v-icon>
        </span>
      </template>
      <template v-slot:item.label="{ item }">
        <div class="limit-width">
          <v-chip
            v-for="label in item.label ? item.label.split(',') : []"
            :key="label"
            :color="color[parseInt((label.length + 6) % 6)]"
            small
          >
            {{ label }}
          </v-chip>
        </div>
      </template>
      <template v-slot:item.label="{ item }">
        <div class="limit-width">
          <v-chip
            v-for="label in item.label ? item.label.split(',') : []"
            :key="label"
            :color="color[parseInt((label.length + 6) % 6)]"
            small
          >
            {{ label }}
          </v-chip>
        </div>
      </template>
      <template v-slot:item.createDate="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <div class="limit-width text-truncate" v-on="on">
              {{ item.createDate }}
            </div>
          </template>
          {{ item.createDate }}
        </v-tooltip>
      </template>
      <template v-slot:item.command="{ item }">
        <v-layout justify-center class="mb-2">
          <v-btn
            icon
            text
            color="primary"
            title="预览"
            :to="'/blog/' + item.id"
            target="_Blank"
          >
            <v-icon>portrait</v-icon>
          </v-btn>
          <v-btn
            icon
            text
            color="primary"
            title="编辑"
            @click="handleEdit(item)"
          >
            <v-icon>create</v-icon>
          </v-btn>
          <v-btn icon text color="primary" title="上架" @click="handleUp(item)">
            <v-icon>trending_up</v-icon>
          </v-btn>
          <v-btn
            icon
            text
            color="primary"
            title="下架"
            @click="handleDown(item)"
          >
            <v-icon>trending_down</v-icon>
          </v-btn>
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
  </div>
</template>
<script>
import {
  getArticlePageList,
  getCategoryList,
  markArticleDown,
  markArticleUp
} from "@/api/article";

export default {
  name: "User",
  layout: "admin",
  data() {
    return {
      searchData: {},
      selected: [],
      loading: true,
      headers: [
        { text: "封面", value: "coverImage" },
        { text: "标题", value: "title" },
        { text: "副标题", value: "subheading" },
        { text: "状态", value: "status" },
        { text: "公开度", value: "openness" },
        // { text: "标签", value: "label" },
        { text: "分类目录", value: "categoryName" },
        { text: "作者", value: "authorName" },
        { text: "创建时间", value: "createDate" },
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
      categoryLoading: false,
      title: "",
      category: [],
      startmenu: false,
      endmenu: false,
      color: ["primary", "secondary", "success", "info", "warning", "danger"]
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
    getCategoryList()
      .then(res => {
        if (res.code === "200") {
          let categorys = [];
          const de = {};
          de.text = "请选择分类目录";
          de.value = "";
          categorys.push(de);
          for (let i = 0; i < res.data.length; i++) {
            const re = {};
            re.text = res.data[i].name;
            re.value = res.data[i].id;
            categorys.push(re);
          }
          this.category = categorys;
        } else {
          this.$swal({
            text: res.message,
            type: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
      .catch(() => {
        this.$swal({
          text: "拉取文章分类失败",
          type: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      })
      .finally(() => {
        this.categoryLoading = false;
      });
  },
  methods: {
    search() {
      this.loading = true;
      const searchData = this.searchData;
      searchData.pageSize = this.pagination.rowsPerPage;
      searchData.pageNumber = this.pagination.page;
      getArticlePageList(searchData)
        .then(res => {
          if (res.code === "200") {
            this.desserts = res.data.records;
            this.pagination.page = res.data.currentPage;
            this.pagination.rowsPerPage = res.data.pageSize;
            this.pagination.totalItems = res.data.total;
          } else {
            this.$swal({
              text: "拉取文章列表失败",
              type: "error",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
        .catch(e => {
          this.categoryLoading = false;
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
    handleAdd() {
      this.$router.push({ path: "/admin/article/add" });
    },
    handleEdit(row) {
      this.formVisible = true;
      this.$router.push({ path: "/admin/article/edit", query: { id: row.id } });
    },
    handleCancel() {
      this.formVisible = false;
    },
    handleInfo(row) {
      this.row = { ...row };
      this.$swal({
        title: "操作成功!",
        text: "预览功能正在开发中，别急嘛",
        type: "success"
      });
      // this.$dialog.show(info, {row: row, width: 600})
    },
    handleDown(row) {
      this.$swal({
        title: "确定要下架吗？",
        text: "一旦下架，用户无法查看到当前文章作品",
        type: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          markArticleDown(row.id).then(res => {
            if (res.code === "200" && res.data) {
              this.$swal({
                title: "操作成功!",
                text: "该文章作品已经被下架",
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
    handleUp(row) {
      this.$swal({
        title: "确定要上架吗？",
        text: "将该资源从下架状态改成正常状态，用户可正常浏览该文章作品",
        type: "warning",
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          markArticleUp(row.id).then(res => {
            if (res.code === "200" && res.data) {
              this.$swal({
                title: "操作成功!",
                text: "该文章作品已经成功上架",
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
}

.text-info {
  color: #00d3ee;
  font-weight: bold;
}

.text-error {
  color: #dc6752;
  font-weight: bold;
}

.text-warning {
  color: #dca173;
  font-weight: bold;
}

.col {
  padding: 0 12px !important;
}

.pagination {
  margin: 20px;
}

.limit-width {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: initial;
}
</style>
