// main.js
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

const options = {
  buttonsStyling: false,
  heightAuto: false,
  grow: true,
  customClass: {
    container: 'd-flex justify-center',
    confirmButton: 'v-btn v-btn--round success',
    cancelButton: 'v-btn v-btn--round default'
  },
  confirmButtonText: '确定',
  cancelButtonText: '取消'
}

Vue.use(VueSweetalert2, options)
