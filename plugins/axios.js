export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    // eslint-disable-next-line no-console
    console.log('请求 ' + config.url)
  })

  $axios.onResponse(response => {
    // eslint-disable-next-line no-console
    console.log('返回 ' + response)
  })

  $axios.onError(error => {
    // eslint-disable-next-line no-console
    console.log('出错 ' + error)
  })

  $axios.onRequestError(error => {
    // eslint-disable-next-line no-console
    console.log('请求出错 ' + error)
  })

  $axios.onResponseError(error => {
    // eslint-disable-next-line no-console
    console.log('返回出错 ' + error)
  })
}
