import Vue from 'vue'
import VuetifyDialog from 'vuetify-dialog'
import context from 'vue-router'

const property = '$dialog'

Vue.use(VuetifyDialog, {
  context,
  property,
  confirm: {
    actions: {
      false: '取消',
      true: {
        text: '确定',
        color: 'primary'
      }
    },
    icon: false, // to disable icon just put false
    title: '操作提示'
  },
  warning: {
    actions: {
      false: '取消',
      true: {
        text: '确定',
        color: 'primary'
      }
    },
    icon: false, // to disable icon just put false
    title: '警告'
  },
  error: {
    actions: {
      false: '取消',
      true: {
        text: '确定',
        color: 'primary'
      }
    },
    icon: false, // to disable icon just put false
    title: '操作失败'
  },
  prompt: {
    actions: {
      false: '取消',
      true: {
        text: '确定',
        color: 'primary'
      }
    },
    icon: false, // to disable icon just put false
    title: '操作提示'
  }
})
