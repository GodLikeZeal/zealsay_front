import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";
// import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Meta from "vue-meta";

Vue.use(Router);
Vue.use(Meta);
const router = new Router({
  base: "/",
  mode: "history",
  linkActiveClass: "active",
  routes: paths,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
// router gards
router.beforeEach((to, from, next) => {
  // NProgress.start();
  next();
});

router.afterEach(() => {
  // ...
  // NProgress.done();
});

export default router;
