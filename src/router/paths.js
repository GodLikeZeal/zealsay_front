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
    component: resolve => require(["@/views/404.vue"], resolve)
  },
  {
    path: "/403",
    meta: {
      public: true
    },
    name: "AccessDenied",
    component: resolve => require(["@/views/403.vue"], resolve)
  },
  {
    path: "/500",
    meta: {
      public: true
    },
    name: "ServerError",
    component: resolve => require(["@/views/500.vue"], resolve)
  },
  {
    path: "/login",
    meta: {
      public: true
    },
    name: "login",
    component: resolve => require(["@/views/login.vue"], resolve)
  },
  {
    path: "/register",
    meta: {
      public: true
    },
    name: "register",
    component: resolve => require(["@/views/register.vue"], resolve)
  },
  {
    path: "/confirm",
    meta: {
      public: true
    },
    name: "confirm",
    component: resolve => require(["@/views/confirm.vue"], resolve)
  },
  {
    path: "/",
    meta: { public: true },
    name: "home",
    title: "主页",
    component: resolve => require(["@/views/index.vue"], resolve)
  },
  {
    path: "/admin/dashboard",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "dashboard",
    title: "桌面",
    component: resolve => require(["@/views//admin/dashboard.vue"], resolve)
  },
  {
    path: "/admin/user/list",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "userlist",
    title: "用户列表",
    component: resolve =>
      require(["@/views/admin/user/list/index.vue"], resolve)
  },
  {
    path: "/admin/user/add",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "useradd",
    title: "用户添加",
    component: resolve => require(["@/views/admin/user/add/index.vue"], resolve)
  },
  {
    path: "/admin/role/list",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "rolelist",
    title: "角色列表",
    component: resolve =>
      require(["@/views/admin/role/list/index.vue"], resolve)
  },
  {
    path: "/admin/article/add",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "articleadd",
    title: "写文章",
    component: resolve =>
      require(["@/views/admin/article/add/index.vue"], resolve)
  },
  {
    path: "/admin/article/edit",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "articleedit",
    title: "修改文章",
    component: resolve =>
      require(["@/views/admin/article/edit/index.vue"], resolve)
  },
  {
    path: "/admin/article/list",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "articlelist",
    title: "文章列表",
    component: resolve =>
      require(["@/views/admin/article/list/index.vue"], resolve)
  },
  {
    path: "/admin/article/category",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "category",
    title: "分类目录",
    component: resolve =>
      require(["@/views/admin/article/category/index.vue"], resolve)
  },
  {
    path: "/admin/article/label",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "label",
    title: "标签云管理",
    component: resolve =>
      require(["@/views/admin/article/label/index.vue"], resolve)
  },
  {
    path: "/admin/friendlink/list",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "friendlinklist",
    title: "友链列表",
    component: resolve =>
      require(["@/views/admin/friendlink/list/index.vue"], resolve)
  },
  {
    path: "/admin/friendlink/add",
    meta: { breadcrumb: true, layout: "admin", roles: ["ADMIN"] },
    name: "friendlinkadd",
    title: "友链添加",
    component: resolve =>
      require(["@/views/admin/friendlink/add/index.vue"], resolve)
  },
  {
    path: "/blog/about",
    meta: { public: true },
    name: "about",
    title: "关于",
    component: resolve => require(["@/views/blog/about/index.vue"], resolve)
  },
  {
    path: "/blog/category/:id",
    meta: { public: true },
    name: "blogcategory",
    title: "分类博客",
    component: resolve => require(["@/views/blog/category/index.vue"], resolve)
  },
  {
    path: "/blog/friend",
    meta: { public: true },
    name: "blogfriend",
    title: "友链",
    component: resolve => require(["@/views/blog/friend/index.vue"], resolve)
  },
  {
    path: "/blog/label/:name",
    meta: { public: true },
    name: "bloglabel",
    title: "标签博客",
    component: resolve => require(["@/views/blog/label/index.vue"], resolve)
  },
  {
    path: "/blog/:id",
    meta: { public: true },
    name: "blog",
    title: "文章详情",
    component: resolve => require(["@/views/blog/index.vue"], resolve)
  },
  {
    path: "/user/:id",
    meta: {},
    name: "userinfo",
    title: "个人中心",
    component: resolve => require(["@/views/user/index.vue"], resolve)
  },
  {
    path: "/user/blog/add",
    meta: {},
    name: "userblogadd",
    title: "写篇博客",
    component: resolve => require(["@/views/user/blog/add/index.vue"], resolve)
  },
  {
    path: "/user/blog/edit",
    meta: {},
    name: "userblogedit",
    title: "修改博客",
    component: resolve => require(["@/views/user/blog/edit/index.vue"], resolve)
  }
];
