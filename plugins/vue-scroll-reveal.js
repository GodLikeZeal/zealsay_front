import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'

// OR specifying custom default options for all uses of the directive
Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  // Animation
  origin: 'bottom', // 动画的方向 'top','right','bottom','left'
  distance: '20px', // 动画的距离 可用任何CSS单位值，如：'20px','10vw','5%'
  duration: 300, // 动画持续时间，单位毫秒 默认500
  delay: 0, // 动画的延迟时间，单位毫秒 默认0
  rotate: { x: 0, y: 0, z: 0 }, // 开始的角度，单位degrees 默认{ x: 0, y: 0, z: 0 }
  opacity: 0, // 开始的透明度 默认0
  scale: 0.9, // 开始的缩放值 默认0。9
  easing: 'cubic-bezier( 0.6, 0.2, 0.1, 1 )', // 动画的easing效果，可以是任何有效的CSS easing值 'ease''ease''ease-out''ease-in-out''ease-in-out'

  // Options
  // container: null, // 容器 document.getElementById('foo')
  mobile: true, // 是否在移动手机上显示动画效果
  reset: false, // 元素是否在容器边界内来回滚动时都产生动画效果
  useDelay: 'always', // 控制元素什么时候使用动画延迟 'always','once','onload'
  viewFactor: 0.2, // 0.20表示元素在产生动画之前，它的20%在viewport或容器的边界之内
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }, // 增加viewport或容器边界，单位像素
  afterReveal(domEl) {}, // reveal动画之后触发的回调函数
  afterReset(domEl) {} // reset动画之后触发的回调函数
})
