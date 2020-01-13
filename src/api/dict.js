import request from "@/util/request";

/**
 * 获取省列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getProvinceList() {
  return request({
    url: "/app/api/v1/dict/region/province",
    method: "get"
  });
}

/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCityList(obj) {
  return request({
    url: "/app/api/v1/dict/region/city",
    method: "get",
    params: obj
  });
}

/**
 * 获取市列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getAreaList(obj) {
  return request({
    url: "/app/api/v1/dict/region/area",
    method: "get",
    params: obj
  });
}
