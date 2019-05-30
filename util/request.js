import axios from 'axios'
import store from '@/store'
import cloneDeep from 'lodash.clonedeep'
import { createRequestToken } from '@/util/auth'

// const prifix = 'https://api.zealsay.com';
const prifix = 'http://localhost:8090'
// console.log(prifix)
const fetch = options => {
  // eslint-disable-next-line prefer-const
  let { method = 'get', data, url } = options

  url = prifix + url

  const cloneData = cloneDeep(data)
  let headers = {}
  if (store.state.user.token) {
    headers = { Authorization: createRequestToken() }
  }
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        headers: headers,
        params: cloneData
      })
    case 'delete':
      return axios.delete(url, {
        headers: headers,
        data: cloneData
      })
    case 'post':
      return axios.post(url, cloneData, {
        headers: headers
      })
    case 'put':
      return axios.put(url, cloneData, {
        headers: headers
      })
    case 'patch':
      return axios.patch(url, cloneData, {
        headers: headers
      })
    case 'upload':
      headers['Content-Type'] = 'multipart/form-data'
      return axios.create({ headers: headers }).post(url, data)
    default:
      return axios(options)
  }
}

export default function request(options) {
  return fetch(options)
    .then(response => {
      // eslint-disable-next-line no-unused-vars
      const { statusText, status } = response
      const data = response.data
      if (data.code === '404' || data.code === '401') {
        // 跳转404路由
        this.$router.push({ path: `/error/${data.code}` })
        return
      }
      if (data.code !== '200') {
        // Message({
        //   message: data.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
      }
      return Promise.resolve({
        success: true,
        statusCode: status,
        ...data
      })
    })
    .catch(error => {
      const { response } = error
      let msg
      let statusCode
      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || '网络异常，请检查后重试!'
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ success: false, statusCode, message: msg })
    })
}
