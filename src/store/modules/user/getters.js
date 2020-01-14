// https://vuex.vuejs.org/en/getters.html

export default {
  token: state => state.token,
  avatar: state => state.avatar,
  id: state => state.id,
  username: state => state.username,
  name: state => state.name,
  introduction: state => state.introduction,
  status: state => state.status,
  roles: state => state.roles,
  setting: state => state.setting
};
