export default function({ $axios, redirect }) {
  $axios.onRequest(config => {})

  $axios.onResponse(response => {})

  $axios.onError(error => {
    // eslint-disable-next-line no-console
    console.log(error)
  })

  // eslint-disable-next-line handle-callback-err
  $axios.onRequestError(error => {})

  // eslint-disable-next-line handle-callback-err
  $axios.onResponseError(error => {})
}
