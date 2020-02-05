import qs from 'qs'

export function loginByUsername(data) {
  return {
    url: '/api/v1/authentication/login',
    method: 'post',
    data: qs.stringify(data)
  }
}

export function logout() {
  return {
    url: '/api/v1/authentication/logout',
    method: 'post'
  }
}

export function getUserInfo(token) {
  return {
    url: '/api/v1/authentication/user',
    method: 'get'
  }
}
