/**
 * 获取分类列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCategoryList(obj) {
  return {
    url: '/api/v1/article/category',
    method: 'get',
    data: obj
  }
}

/**
 * 新增分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function addCategory(obj) {
  return {
    url: '/api/v1/article/category',
    method: 'post',
    data: obj
  }
}

/**
 * 修改分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateCategory(obj) {
  return {
    url: '/api/v1/article/category',
    method: 'put',
    data: obj
  }
}

/**
 * 删除分类目录.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteCategory(id) {
  return {
    url: '/api/v1/article/category/' + id,
    method: 'delete'
  }
}

/**
 * 根据id查询文章作品详情.
 *
 * @author  zhanglei
 * @date 2019-05-15  14:53
 */
export function getArticle(id) {
  return {
    url: '/api/v1/article/' + id,
    method: 'get'
  }
}

/**
 * 添加文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function saveArticle(obj) {
  return {
    url: '/api/v1/article',
    method: 'post',
    data: obj
  }
}

/**
 * 修改文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateArticle(obj) {
  return {
    url: '/api/v1/article',
    method: 'put',
    data: obj
  }
}

/**
 * 分页查询文章列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getArticlePageList(obj) {
  return {
    url: '/api/v1/article/page',
    method: 'get',
    params: obj
  }
}

/**
 * 分页查询文章列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getArticlePageListToC(obj) {
  return {
    url: '/api/v1/article/c/page',
    method: 'get',
    params: obj
  }
}

/**
 * 下架文章作品.
 *
 * @author  zhanglei
 * @date 2019-05-15  12:04
 */
export function markArticleDown(id) {
  return {
    url: '/api/v1/article/down/' + id,
    method: 'put'
  }
}

/**
 * 上架文章作品.
 *
 * @author  zhanglei
 * @date 2019-05-15  12:05
 */
export function markArticleUp(id) {
  return {
    url: '/api/v1/article/up/' + id,
    method: 'put'
  }
}

/**
 * 分页获取标签列表.
 *
 * @author  zeal
 * @date 2019/5/20 21:32
 */
export function getArticleLabelPage(obj) {
  return {
    url: '/api/v1/article/label/page',
    method: 'get',
    params: obj
  }
}

/**
 * 获取标签列表.
 *
 * @author  zeal
 * @date 2019/5/20 21:32
 */
export function getArticleLabelList(obj) {
  return {
    url: '/api/v1/article/label',
    method: 'get'
  }
}

/**
 * 添加标签.
 *
 * @author  zeal
 * @date 2019/5/20 21:33
 */
export function addArticleLabel(obj) {
  return {
    url: '/api/v1/article/label',
    method: 'post',
    data: obj
  }
}

/**
 * 修改标签.
 *
 * @author  zeal
 * @date 2019/5/20 21:33
 */
export function updateArticleLabel(obj) {
  return {
    url: '/api/v1/article/label',
    method: 'put',
    data: obj
  }
}

/**
 * 删除标签.
 *
 * @author  zeal
 * @date 2019/5/20 21:34
 */
export function deleteArticleLabel(id) {
  return {
    url: '/api/v1/article/label/' + id,
    method: 'delete'
  }
}

/**
 * 阅读数增加1.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function readArticle(id) {
  return {
    url: '/api/v1/article/read/' + id,
    method: 'get'
  }
}

/**
 * 查询是否喜欢过该文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function isLikeArticle(id) {
  return {
    url: '/api/v1/article/islike/' + id,
    method: 'get'
  }
}
/**
 * 喜欢该文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function likeArticle(id) {
  return {
    url: '/api/v1/article/like/' + id,
    method: 'get'
  }
}
/**
 * 取消喜欢该文章.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function disLikeArticle(id) {
  return {
    url: '/api/v1/article/dislike/' + id,
    method: 'get'
  }
}
