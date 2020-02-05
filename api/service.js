/**
 * 获取一言接口.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getHitokoto(obj) {
  return {
    url: '/api/v1/service/hitokoto',
    method: 'get',
    data: obj
  }
}
