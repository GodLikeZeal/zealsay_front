<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-container fill-height fluid grid-list-xl>
      <v-layout justify-center wrap>
        <v-flex xs12 md10>
          <material-card
            color="primary"
            title="文章目录管理"
            text="点击可展开,请选择要操作的目录"
          >
            <v-layout justify-space-between pa-3>
              <v-flex xs5>
                <v-treeview
                  :items="items"
                  :active.sync="active"
                  activatable
                  active-class="primary--text"
                  class="grey lighten-5"
                  :open.sync="open"
                  open-all
                  transition
                >
                  <template v-slot:prepend="{ item, active }">
                    <v-icon
                      v-if="!item.children"
                      :color="active ? 'primary' : ''"
                    >
                      mdi-account
                    </v-icon>
                  </template>
                </v-treeview>
              </v-flex>
              <v-flex d-flex text-xs-center>
                <v-scroll-y-transition mode="out-in">
                  <v-card class="pt-4 mx-auto" flat max-width="400">
                    <v-card-title>
                      <v-layout row wrap>
                        <v-flex xs12 sm6 md4>
                          <v-btn color="info" @click="handleAdd"
                            >添加 <br />
                            <v-icon small>add_circle</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-btn color="primary" @click="editSubmit(selected)"
                            >保存 <br />
                            <v-icon small>save</v-icon>
                          </v-btn>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-btn color="error" @click="handleDelete(selected)"
                            >删除 <br />
                            <v-icon small>remove_circle</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-container>
                      <v-layout wrap>
                        <v-form ref="form" lazy-validation>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              v-model="selected.name"
                              persistent-hint
                              :rules="usernameRules"
                              hint="用于区分博客的分类目录"
                              label="分类名称"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              v-model="selected.alias"
                              persistent-hint
                              :rules="aliasRules"
                              hint="别名，用于URL上展示更优雅，可以为小写字母加上“-”"
                              label="alias"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm12 md12>
                            <v-text-field
                              v-model="selected.description"
                              persistent-hint
                              label="描述"
                              outline
                            ></v-text-field>
                          </v-flex>
                        </v-form>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-scroll-y-transition>
              </v-flex>
            </v-layout>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div>
      <add-form
        :alert="addFormVisible"
        :parent-id="parentId"
        :selected="selected"
        @handleCancel="handleCancelAdd"
      ></add-form>
    </div>
  </div>
</template>

<script>
import addForm from './components/addForm'
import { getCategoryList, updateCategory, deleteCategory } from '@/api/article'
import { validateAlias, validateUsername } from '@/util/validate'

export default {
  name: 'Category',
  layout: 'admin',
  components: { addForm },
  data: () => ({
    addFormVisible: false,
    active: [],
    avatar: null,
    open: [],
    categorys: [],
    usernameRules: [
      v => !!v || '分类名称不能为空!',
      v => (v && v.length <= 8) || '分类名称不能超过8个字符',
      v => validateUsername(v) || '必须是中文、英文、数字包括下划线'
    ],
    aliasRules: [
      v => !!v || '密码不能为空!',
      v => validateAlias(v) || '必须是小写字母或者“-”'
    ]
  }),
  computed: {
    items() {
      return [
        {
          name: '分类目录',
          children: this.categorys
        }
      ]
    },
    selected() {
      if (!this.active.length)
        return {
          name: '',
          alias: ''
        }
      const id = this.active[0]
      if (id === undefined) {
        return {
          name: '分类目录',
          alias: 'alias'
        }
      }
      if (this.categorys.find(category => category.id === id) === undefined) {
        return {
          name: '分类目录',
          alias: 'alias'
        }
      }
      return this.categorys.find(category => category.id === id)
    },
    parentId() {
      if (!this.active.length) return {}
      return this.active[0]
    }
  },
  async asyncData({ app, query, error }) {
    const res = await app.$axios.$request(getCategoryList())
    if (res.code === '200') {
      const categorys = res.data
      return { categorys: categorys }
    } else {
      return error({ statusCode: res.code, message: res.message })
    }
  },
  methods: {
    refresh() {
      this.$axios
        .$request(getCategoryList())
        .then(res => {
          if (res.code === '200' && res.data) {
            this.categorys = res.data
          } else {
            this.$swal({
              text: res.message,
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
    },
    editSubmit(obj) {
      if (this.$refs.form.validate()) {
        this.$axios
          .$request(updateCategory(obj))
          .then(res => {
            if (res.code === '200' && res.data) {
              this.$swal({
                text: '修改成功',
                type: 'success',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000
              })
            } else {
              this.$swal({
                text: res.message,
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
      }
    },
    handleDelete(obj) {
      if (this.$refs.form.validate()) {
        const id = obj.id
        if (id === undefined) {
          this.$swal({
            text: '根目录无法删除',
            type: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })
          return
        }
        this.$axios
          .$request(deleteCategory(id))
          .then(res => {
            if (res.code === '200' && res.data) {
              this.$swal({
                text: '删除成功',
                type: 'success',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000
              })
              this.refresh()
            } else {
              this.$swal({
                text: res.message,
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
            this.refresh()
          })
      }
    },
    handleAdd() {
      this.addFormVisible = true
    },
    handleCancelAdd() {
      this.addFormVisible = false
    }
  }
}
</script>
