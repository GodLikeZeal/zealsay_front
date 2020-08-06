const Menu = [
  { header: '监控' },
  {
    title: '桌面看板',
    group: 'apps',
    icon: 'mdi-monitor-dashboard',
    href: '/admin/dashboard'
  },
  { header: '用户' },
  {
    title: '用户管理',
    group: 'user',
    icon: 'mdi-account-tie',
    items: [
      {
        name: 'list',
        title: '用户列表',
        component: 'userlist',
        href: '/admin/user/list'
      },
      {
        name: 'add',
        title: '用户添加',
        component: 'useradd',
        href: '/admin/user/add'
      }
    ]
  },
  {
    title: '角色管理',
    group: 'role',
    icon: 'mdi-account-supervisor',
    items: [
      {
        name: 'list',
        title: '角色列表',
        component: 'rolelist',
        href: '/admin/role/list'
      }
    ]
  },
  { header: '资源' },
  {
    title: '资源管理',
    group: 'article',
    icon: 'mdi-book-open-page-variant',
    items: [
      {
        name: 'write',
        title: '写文章',
        component: 'articleadd',
        href: '/admin/article/add'
      },
      {
        name: 'list',
        title: '文章列表',
        component: 'articlelist',
        href: '/admin/article/list'
      },
      {
        name: 'menu',
        title: '分类目录',
        component: 'category',
        href: '/admin/article/category'
      },
      {
        name: 'label',
        title: '标签云管理',
        component: 'label',
        href: '/admin/article/label'
      }
    ]
  },
  { header: '资讯' },
  {
    title: '博客展示',
    group: 'blog',
    icon: 'mdi-heart',
    items: [
      {
        name: 'landing',
        title: 'landing首页',
        component: 'article',
        href: '/'
      },
      {
        name: 'about',
        title: 'about页',
        component: 'articlelist',
        href: '/blog/about'
      },
      {
        name: 'friend',
        title: '友链展示',
        component: 'category',
        href: '/admin/article/category'
      }
    ]
  },
  { header: '配置' },
  {
    title: '友链管理',
    group: 'article',
    icon: 'mdi-link-variant',
    items: [
      {
        name: 'write',
        title: '友链列表',
        component: 'friendlist',
        href: '/admin/friendlink/list'
      },
      {
        name: 'write',
        title: '友链添加',
        component: 'friendadd',
        href: '/admin/friendlink/add'
      }
    ]
  },
  {
    title: '系统设置',
    group: 'article',
    icon: 'mdi-settings',
    items: [
      {
        name: 'write',
        title: '站点配置',
        component: 'settingcommon',
        href: '/admin/setting/common'
      },
      {
        name: 'author',
        title: 'Owner',
        component: 'settingauthor',
        href: '/admin/setting/author'
      },
      {
        name: 'pageabout',
        title: '关于页面',
        component: 'settingabout',
        href: '/admin/setting/about'
      },
      {
        name: 'dict',
        title: '数据字典',
        component: 'settingdict',
        href: '/admin/setting/dict'
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
]
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    // item.items.sort((x, y) => {
    //   const textA = x.name.toUpperCase();
    //   const textB = y.name.toUpperCase();
    //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    // });
  }
})

export default Menu
