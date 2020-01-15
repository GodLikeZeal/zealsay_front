import request from "@/util/request";
import qs from "qs";

export function loginByUsername(data) {
  return request({
    url: "/api/v1/authentication/login",
    method: "post",
    data: qs.stringify(data)
  });
}

export function logout() {
  return request({
    url: "/api/v1/authentication/logout",
    method: "post"
  });
}

export function getUserInfo() {
  return request({
    url: "/api/v1/authentication/user",
    method: "get"
  });
}
