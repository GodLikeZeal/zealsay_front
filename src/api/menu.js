const Menu = [
  { header: "看板动态" },
  {
    title: "桌面看板",
    group: "apps",
    icon: "mdi-monitor-dashboard",
    href: "/admin/dashboard"
  },
  { header: "用户权限" },
  {
    title: "用户管理",
    group: "user",
    icon: "mdi-account-tie",
    items: [
      {
        name: "list",
        title: "用户列表",
        component: "userlist",
        href: "/admin/user/list"
      },
      {
        name: "add",
        title: "用户添加",
        component: "useradd",
        href: "/admin/user/add"
      }
    ]
  },
  {
    title: "角色管理",
    group: "role",
    icon: "mdi-account-supervisor",
    items: [
      {
        name: "list",
        title: "角色列表",
        component: "rolelist",
        href: "/admin/role/list"
      }
    ]
  },
  { header: "站点资源" },
  {
    title: "文章",
    group: "article",
    icon: "mdi-book-open-page-variant",
    items: [
      {
        name: "write",
        title: "写文章",
        component: "articleadd",
        href: "/admin/article/add"
      },
      {
        name: "list",
        title: "文章列表",
        component: "articlelist",
        href: "/admin/article/list"
      },
      {
        name: "menu",
        title: "分类目录",
        component: "category",
        href: "/admin/article/category"
      },
      {
        name: "label",
        title: "标签云管理",
        component: "label",
        href: "/admin/article/label"
      }
    ]
  },
  { header: "站点配置" },
  {
    title: "站点主体",
    group: "article",
    icon: "mdi-home-circle",
    items: [
      {
        name: "write",
        title: "基本信息",
        component: "articleadd",
        href: "/admin/article/add"
      },
      {
        name: "list",
        title: "SEO配置",
        component: "articlelist",
        href: "/admin/article/list"
      },
      {
        name: "write",
        title: "对象云存储配置",
        component: "articleadd",
        href: "/admin/article/add"
      },
      {
        name: "write",
        title: "第三方登录配置",
        component: "articleadd",
        href: "/admin/article/add"
      }
    ]
  },
  {
    title: "友链管理",
    group: "article",
    icon: "mdi-link-variant",
    items: [
      {
        name: "write",
        title: "友链列表",
        component: "friendlist",
        href: "/admin/friendlink/list"
      },
      {
        name: "write",
        title: "友链添加",
        component: "friendadd",
        href: "/admin/friendlink/add"
      }
    ]
  }
  // {
  //   title: '媒体',
  //   group: 'media',
  //   icon: 'panorama',
  //   items: [
  //     {
  //       name: 'list',
  //       title: '媒体库',
  //       component: 'Dashboard',
  //       href: '/admin/dashboard'
  //     },
  //     {
  //       name: 'write',
  //       title: '添加',
  //       component: 'Dashboard',
  //       href: '/admin/dashboard'
  //     }
  //   ]
  // }
];
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    // item.items.sort((x, y) => {
    //   const textA = x.name.toUpperCase();
    //   const textB = y.name.toUpperCase();
    //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    // });
  }
});

export default Menu;
