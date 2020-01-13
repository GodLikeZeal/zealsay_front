import { set, toggle } from "@/util/vuex";

export default {
  setDrawer: set("drawer"),
  setImage: set("image"),
  setColor: set("color"),
  setDark: set("dark"),
  setSlider: set("slider"),
  toggleDrawer: toggle("drawer")
};
