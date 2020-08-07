/**
 * 获取省列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getProvinceList() {
  return {
    url: '/api/v1/dict/region/province',
    method: 'get'
  }
}

/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCityList(obj) {
  return {
    url: '/api/v1/dict/region/city',
    method: 'get',
    params: obj
  }
}

/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getAreaList(obj) {
  return {
    url: '/api/v1/dict/region/area',
    method: 'get',
    params: obj
  }
}
/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getDictPage(obj) {
  return {
    url: '/api/v1/dict/page',
    method: 'get',
    params: obj
  }
}

/**
 * 获取配置列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfig() {
  return {
    url: '/api/v1/dict/config',
    method: 'get'
  }
}
/**
 * 获取配置列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigToC() {
  return {
    url: '/api/v1/dict/c/config',
    method: 'get'
  }
}

/**
 * 获取关于页面列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigAbout() {
  return {
    url: '/api/v1/dict/config/about',
    method: 'get'
  }
}

/**
 * 获取关于页面列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigAboutToC() {
  return {
    url: '/api/v1/dict/c/config/about',
    method: 'get'
  }
}

/**
 * 获取作者配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigAuthor() {
  return {
    url: '/api/v1/dict/config/author',
    method: 'get'
  }
}

/**
 * 获取作者配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigAuthorToC() {
  return {
    url: '/api/v1/dict/c/config/author',
    method: 'get'
  }
}

/**
 * 获取github配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigGithub() {
  return {
    url: '/api/v1/dict/config/plugins/login/github',
    method: 'get'
  }
}

/**
 * 获取七牛云配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigQiniu() {
  return {
    url: '/api/v1/dict/config/plugins/qiniu',
    method: 'get'
  }
}

/**
 * 获取阿里云短信配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigSms() {
  return {
    url: '/api/v1/dict/config/plugins/sms',
    method: 'get'
  }
}

/**
 * 获取看板娘配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigLive2d() {
  return {
    url: '/api/v1/dict/config/plugins/live2d',
    method: 'get'
  }
}

/**
 * 获取邮箱服务配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getConfigMail() {
  return {
    url: '/api/v1/dict/config/plugins/mail',
    method: 'get'
  }
}
/**
 * 保存配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function saveConfig(obj) {
  return {
    url: '/api/v1/dict/config',
    method: 'put',
    data: obj
  }
}
/**
 * 保存主题配置.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function saveConfigTheme(obj) {
  return {
    url: '/api/v1/dict/config/theme',
    method: 'put',
    data: obj
  }
}

/**
 * 新增数据字典.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function addDict(obj) {
  return {
    url: '/api/v1/dict',
    method: 'post',
    data: obj
  }
}

/**
 * 修改数据字典.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateDict(obj) {
  return {
    url: '/api/v1/dict',
    method: 'put',
    data: obj
  }
}

/**
 * 删除数据字典.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteById(obj) {
  return {
    url: '/api/v1/dict/' + obj,
    method: 'delete'
  }
}

/**
 * 批量删除数据字典.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteByBatch(obj) {
  return {
    url: '/api/v1/dict/batch',
    method: 'delete',
    data: obj
  }
}

/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getTypeList(obj) {
  return {
    url: '/api/v1/dict/type',
    method: 'get',
    params: obj
  }
}
