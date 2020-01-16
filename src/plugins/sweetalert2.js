import Vue from "vue";
import Swal from "sweetalert2";

Swal.argsToParams({
  heightAuto: false,
  grow: true,
  confirmButtonClass:
    "v-btn btn-alert v-btn--depressed v-btn--flat v-btn--outlined v-btn--round theme--light v-size--small text-primary text--darken-1",
  confirmButtonText: "确定",
  cancelButtonClass:
    "v-btn btn-alert v-btn--depressed v-btn--flat v-btn--outlined v-btn--round theme--light v-size--small darken-1--text",
  cancelButtonText: "取消"
});

Vue.swal = Swal;
// 添加实例方法
Vue.prototype.$swal = Swal;
// Vue.use();
