// https://vuex.vuejs.org/en/actions.html
import { loginByUsername, logout, getUserInfo } from "@/api/login";
import { setToken, removeToken } from "@/util/auth";

export default {
  // 用户名登录
  LoginByUsername({ commit }, userInfo) {
    userInfo.username = userInfo.username.trim();
    return new Promise((resolve, reject) => {
      loginByUsername(userInfo)
        .then(response => {
          const code = response.code;
          const data = response.data;
          if (code === "200") {
            commit("SET_TOKEN", data.token);
            setToken(data.token);
            resolve();
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取用户信息
  GetUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token)
        .then(response => {
          if (!response.data) {
            // 由于mockjs 不支持自定义状态码只能这样hack
            reject("error");
          }
          const data = response.data;
          commit("SET_ID", data.id);
          commit("SET_USERNAME", data.username);
          commit("SET_ROLE", data.role);
          commit("SET_STATUS", data.status);
          commit("SET_AVATAR", data.avatar);
          commit("SET_INTRODUCTION", data.introduction);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 第三方验证登录
  // LoginByThirdparty({ commit, state }, code) {
  //   return new Promise((resolve, reject) => {
  //     commit('SET_CODE', code)
  //     loginByThirdparty(state.status, state.email, state.code).then(response => {
  //       commit('SET_TOKEN', response.data.token)
  //       setToken(response.data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 登出
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLE", "");
          commit("SET_USERNAME", "");
          commit("SET_ID", "");
          commit("SET_NAME", "");
          commit("SET_AVATAR", "");
          commit("SET_SETTING", "");
          commit("SET_INTRODUCTION", "");
          removeToken();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  },

  // 动态修改权限
  ChangeRoles({ commit, dispatch }, role) {
    return new Promise(resolve => {
      commit("SET_TOKEN", role);
      setToken(role);
      getUserInfo(role).then(response => {
        const data = response.data;
        commit("SET_ROLE", data.role);
        commit("SET_NAME", data.name);
        commit("SET_AVATAR", data.avatar);
        commit("SET_INTRODUCTION", data.introduction);
        dispatch("GenerateRoutes", data); // 动态修改权限后 重绘侧边菜单
        resolve();
      });
    });
  }
};
