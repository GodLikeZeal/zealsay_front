/**
 * 获取index页面数据.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getIndexData() {
  return {
    url: '/api/v1/data/index',
    method: 'get'
  }
}
/**
 * 用户中心数据.
 *
 * @author  zhanglei
 * @date 2020/6/11  5:43 下午
 */
export function getUserData(id) {
  return {
    url: '/api/v1/data/user/' + id,
    method: 'get'
  }
}
/**
 * 管理页面数据.
 *
 * @author  zhanglei
 * @date 2020/6/11  5:43 下午
 */
export function getDashboardData() {
  return {
    url: '/api/v1/data/admin/dashboard',
    method: 'get'
  }
}
