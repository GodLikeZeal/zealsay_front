import { getToken } from '@/util/auth'

export default {
  user: '',
  status: '',
  code: '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  setting: {
    articlePlatform: []
  }
}
