<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://pan.zealsay.com/2019091615686216710547.png" alt="Vue logo"></a></p>

<p align="center">

 ![vue 1.0](https://img.shields.io/badge/vue-1.0-brightgreen.svg)
 ![vuetify 2.0](https://img.shields.io/badge/vuetify-2.0-blueviolet.svg)
 ![License MPL-2.0](https://img.shields.io/badge/license-MPL--2.0-green.svg)  [![Build Status](https://travis-ci.com/GodLikeZeal/zealsay_front.svg?branch=master)](https://travis-ci.com/GodLikeZeal/zealsay_front) [![](https://img.shields.io/docker/stars/zealsay/zealsay_front.svg)](https://hub.docker.com/r/zealsay/zealsay_front 'DockerHub') [![](https://img.shields.io/docker/pulls/zealsay/zealsay_front.svg)](https://hub.docker.com/r/zealsay/zealsay_front 'DockerHub') [![](https://img.shields.io/github/downloads/GodLikeZeal/zealsay_front/total.svg)](https://img.shields.io/github/downloads/GodLikeZeal/zealsay_front/total 'Github')
 
 </p>
 
 ------
## 开发指南
请参考 [开发文档](https://docs.zealsay.com)
### 注意：原先的nuxt版本已经移到 [zealsay_web](https://github.com/GodLikeZeal/zealsay_web),
由于最新nuxt和vuetify2.0整合有些问题，官方也没有很好的解决，因此暂时放弃使用nuxt，ssr部分改用局部渲染来完成。

## 介绍
   zealsay是一套前后端分离的快速开发脚手架，后台采用的是最新的`Spring Boot 2.1.6.RELEASE`最新版本，
   前端使用`vue`并且使用最新`vue cli 3.0`脚手架搭建,搭载`Vuetify 2.0`构造出符合 `Material Design` 
   规范的扁平化风格主题UI,你有对美的偏爱,我同样有一份对美的执着,面对日趋多样化的技术,抽取一些常用的解决方案,
   以快,轻为主,打造出一个开箱即用的轻应用脚手架,助力中小企业解决快速部署以及持续交付的`DevOps`,本项目为zealsay前端项目，
   后台项目地址为[zealsay_backend](https://github.com/GodLikeZeal/zealsay_backend)
## 技术选型
  
### zealsay_front（前端项目）
- Vue (前端炙手可热的三大框架之一)
- Vuetify (基于Material Design风格规范优美的主题)
- Vuex (全局状态管理)
- Vue-Router (路由管理)
- axios (axios请求)
- eslint (格式化)
- less (less样式语法)
- sass (sass样式语法)
- vue-chartist (表格插件)
- mdi/font (mdi字体和图标)
- sweetalert2 (优美的弹窗)
- vue-cropper (图片裁剪)
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
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8090",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "api"
        }
      }
    }
  }
```


#### 启动项目


``` bash
# 安装依赖
$ npm install

# 启动项目 默认端口 localhost:8080
$ npm run serve

# build项目的话可以执行
$ npm run build

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
* [x] 个人中心(blog端和后台)
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
* [x] 解决sweetalert2弹窗按钮颜色不能马上生效
* [x] 增加markdown编辑器
* [x] 首页鼠标hover图片变大动画效果
* [x] 博客端文章增加点赞功能
* [x] 博客端文章增加浏览量功能
* [x] 博客端关于页面，个人信息展示
* [ ] 博客端评论系统 [即将支持]
* [ ] 用户自定义站点资源，如站点名称,meta,以及seo优化等 [即将支持]
* [x] 博客端友链页面card展示
* [ ] 后台dashboard流量，访问统计以及最新动态
* [x] 页脚优化
* [x] 文章浏览量展示
* [x] 文章点赞/喜欢功能
* [ ] 文章分享转载功能 [即将支持]
* [ ] 站点资源配置，如站点名称，meta以及seo等 [即将支持]
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
