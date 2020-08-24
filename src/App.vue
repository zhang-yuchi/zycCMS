<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { getConfig, validateDb } from "internet/config";
export default {
  name: "Home",
  components: {},
  mounted() {
    let comp = this.$toast({
      content: "加载中",
      type: "loading",
    });
    getConfig()
      .then((res) => {
        // console.log(res);
        if (!res.data.db) {
          this.$router.replace("/config");
        } else {
          validateDb().then((res) => {
            // console.log(res);
            // comp.hidden();
            if (res.status !== 200) {
              // console.log("need config");
              // console.log(to);
              this.$router.replace("/config");
            }
          });
        }
        // return
      }).catch(() => {
        // console.log(this.$route);
        if (this.$route.path !== "/login") {
          let token = localStorage.getItem("token");
          if (!token) {
            this.$router.replace("/login");
          }
        }
      })
      .finally(() => {
        comp.hidden();
      });
  },
};
</script>
<style lang="less">
body,
html,
#app {
  height: 100%;
  overflow: auto;
}
</style>
