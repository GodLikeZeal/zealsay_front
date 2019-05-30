const Menu = [
  { header: '看板' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard'
  },
  { header: '用户' },
  {
    title: '用户管理',
    group: 'user',
    icon: 'group',
    items: [
      { name: 'list', title: '用户列表', component: 'userlist' },
      { name: 'add', title: '用户添加', component: 'useradd' }
    ]
  },
  {
    title: '角色管理',
    group: 'role',
    icon: 'people_outline',
    items: [{ name: 'list', title: '角色列表', component: 'rolelist' }]
  },
  { header: '站点资源' },
  {
    title: '文章',
    group: 'article',
    icon: 'book',
    items: [
      { name: 'write', title: '写文章', component: 'articleadd' },
      { name: 'list', title: '文章列表', component: 'articlelist' },
      { name: 'menu', title: '分类目录', component: 'category' },
      { name: 'label', title: '标签云管理', component: 'label' }
    ]
  },
  {
    title: '媒体',
    group: 'media',
    icon: 'panorama',
    items: [
      { name: 'list', title: '媒体库', component: 'Dashboard' },
      { name: 'write', title: '添加', component: 'Dashboard' }
    ]
  }
]
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    // item.items.sort((x, y) => {
    //   const textA = x.name.toUpperCase();
    //   const textB = y.name.toUpperCase();
    //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    // });
  }
})

export default Menu
