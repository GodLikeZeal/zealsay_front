/**
 * 添加评论.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function createComment(obj) {
  return {
    url: '/api/v1/comment',
    method: 'post',
    data: obj
  }
}
/**
 * 点赞.
 *
 * @author  zhanglei
 * @date 2020/6/11  5:43 下午
 */
export function thumbUp(id) {
  return {
    url: '/api/v1/comment/thumb/up/' + id,
    method: 'get'
  }
}
/**
 * 取消赞.
 *
 * @author  zhanglei
 * @date 2020/6/11  5:43 下午
 */
export function thumbDown(id) {
  return {
    url: '/api/v1/comment/thumb/down/' + id,
    method: 'get'
  }
}
/**
 * 管理页面数据.
 *
 * @author  zhanglei
 * @date 2020/6/11  5:43 下午
 */
export function getCommentPage(obj) {
  return {
    url: '/api/v1/comment/page',
    method: 'get',
    params: obj
  }
}
/**
 * 监控数据数据.
 *
 * @author  zhanglei
 * @date 2020/6/11  5:43 下午
 */
export function getActuatorData() {
  return {
    url: '/actuator/health',
    method: 'get'
  }
}
