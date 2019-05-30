import request from '@/util/request'

/**
 * 获取分类列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCategoryList(obj) {
  return request({
    url: '/api/v1/article/category',
    method: 'get',
    data: obj
  })
}

/**
 * 新增分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function addCategory(obj) {
  return request({
    url: '/api/v1/article/category',
    method: 'post',
    data: obj
  })
}

/**
 * 修改分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateCategory(obj) {
  return request({
    url: '/api/v1/article/category',
    method: 'put',
    data: obj
  })
}

/**
 * 删除分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteCategory(id) {
  return request({
    url: '/api/v1/article/category/' + id,
    method: 'delete'
  })
}

/**
 * 根据id查询文章作品详情.
 *
 * @author  zhanglei
 * @date 2019-05-15  14:53
 */
export function getArticle(id) {
  return request({
    url: '/api/v1/article/' + id,
    method: 'get'
  })
}

/**
 * 添加文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function saveArticle(obj) {
  return request({
    url: '/api/v1/article',
    method: 'post',
    data: obj
  })
}

/**
 * 修改文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateArticle(obj) {
  return request({
    url: '/api/v1/article',
    method: 'put',
    data: obj
  })
}

/**
 * 分页查询文章列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getArticlePageList(obj) {
  return request({
    url: '/api/v1/article/page',
    method: 'get',
    data: obj
  })
}

/**
 * 下架文章作品.
 *
 * @author  zhanglei
 * @date 2019-05-15  12:04
 */
export function markArticleDown(id) {
  return request({
    url: '/api/v1/article/down/' + id,
    method: 'put'
  })
}

/**
 * 上架文章作品.
 *
 * @author  zhanglei
 * @date 2019-05-15  12:05
 */
export function markArticleUp(id) {
  return request({
    url: '/api/v1/article/up/' + id,
    method: 'put'
  })
}

/**
 * 分页获取标签列表.
 *
 * @author  zeal
 * @date 2019/5/20 21:32
 */
export function getArticleLabelPage(obj) {
  return request({
    url: '/api/v1/article/label/page',
    method: 'get',
    data: obj
  })
}

/**
 * 获取标签列表.
 *
 * @author  zeal
 * @date 2019/5/20 21:32
 */
export function getArticleLabelList(obj) {
  return request({
    url: '/api/v1/article/label',
    method: 'get'
  })
}

/**
 * 添加标签.
 *
 * @author  zeal
 * @date 2019/5/20 21:33
 */
export function addArticleLabel(obj) {
  return request({
    url: '/api/v1/article/label',
    method: 'post',
    data: obj
  })
}

/**
 * 修改标签.
 *
 * @author  zeal
 * @date 2019/5/20 21:33
 */
export function updateArticleLabel(obj) {
  return request({
    url: '/api/v1/article/label',
    method: 'put',
    data: obj
  })
}

/**
 * 删除标签.
 *
 * @author  zeal
 * @date 2019/5/20 21:34
 */
export function deleteArticleLabel(id) {
  return request({
    url: '/api/v1/article/label/' + id,
    method: 'delete'
  })
}
