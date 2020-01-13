export default [
  {
    path: "*",
    meta: {
      public: true
    },
    redirect: {
      path: "/404"
    }
  },
  {
    path: "/404",
    meta: {
      public: true
    },
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/404.vue`
      )
  },
  {
    path: "/403",
    meta: {
      public: true
    },
    name: "AccessDenied",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/Deny.vue`
      )
  },
  {
    path: "/500",
    meta: {
      public: true
    },
    name: "ServerError",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/500.vue`
      )
  },
  {
    path: "/login",
    meta: {
      public: true
    },
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/login.vue`
      )
  },
  {
    path: "/register",
    meta: {
      public: true
    },
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/register.vue`
      )
  },
  {
    path: "/confirm",
    meta: {
      public: true
    },
    name: "confirm",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/confirm.vue`
      )
  },
  {
    path: "/test",
    meta: {
      public: true
    },
    name: "test",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/test.vue`
      )
  },
  {
    path: "/",
    meta: { public: true },
    name: "home",
    title: "主页",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/index.vue`
      )
  },
  {
    path: "/admin/dashboard",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "dashboard",
    title: "桌面",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/dashboard.vue`
      )
  },
  {
    path: "/admin/user/list",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "userlist",
    title: "用户列表",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/user/list/index.vue`
      )
  },
  {
    path: "/admin/user/add",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "useradd",
    title: "用户添加",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/user/add/index.vue`
      )
  },
  {
    path: "/admin/role/list",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "rolelist",
    title: "角色列表",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/role/list/index.vue`
      )
  },
  {
    path: "/admin/article/add",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "articleadd",
    title: "写文章",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/article/add/index.vue`
      )
  },
  {
    path: "/admin/article/edit",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "articleedit",
    title: "修改文章",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/article/edit/index.vue`
      )
  },
  {
    path: "/admin/article/list",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "articlelist",
    title: "文章列表",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/article/list/index.vue`
      )
  },
  {
    path: "/admin/article/category",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "category",
    title: "分类目录",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/article/category/index.vue`
      )
  },
  {
    path: "/admin/article/label",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "label",
    title: "标签云管理",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/article/label/index.vue`
      )
  },
  {
    path: "/admin/friendlink/list",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "friendlinklist",
    title: "友链列表",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/friendlink/list/index.vue`
      )
  },
  {
    path: "/admin/friendlink/add",
    meta: { breadcrumb: true, roles: ["ADMIN"] },
    name: "friendlinkadd",
    title: "友链添加",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/admin/friendlink/add/index.vue`
      )
  },
  {
    path: "/blog/about",
    meta: { public: true },
    name: "about",
    title: "关于",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/blog/about/index.vue`
      )
  },
  {
    path: "/blog/category/:id",
    meta: { public: true },
    name: "blogcategory",
    title: "分类博客",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/blog/category/index.vue`
      )
  },
  {
    path: "/blog/friend",
    meta: { public: true },
    name: "blogfriend",
    title: "友链",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/blog/friend/index.vue`
      )
  },
  {
    path: "/blog/label/:name",
    meta: { public: true },
    name: "bloglabel",
    title: "标签博客",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/blog/label/index.vue`
      )
  },
  {
    path: "/blog/:id",
    meta: { public: true },
    name: "blog",
    title: "文章详情",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/blog/index.vue`
      )
  },
  {
    path: "/user/:id",
    meta: { public: true },
    name: "userinfo",
    title: "个人中心",
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        /* webpackMode: "lazy-once" */
        `@/views/user/index.vue`
      )
  }
];
