<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://pan.zealsay.com/2019091615686216710547.png" alt="Vue logo"></a></p>

<p align="center">

 ![nuxt 2.9.2](https://img.shields.io/badge/nuxt-2.9.2-ff69b4.svg)
 ![vuetify 1.5.7](https://img.shields.io/badge/vuetify-1.5.7-blueviolet.svg)
 ![License MPL-2.0](https://img.shields.io/badge/license-MPL--2.0-green.svg)  [![Build Status](https://travis-ci.com/GodLikeZeal/zealsay_front.svg?branch=master)](https://travis-ci.com/GodLikeZeal/zealsay_front) [![](https://img.shields.io/docker/stars/zealsay/zealsay_front.svg)](https://hub.docker.com/r/zealsay/zealsay_front 'DockerHub') [![](https://img.shields.io/docker/pulls/zealsay/zealsay_front.svg)](https://hub.docker.com/r/zealsay/zealsay_front 'DockerHub') [![](https://img.shields.io/github/downloads/GodLikeZeal/zealsay_front/total.svg)](https://img.shields.io/github/downloads/GodLikeZeal/zealsay_front/total 'Github')
 
 </p>
 
 ------
## 开发指南
请参考 [开发文档](https://docs.zealsay.com)

## 介绍
   zealsay是一套前后端分离的快速开发脚手架，后台采用的是最新的`Spring Boot 2.1.6.RELEASE`最新版本，
   前端使用vue,搭载比较火热的`nuxt.js`服务器端渲染框架，截止到目前,使用的是`nuxt.js`最新`2.8.1`版本,
   使用`Vuetify`构造出符合 `Material Design` 规范的扁平化风格主题UI,你有对美的偏爱,我同样有一份对美的执着,
   面对日趋多样化的技术,抽取一些常用的解决方案,以快,轻为主,打造出一个开箱即用的轻应用脚手架,助力中小企业解决
   快速部署以及持续交付的`DevOps`,本项目为zealsay前端项目，后台项目地址为[zealsay_backend](https://github.com/GodLikeZeal/zealsay_backend)
## 技术选型
  
### zealsay_front（前端项目）
- Vue (前端炙手可热的三大框架之一)
- Nuxt (vue服务端渲染框架)
- Vuetify (基于Material Design风格规范优美的主题)
- Vuex (全局状态管理)
- nuxtjs/auth (登录授权)
- nuxtjs/axios (axios请求)
- eslint (格式化)
- less (less样式语法)
- sass (sass样式语法)
- stylus (stylus样式语法)
- vue-chartist (表格插件)
- mdi/font (字体插件)
- sweetalert2 (优美的弹窗)
- vue-cropper (图片裁剪)
- vuetify-dialog (对话框)
- mavon-editor (md编辑器)
- travis ci (自动化ci)
- docker (容器服务)

## 系统架构

这里是架构图

## 本地如何运行
本地运行可以有两种方式,可以使用传统的运行nodejs应用程序 npm run dev 形式,
如果你本地安装了docker环境的话，也可以使用docker run的方式,
当然如果你安装了docker-compose,使用编排的方式更简洁直观,用哪种方式运行取决于你的个人喜好。

### 使用传统方式
#### 运行依赖
1.  确保本地安装node.js 8.0版本或以上。
2.  安装vue-cli 3.0脚手架。(非必须)
3.  安装git环境。
#### 代码检出
`git clone https://github.com/GodLikeZeal/zealsay_front.git`
将代码clone到你的本地。
#### 配置
-  配置代理
```javascript
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: 'https://api.zealsay.com', // 生产环境打开
    // https: true, // 开启https
    prefix: '/app/', // 给路径加个前缀
    proxy: true, // Can be also an object with default options
    credentials: true, // 表示跨域请求时候是否需要携带凭证
    retry: { retries: 3 }, // 超时重试3次
    progress: true, // 请求的时候是否加载loading页面
    debug: true // 开启调试，线上关闭
  },

  proxy: {
    '/app/': {
      // target: 'https://xxx.xxx.com', // 目标接口域名
      target: 'http://localhost:8090', // 目标接口域名
      changeOrigin: true, // 是否跨域
      pathRewrite: { '^/app/': '' } // 把/api 替换成 /
    }
  },
```


#### 启动项目


``` bash
# 安装依赖
$ npm install

# 启动项目 默认端口 localhost:3000
$ npm run dev

# build项目的话可以执行
$ npm run build
$ npm start

# 生成静态文件
$ npm run generate
```
### zealsay blog
基于zealsay快应用框架构建的博客系统,包含一个blog前端和对应的后台管理系统,为简约,美观和高性能而生。已实现部分功能,项目目前仍在开发中。
#### 在线预览
[项目在线预览地址](https://blog.zealsay.com)
#### TODO LIST
*  登录模块
* [x] 用户名密码登录 
* [x] Github第三方登录 
* [ ] <s>微信第三方登录[个人难申请] </s>
* [x] QQ第三方登录 
* [x] 登录背景动态气泡效果
*  用户模块
* [x] 后台用户列表条件搜索
* [x] 后台用户添加,删除
* [x] 后台用户修改
* [x] 后台用户详情
* [x] 后台用户封禁解封
* [ ] 个人中心(blog端和后台)
* [ ] 用户等级level以及称号
*  角色模块
* [x] 角色列表
* [x] 角色添加,删除
* [x] 角色修改
* [x] 角色详情
*  文章模块
* [x] 文章列表条件搜索
* [x] 文章添加,删除
* [x] 文章修改
* [x] 文章预览
* [x] 文章上下架
* [x] blog端首页文章列表
* [x] blog端根据类型搜索文章列表
* [x] blog端根据标签label搜索文章列表
* 标签云模块
* [x] 标签列表条件搜索
* [x] 标签添加,删除
* [x] blog端标签云展示
* [x] blog端标签云动态气泡效果
* 分类目录模块
* [x] 分类目录树
* [x] 分类目录添加,删除
* [x] 分类目录修改
* 其他模块
* [x] 图片上传到服务器
* [x] 图片裁剪
* [x] sweetalert2弹窗样式自定义
* [ ] 解决sweetalert2弹窗按钮颜色不能马上生效
* [x] 增加markdown编辑器
* [x] 首页鼠标hover图片变大动画效果
* [ ] 博客端文章增加点赞功能
* [ ] 博客端文章增加浏览量功能
* [x] 博客端关于页面，个人信息展示
* [ ] 博客端评论系统
* [ ] 用户自定义站点资源，如站点名称,meta,以及seo优化等
* [x] 博客端友链页面card展示
* [ ] 后台dashboard流量，访问统计以及最新动态
* [x] 页脚优化
* [ ] 文章浏览量展示
* [ ] 文章点赞/喜欢功能
* [ ] 文章分享转载功能
* [ ] 站点资源配置，如站点名称，meta以及seo等
* [x] 博客端标签云气泡展示
### 反馈
欢迎大家在使用的过程中提出宝贵的意见和反馈问题，也可以直接提issue。
### 交流群
* 欢迎加入zealsay交流群一起交流和学习

<img src="https://pan.zealsay.com/20190716214941558000000.jpg" alt="Sample"  width="150" height="200">

### 鸣谢

- :kissing_heart::kissing_heart:感谢前端大佬[jinjinyike](https://github.com/jinjinyike)的顾问级别的帮助。
- :heart::heart:兜兜里有糖。
- 作为一位后台开发者,接触前端时间不长，熟悉了vue后，便使用nuxt.js来开发此项目,刚使用nuxt,踩了不少坑,更多关于nuxt文档,可以访问 [Nuxt.js docs](https://nuxtjs.org).
