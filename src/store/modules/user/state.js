import { getToken } from "@/util/auth";

export default {
  id: "",
  username: "",
  status: "",
  code: "",
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  role: "",
  setting: {
    articlePlatform: []
  }
};
