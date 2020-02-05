// 中文、英文、数字包括下划线
const username = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
// 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
const password = /^[a-zA-Z]\w{5,17}$/
//  必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
const passwordstrong = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/
//  手机号码
const phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
//  身份证
const idcard = /^\d{15}|\d{18}$/
// email
const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// 大写字母、下划线
const value = /^[A-Z_]+$/
// 小写字母、中划线
const alias = /^[a-z-]+$/
// 合法的链接URL
const url = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/

/* 合法username */
export function validateUsername(textval) {
  return username.test(textval)
}

/* 合法password */
export function validatePassword(textval) {
  return password.test(textval)
}

/* 合法passwordstrong */
export function validatePasswordStrong(textval) {
  return passwordstrong.test(textval)
}

/* 合法phone */
export function validatePhone(textval) {
  return phone.test(textval)
}

/* 合法idcard */
export function validateIdcard(textval) {
  return idcard.test(textval)
}

/* 合法Email */
export function validateEmail(textval) {
  return email.test(textval)
}

/* 合法字典value */
export function validateValue(textval) {
  return value.test(textval)
}

/* 合法category alias */
export function validateAlias(textval) {
  return alias.test(textval)
}

/* 合法url链接 */
export function validateUrl(textval) {
  return url.test(textval)
}
