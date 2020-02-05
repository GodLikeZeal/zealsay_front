/**
 * 获取友链列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getFriendLinkList() {
  return {
    url: '/api/v1/friend/link/page',
    method: 'get'
  }
}

/**
 * 新增一条友链.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function saveFriendLink(obj) {
  return {
    url: '/api/v1/friend/link',
    method: 'post',
    data: obj
  }
}

/**
 * 根据id修改一条友链.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateFriendLinkById(obj) {
  return {
    url: '/api/v1/friend/link',
    method: 'put',
    data: obj
  }
}
/**
 * 根据id修改一条友链.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteFriendLinkById(id) {
  return {
    url: '/api/v1/friend/link/' + id,
    method: 'delete'
  }
}
