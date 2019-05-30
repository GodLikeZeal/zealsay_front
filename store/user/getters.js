// https://vuex.vuejs.org/en/getters.html

export default {
  token: state => state.token,
  avatar: state => state.avatar,
  name: state => state.name,
  introduction: state => state.introduction,
  status: state => state.status,
  roles: state => state.roles,
  setting: state => state.setting
}
