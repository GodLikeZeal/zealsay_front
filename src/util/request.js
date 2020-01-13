import axios from "axios";
import router from "@/router";
import store from "@/store";
// import cloneDeep from "lodash.clonedeep";
// import { createRequestToken } from "@/util/auth";

console.log(process.env.VUE_APP_BASE_URL);
const request = axios.create({
  // 设置超时时间
  timeout: 60000,
  baseURL: process.env.VUE_APP_BASE_URL
});
// post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置
// 即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
request.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
request.interceptors.request.use(
  config => {
    const token = store.state.user.token;
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
request.interceptors.response.use(
  response => {
    const responseCode = response.code;
    switch (responseCode) {
      case 200:
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        return Promise.resolve({
          success: true,
          statusCode: responseCode,
          ...response.data
        });
      // 401：未登录
      case 401:
        // 无权操作
        router.replace({
          path: "/401",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        break;
      // 403: 未认证
      case 403:
        // 弹出错误信息
        router.replace({
          path: "/403",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        break;
      // 404请求不存在
      case 404:
        router.replace({
          path: "/404",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        break;
      // 其他错误，直接抛出错误提示
      default:
        return Promise.resolve({
          success: false,
          statusCode: responseCode,
          ...response.data
        });
    }
  },
  error => {
    // 服务器返回异常，会进入这个回调

    return Promise.reject(error);
  }
);

export default request;

// const fetch = options => {
//   let { method = "get", data, url } = options;
//
//   const service = axios.create({
//     // 设置超时时间
//     timeout: 60000,
//     baseURL: process.env.BASE_URL
//   });
//   // post请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置
//   // 即设置post的请求头为application/x-www-form-urlencoded;charset=UTF-8
//   service.defaults.headers.post["Content-Type"] =
//     "application/x-www-form-urlencoded;charset=UTF-8";
//
//   const cloneData = cloneDeep(data);
//   let headers = {};
//   if (store.state.user.token) {
//     headers = { Authorization: createRequestToken() };
//   }
//   switch (method.toLowerCase()) {
//     case "get":
//       return axios.get(url, {
//         headers: headers,
//         params: cloneData
//       });
//     case "delete":
//       return axios.delete(url, {
//         headers: headers,
//         data: cloneData
//       });
//     case "post":
//       return axios.post(url, cloneData, {
//         headers: headers
//       });
//     case "put":
//       return axios.put(url, cloneData, {
//         headers: headers
//       });
//     case "patch":
//       return axios.patch(url, cloneData, {
//         headers: headers
//       });
//     case "upload":
//       headers["Content-Type"] = "multipart/form-data";
//       return axios.create({ headers: headers }).post(url, data);
//     default:
//       return axios(options);
//   }
// };
//
// export default function request(options) {
//   return fetch(options)
//     .then(response => {
//       const { status } = response;
//       const data = response.data;
//       if (data.code === "404" || data.code === "401") {
//         // 跳转404路由
//         this.$router.push({ path: `/error/${data.code}` });
//         return;
//       }
//       if (data.code !== "200") {
//         // Message({
//         //   message: data.message,
//         //   type: 'error',
//         //   duration: 5 * 1000
//         // })
//       }
//       return Promise.resolve({
//         success: true,
//         statusCode: status,
//         ...data
//       });
//     })
//     .catch(error => {
//       console.log(error);
//       const { response } = error;
//       let msg;
//       let statusCode;
//       if (response && response instanceof Object) {
//         const { data, statusText } = response;
//         statusCode = response.status;
//         msg = data.message || statusText;
//       } else {
//         statusCode = 600;
//         msg = error.message || "网络异常，请检查后重试!";
//       }
//       return Promise.reject({ success: false, statusCode, message: msg });
//     });
// }
