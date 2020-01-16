import "@/assets/styles/index.scss";

import Vue from "vue";
import "./plugins";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission"; // permission control
import vuetify from "./plugins/vuetify";

// Components
import "./components";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
}).$mount("#app");
