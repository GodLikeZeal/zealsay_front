import http from 'http'
import https from 'https'
import axios from 'axios'
import { getcookiesInClient } from '@/util/auth'
// import { Message } from 'element-ui'
// import qs from 'qs'
// import config from './config'

const config = {
  // 自定义的请求头
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Agent': 'zealsay/Web'
  },
  // 超时设置
  timeout: 10000,
  // 跨域是否带Token
  withCredentials: true,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: 'json',
  // XSRF 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  // 用于node.js
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
}

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env
    .PORT || 3000}`
}
// 自定义请求头
const token = getcookiesInClient('auth._refresh_token.local')
// eslint-disable-next-line no-console
console.log('token')
// eslint-disable-next-line no-console
console.log(token)
// if (token) {
//   config.headers.Authorization = token
// }
const request = axios.create(config)

// POST 传参序列化
request.interceptors.request.use(
  config => {
    // if (config.method === 'post') config.data = qs.stringify(config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断
request.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
