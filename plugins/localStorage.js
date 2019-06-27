// ~/plugins/localStorage.js

import createPersistedState from 'vuex-persistedstate'

// export default ({ store }) =>
//   createPersistedState({
//     key: 'vuex',
//     paths: []
//   })(store)

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'vuex',
      paths: []
    })(store)
  })
}
