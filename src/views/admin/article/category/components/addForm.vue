<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card ref="row">
      <v-card-title>
        <h5>在 {{ selected.name }} 下添加</h5>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="form.name"
                  persistent-hint
                  :rules="usernameRules"
                  hint="用于区分博客的分类目录"
                  label="分类名称"
                  required
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.alias"
                  persistent-hint
                  :rules="aliasRules"
                  hint="别名，用于URL上展示更优雅，可以为小写字母加上“-”"
                  label="alias"
                  required
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="form.description"
                  persistent-hint
                  label="描述"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="darken-1" @click="handleCancel">取消</v-btn>
        <v-btn
          outlined
          :loading="loading"
          color="primary darken-1"
          @click="handleSubmit"
          >提交</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validateAlias, validateUsername } from "@/util/validate";
import { addCategory } from "@/api/article";

export default {
  name: "Add",
  props: {
    alert: {
      type: Boolean,
      default: function() {
        return {};
      }
    },
    parentId: {
      type: Object,
      default: function() {
        return {};
      }
    },
    selected: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data: () => ({
    name: "add",
    loading: false,
    form: {},
    usernameRules: [
      v => !!v || "分类名称不能为空!",
      v => (v && v.length <= 8) || "分类名称不能超过8个字符",
      v => validateUsername(v) || "必须是中文、英文、数字包括下划线"
    ],
    aliasRules: [
      v => !!v || "密码不能为空!",
      v => validateAlias(v) || "必须是小写字母或者“-”"
    ]
  }),
  computed: {
    dialog: {
      get: function() {
        return this.alert;
      },
      set: function() {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit("handleCancel");
    },
    handleSubmit() {
      this.loading = true;
      // 开始提交
      if (this.$refs.form.validate()) {
        this.form.parentId = this.parentId;
        addCategory(this.form)
          .then(res => {
            this.loading = false;
            if (res.code === "200" && res.data) {
              this.$swal({
                text: "添加成功",
                type: "success",
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000
              });
              this.$parent.refresh();
              this.$emit("handleCancel");
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
          .catch(e => {
            this.loading = false;
            this.$swal({
              text: e.message,
              type: "error",
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
            });
          });
      }
      this.loading = false;
    }
  }
};
</script>
