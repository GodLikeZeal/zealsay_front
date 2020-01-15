import request from "@/util/request";

/**
 * 获取用户列表.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getUserList(obj) {
  return request({
    url: "/api/v1/user/page",
    method: "GET",
    params: obj
  });
}
/**
 * 获取用户信息.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getUserById(id) {
  return request({
    url: "/api/v1/user/" + id,
    method: "GET"
  });
}
/**
 * 后台添加用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:14
 */
export function addUser(obj) {
  return request({
    url: "/api/v1/user",
    method: "POST",
    data: obj
  });
}
/**
 * 修改用户信息.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:15
 */
export function editUser(obj) {
  return request({
    url: "/api/v1/user",
    method: "PUT",
    data: obj
  });
}
/**
 * 批量禁用用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function disabeledUserBatch(obj) {
  return request({
    url: "/api/v1/user/disable/batch",
    method: "PUT",
    data: obj
  });
}
/**
 * 批量解封用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function unsealingUserBatch(obj) {
  return request({
    url: "/api/v1/user/unsealing/batch",
    method: "PUT",
    data: obj
  });
}
/**
 * 根据id禁用用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function disabeledUser(obj) {
  return request({
    url: "/api/v1/user/disable/" + obj,
    method: "PUT"
  });
}
/**
 * 根据id解封用户.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function unsealingUser(obj) {
  return request({
    url: "/api/v1/user/unsealing/" + obj,
    method: "PUT"
  });
}

/**
 * 查询用户名是否被使用.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function getIsInUseByUsername(obj) {
  return request({
    url: "/api/v1/user/use/username/" + obj.username,
    method: "GET",
    data: obj.id
  });
}

/**
 * 根据id查询手机号是否被使用.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function getIsInUseByPhone(obj) {
  return request({
    url: "/api/v1/user/use/phone/" + obj.phoneNumber,
    method: "GET",
    data: obj.id
  });
}

/**
 * 根据id查询邮箱是否被使用.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function getIsInUseByEmail(obj) {
  return request({
    url: "/api/v1/user/use/email/" + obj.email,
    method: "GET",
    data: obj.id
  });
}

/**
 * 用户注册.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function register(obj) {
  return request({
    url: "/api/v1/user/register",
    method: "POST",
    data: obj
  });
}

/**
 * 用户注册邮件确认.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function confirmEmail(obj) {
  return request({
    url: "/api/v1/user/confirm/email",
    method: "POST",
    params: obj
  });
}

/**
 * 图片上传.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function uploadImage(obj) {
  return request({
    url: "/api/v1/qiniu/upload",
    method: "post",
    data: obj,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

/**
 * 头像上传.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function uploadAvatar(obj) {
  return request({
    url: "/api/v1/qiniu/upload/avatar",
    method: "post",
    data: obj,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

/**
 * 文章图片上传.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function uploadArticle(obj) {
  return request({
    url: "/api/v1/qiniu/upload/article",
    method: "post",
    data: obj,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

/**
 * 图片批量上传.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:16
 */
export function uploadImageMultiple(obj) {
  return request({
    url: "/api/v1/qiniu/upload/multiple",
    method: "post",
    data: obj,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
/**
 * 获取当前用户发表的博客.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCurrentUserBlog(obj) {
  return request({
    url: "/api/v1/user/blog",
    method: "get",
    params: obj
  });
}
/**
 * 获取当前用户发表的博客.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCurrentUserLikeBlog(obj) {
  return request({
    url: "/api/v1/user/like",
    method: "get",
    params: obj
  });
}
/**
 * 获取当前用户所.
 *
 * @author  zhanglei
 * @date 2019-03-13  16:13
 */
export function getCurrentUserActions() {
  return request({
    url: "/api/v1/user/action/timelines",
    method: "get"
  });
}
