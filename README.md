<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://pan.zealsay.com/2019091615686216710547.png" alt="Vue logo"></a></p>

<p align="center">

 ![vue 2.x](https://img.shields.io/badge/vue-2.x-brightgreen.svg)
 ![nuxt 2.12.2](https://img.shields.io/badge/nuxt-2.12.2-ff69b4.svg)
 ![vuetify 2.3.1](https://img.shields.io/badge/vuetify-2.3-1-blueviolet.svg)
 ![License MPL-2.0](https://img.shields.io/badge/license-MPL--2.0-green.svg)  [![Build Status](https://travis-ci.com/GodLikeZeal/zealsay_front.svg?branch=master)](https://travis-ci.com/GodLikeZeal/zealsay_front) [![](https://img.shields.io/docker/stars/zealsay/zealsay_front.svg)](https://hub.docker.com/r/zealsay/zealsay_front 'DockerHub') [![](https://img.shields.io/docker/pulls/zealsay/zealsay_front.svg)](https://hub.docker.com/r/zealsay/zealsay_front 'DockerHub') [![](https://img.shields.io/github/downloads/GodLikeZeal/zealsay_front/total.svg)](https://img.shields.io/github/downloads/GodLikeZeal/zealsay_front/total 'Github')
 
 </p>
 
 ------
## 开发指南
请参考 [zealsay开发文档](https://docs.zealsay.com)
本项目代码地址[github](https://github.com/GodLikeZeal/zealsay_front)，国内版[gitee](https://gitee.com/GodLikeZeal/zealsay_front)，喜欢的话，欢迎star。
## 介绍
   zealsay是一套前后端分离的快速开发脚手架，后台采用的是最新的`Spring Boot 2.1.6.RELEASE`最新版本，
   前端使用vue,搭载比较火热的`nuxt.js`服务器端渲染框架，截止到目前,使用的是`nuxt.js`最新`2.12.2`版本,
   使用`Vuetify 2.x`构造出符合 `Material Design` 规范的扁平化风格主题UI,你有对美的偏爱,我同样有一份对美的执着,
   面对日趋多样化的技术,抽取一些常用的解决方案,以快,轻为主,打造出一个开箱即用的轻应用脚手架,助力中小企业解决快速部署以及持续交付的`DevOps`。
   > 本项目以个人博客网站为示例，展示如何使用`zealsay`快速搭建一个漂亮的个人博客，前后端项目全部开源，此项目为zealsay前端项目，后台项目地址为: [github](https://github.com/GodLikeZeal/zealsay_backend)，国内[gitee](https://gitee.com/GodLikeZeal/zealsay_backend)，欢迎frok，发现bug或者有好的建议也欢迎issue。
#### 博客体验地址[博客首页](https://beta.zealsay.com)
#### 后台管理体验[后台管理首页](https://beta.zealsay.com/admin/dashboard) 体验账号用户名:visitor 密码：abc123
#### 后台管理登录[登录页面](https://beta.zealsay.com/login) 体验账号用户名:visitor 密码：abc123
#### api接口展示[api接口](https://dev-api.zealsay.com/doc.html) 授权用户名：zealsay 密码:api123456
### 欢迎来我的线上版博客水一波[zealsay博客](https://blog.zealsay.com)
 
-------
本项目会一直持续更新迭代，新功能正在马不停蹄更新，开发文档也正在不断的完善中...
## 技术选型
  
### zealsay_front（前端项目）
- Vue (前端炙手可热的三大框架之一)
- Vuetify (基于Material Design风格规范优美的主题)
- Vuex (全局状态管理)
- Vue-Router (路由管理)
- axios (axios请求)
- eslint (格式化)
- sass (sass样式语法)
- vue-chartist (表格插件)
- vue-scroll-reveal(滚动动画)
- vue-concise-slider(vue漂亮轮播)
- mdi/font (mdi字体和图标)
- sweetalert2 (优美的弹窗)
- vue-cropper (图片裁剪)
- mavon-editor (md编辑器)
- xss（防xss攻击）
- travis ci (自动化ci)
- docker (容器服务)

## 系统架构

![系统架构图](https://pan.zealsay.com/mweb/2020061915925585465233.png)


## 快速部署
有两种方式可以来搭建，分别为传统方式和docker容器方式

-------

### 1.docker容器方式部署
- 先决条件：
1. 你得有一台安装了docker的主机或者服务器。
2. 你得安装docker-compose容器编排利器
3. 确保你的服务器安全组开放了mysql,redis还有服务app的端口号访问

-------
好了废话不多说，直接上`docker-compose.yml`编排文件

```yml
version: "3.3"
services:
  zealsay_service:
    image: registry.cn-qingdao.aliyuncs.com/zealsay/zealsay_backend:latest  #国产私服更快，docker hub有时候不稳定
    container_name: zealsay_service
    expose:
      - 8090 #默认为8090
    environment:
      - VIRTUAL_HOST=xxx.xxx.xxx #改成你后台服务的域名,如 www.baidu.com
      - REDIS_HOST=redis #改成你redis的ip，此处为docker内部引用
      - REDIS_PORT=6379 #改成你redis的端口
      - REDIS_PASSWORD=your redis password #改成你redis的认证密码
      - MYSQL_HOST=mysql #改成你mysql的ip，此处为docker内部引用
      - MYSQL_USERNAME=username #改成你mysql的用户名
      - MYSQL_PASSWORD=password #改成你mysql的认证密码
      - MAIL_USERNAME=xxx@xxx.com #改成你发送系统邮件的邮箱
      - MAIL_PASSWORD=email password #改成你邮箱的密码
      - QINIU_DOMAIN=https://xxx.xxx.xxx/ #改成你七牛云域名,上传图片和文件用
      - QINIU_BUCKET=your bucket #改成你七牛云bucket
      - QINIU_ACCESSKEY=accesskey #改成你的七牛accesskey
      - QINIU_SECRETKEY=secretkey #改成你的secretkey
      - GITHUB_ID=123 #改成你的github授权client-id
      - GITHUB_SECRET=123 #改成你的github授权client-secret
      - GITHUB_URI=http://xxx.xxx.xxx/call/back #改成你的github授权redirect-uri
      - WEB_NAME=zealsay说你想说 #改成你的blog站点名称
      - WEB_DOMAIN=http://xxx.xxx.xxx/ #改成你的domain
      - API_USERNAME=username #swagger api访问用户名
      - API_PASSWORD=password #swagger api访问密码
    external_links: 
      - mysql
      - redis
  zealsay_web:
    image: registry.cn-qingdao.aliyuncs.com/zealsay/zealsay_front:latest
    container_name: zealsay_web
    expose:
      - 4000
    depends_on:
      - zealsay_service
    external_links: 
      - nginx-proxy-zealsay
    environment:
      - VIRTUAL_HOST=xxx.xxx.xxx #改成你的站点的域名,如www.baidu.com
      - VUE_APP_API_URL=https://xxx.xxx.xxx #改成你后台服务域名，跟上面的VIRTUAL_HOST保持一致
  redis:
    image: redis:5-alpine
    container_name: redis
    command: redis-server --requirepass dev_redis
    networks:
      - default
    ports:
      - "6379:6379"
    volumes:
      - redis_conf:/usr/local/etc/redis
      - redis_data:/data
  mysql:
    image: mysql:5.7
    container_name: mysql
    ports:
      - "3306:3306"
      - "33060:33060"
    command: [
            '--character-set-server=utf8mb4',
            '--collation-server=utf8mb4_bin',
            '--default-time-zone=+8:00'
    ]
    networks:
      - default
    volumes:
      - mysql_data:/var/lib/mysql
      - mysql_conf:/etc/mysql/conf.d
    environment:
      - MYSQL_ROOT_PASSWORD=password #你数据库root用户的密码
      - MYSQL_DATABASE=zealsay #你zealsay项目的数据库
      - MYSQL_USER=user #创建一个mysql用户
      - MYSQL_PASSWORD=user password #你创建用户的密码

       # 以下是nginx反向代理服务的配置
  nginx-proxy:
    image: jwilder/nginx-proxy
    container_name: nginx-proxy-zealsay
    restart: always
    ports:
      - "80:80"
      - "443:443" # ssl 默认是443端口，因此需要将443端口映射到宿主机上
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro # 将宿主机的docker.sock绑定到nginx，这样，今后添加新的站点时，nginx将会自动发现站点并重启服务
      - certs:/etc/nginx/certs:ro # 将nginx中的证书目录，映射到宿主机中



# 配置一个公共外部网络来联通所有容器
networks:
  default:
    external:
      name: zealsay

volumes:
  redis_data:
  redis_conf:
  mysql_data:
  mysql_conf:
  certs: 

```
### 使用传统方式
#### 运行依赖
1. 确保本地安装node.js 8.0版本或以上。
2. 安装vue-cli 3.0脚手架。(非必须)
3. 安装git环境。
#### 代码检出
`git clone https://github.com/GodLikeZeal/zealsay_front.git`
将代码clone到你的本地。
#### 配置
- a. 更改配置
```javascript
  proxy: {
    '/app/': {
      // target: process.env.VUE_APP_API_URL, // 目标接口域名
      target: process.env.VUE_APP_API_URL || 'http://localhost:8090', // 目标接口域名,改成自己的后台服务
      changeOrigin: true, // 是否跨域
      pathRewrite: { '^/app/': '' } // 把/app 替换成 /
    }
  },
```
- b.或者运行时候传递 环境变量VUE_APP_API_URL，将`npm start`命令改成
`cross-env API_URL=https://xxx.xxx.xxx nuxt start`


#### 启动项目


``` bash
# 安装依赖
$ npm install

# 编译项目
$ npm run build

# start
$ npm run start

```
### zealsay blog
基于zealsay快应用框架构建的博客系统,包含一个blog前端和对应的后台管理系统,为简约,美观和高性能而生。已实现部分功能,项目目前仍在开发中。
### 主要特色
1. 风格简约大方而不平庸，尽量追寻花哨和简约的平衡值。
2. 响应式页面，兼容移动端展示。
3. 功能齐全，有博客管理，博客发布，登录注册，角色与权限管理，博客评论回复，博客点赞收藏，博客分享转发，标签云自定义，目录设置，友链管理等，更多功能可前往博客体验地址[博客首页](https://beta.zealsay.com)自行去体验。
4. 添加看(lao)板(po)娘，让你的博客不再单调。
5. nuxt服务端渲染，让你的页面访问速度飞起，seo优化自定义，让你不再烦恼用vue的单页面搜索引擎不收录。
6. 支持cdn部署，天下武功，唯快不破。

### 反馈
欢迎大家在使用的过程中提出宝贵的意见和反馈问题，也可以直接提issue。
### 交流群
* 欢迎加入zealsay交流群一起交流和学习，群号：189361484

<img src="https://pan.zealsay.com/20190716214941558000000.jpg" alt="Sample"  width="150" height="200">

### 鸣谢

- [mavonEditor](https://github.com/hinesboy/mavonEditor#readme)一款优秀的vue markdown编辑器插件
- :kissing_heart::kissing_heart:感谢前端美女[jinjinyike](https://github.com/jinjinyike)的帮助。
- :heart::heart:兜兜里有糖。
- 作为一位后台开发者,接触前端时间不长，熟悉了vue后，便使用nuxt.js来开发此项目,刚使用nuxt,踩了不少坑,更多关于nuxt文档,可以访问 [Nuxt.js docs](https://nuxtjs.org).
