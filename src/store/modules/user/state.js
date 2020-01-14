import { getToken } from "@/util/auth";

export default {
  id: "",
  username: "",
  status: "",
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  role: "",
  setting: {
    articlePlatform: []
  }
};
