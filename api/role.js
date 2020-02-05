/**
 * 获取角色列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getRoleList(obj) {
  return {
    url: '/api/v1/role',
    method: 'get',
    data: obj
  }
}
/**
 * 获取角色分页列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getRolePageList(obj) {
  return {
    url: '/api/v1/role/page',
    method: 'get',
    data: obj
  }
}
/**
 * 新增角色.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function addRole(obj) {
  return {
    url: '/api/v1/role',
    method: 'post',
    data: obj
  }
}
/**
 * 修改角色信息.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function updateRole(obj) {
  return {
    url: '/api/v1/role',
    method: 'put',
    data: obj
  }
}
/**
 * 删除角色信息.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteRole(obj) {
  return {
    url: '/api/v1/role/' + obj,
    method: 'delete'
  }
}
/**
 * 批量删除角色信息.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function deleteRoleBatch(obj) {
  return {
    url: '/api/v1/role/batch',
    method: 'delete',
    data: obj
  }
}
