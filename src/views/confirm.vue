<template>
  <v-app id="conform">
    <v-container fluid fill-height>
      <v-layout align-center justify-center row>
        <div class="text-md-center">
          <div v-if="this.activation">
            <span>
              <v-icon :size="70" color="green darken-2"
                >mdi-checkbox-marked-circle-outline</v-icon
              >
            </span>
            <h2>激活成功!</h2>
            <v-btn color="primary" @click="goHome">回到首页</v-btn>
          </div>
          <div v-else>
            <v-progress-circular
              :size="70"
              color="primary"
              indeterminate
            ></v-progress-circular>

            <h2>激活中...请您耐心等待</h2>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { confirmEmail } from "@/api/user";

export default {
  name: "Confirm",
  data: () => ({
    activation: false
  }),
  created() {
    const obj = {};
    obj.key = this.$route.query.token;
    obj.email = this.$route.query.email;
    confirmEmail(obj)
      .then(res => {
        if (res.code === "200" && res.data) {
          this.activation = true;
        } else {
          this.$swal.fire({
            text: res.message,
            icon: "error",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
      .catch(e => {
        this.loading = false;
        this.$swal.fire({
          text: e.message,
          icon: "error",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000
        });
      });
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped lang="css">
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
