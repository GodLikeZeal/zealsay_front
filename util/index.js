import { emojis } from '@/util/constans'
// export function camel (str) {
//   const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase());

//   return capitalize(camel);
// }

// export function camelActual (str) {
//   return (str || '').replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
// }

// export function kebab (str) {
//   return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
// }

// export function capitalize (str) {
//   str = str || '';

//   return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
// }

// export function findProduct (store, id) {
//   return store.state.store.products.find(p => p.id === id);
// }

// export function isOnSale (variants) {
//   return variants.some(variant => {
//     return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
//   });
// }

// export function randomNumber (min, max) {
//   return Math.floor(Math.random() * max) + min;
// }

// export function randomString (length = 5) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }

//   return text;
// }
const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const kebab = (str) => {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const toggleFullScreen = () => {
  const doc = window.document
  const docEl = doc.documentElement

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen
  const cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}
/**
 * 格式化日期.
 *
 * @author  zhanglei
 * @date 2020/6/18 22:07
 */
const formateDate = (time) => {
  const date =
    typeof time === 'number'
      ? new Date(time)
      : new Date((time || '').replace(/-/g, '/'))
  const diff = (new Date().getTime() - date.getTime()) / 1000
  const dayDiff = Math.floor(diff / 86400)

  const isValidDate =
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date.getTime())

  if (!isValidDate) {
    // eslint-disable-next-line no-console
    console.error('not a valid date')
  }
  const formatDate = function(date) {
    const today = new Date(date)
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const day = ('0' + today.getDate()).slice(-2)
    return `${year}-${month}-${day}`
  }

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return formatDate(date)
  }

  return (
    (dayDiff === 0 &&
      ((diff < 60 && '刚刚') ||
        (diff < 120 && '1分钟前') ||
        (diff < 3600 && Math.floor(diff / 60) + '分钟前') ||
        (diff < 7200 && '1小时前') ||
        (diff < 86400 && Math.floor(diff / 3600) + '小时前'))) ||
    (dayDiff === 1 && '昨天') ||
    (dayDiff < 7 && dayDiff + '天前') ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + '周前')
  )
}

/**
 * 格式化时间.
 *
 * @author  zhanglei
 * @date 2020/6/18 22:07
 */
const formateDateTime = (time) => {
  const date =
    typeof time === 'number'
      ? new Date(time)
      : new Date((time || '').replace(/-/g, '/'))
  const diff = (new Date().getTime() - date.getTime()) / 1000
  const dayDiff = Math.floor(diff / 86400)

  const isValidDate =
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date.getTime())

  if (!isValidDate) {
    // eslint-disable-next-line no-console
    console.error('not a valid date')
  }
  const formatDate = function(date) {
    const today = new Date(date)
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2)
    const day = ('0' + today.getDate()).slice(-2)
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return formatDate(date)
  }

  return (
    (dayDiff === 0 &&
      ((diff < 60 && '刚刚') ||
        (diff < 120 && '1分钟前') ||
        (diff < 3600 && Math.floor(diff / 60) + '分钟前') ||
        (diff < 7200 && '1小时前') ||
        (diff < 86400 && Math.floor(diff / 3600) + '小时前'))) ||
    (dayDiff === 1 && '昨天') ||
    (dayDiff < 7 && dayDiff + '天前') ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + '周前')
  )
}

/**
 * 解析评论中的表情.
 *
 * @author  zhanglei
 * @date 2020/6/18 22:08
 */
const formateComment = (content) => {
  const regex = /\[(.+?)\]/g
  const list = content.match(regex)
  if (list) {
    list.forEach((v, k) => {
      const str = v.replace(/\[|]/g, '')
      const src = emojis.find((e) => e.title === str).url
      content = content.replace(
        regex,
        `<img
                          class="d-inline-flex"
                          width="16"
                          src="` +
          src +
          `"
                        ></img>`
      )
    })
  }
  return content
}

/**
 * 防止评论xss攻击.
 *
 * @author  zhanglei
 * @date 2020/6/18 22:08
 */
const xssComment = (content) => {
  const options = {
    whiteList: {}, // 白名单
    stripIgnoreTag: true // 去掉不在白名单上的标签
  }
  const xss = require('xss')
  const html = xss(content, options)
  return html
}

/**
 * 防止页面xss攻击.
 *
 * @author  zhanglei
 * @date 2020/6/18 22:08
 */
const xssAboutPage = (content) => {
  const options = {
    stripIgnoreTagBody: ['script'],
    onIgnoreTag(tag, html, options) {
      if (tag.substr(0, 2) === 'v-') {
        // 不对其属性列表进行过滤
        return html
      }
    }
  }
  const xss = require('xss')
  const html = xss(content, options)
  return html
}

/**
 * 取min到max之间随机数,如0到100则min为0，max为100
 * @param min
 * @param max
 * @returns {*}
 */
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

export default {
  randomElement,
  toggleFullScreen,
  kebab,
  formateDate,
  formateDateTime,
  formateComment,
  xssComment,
  xssAboutPage,
  randomNum
}
