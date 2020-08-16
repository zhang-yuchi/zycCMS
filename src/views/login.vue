<!--  -->
<template>
  <div class="login-page">
    <img src="../assets/logo.png" class="logo" alt />
    <div class="login-title">欢迎使用实习生管理系统</div>
    <div class="login-form">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label label-width="0">
          <el-input v-model="formLabelAlign.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label label-width="0">
          <el-input type="password" v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      round
      type="primary"
      @click="userLogin"
      style="width:90%;margin:60px auto;display:block;"
    >登录</el-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { login, loginVerify } from "internet/login";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
      },
      isShow: true,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    userLogin() {
      // window.localStorage.setItem("token", 123);
      // this.$router.push("/");
      let comp = this.$toast({
        content: "加载中",
        type: "loading",
      });
      login(this.formLabelAlign)
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            localStorage.setItem("token", res.data);
            comp.hidden();
            this.$router.push("/");
          } else {
            comp.hidden();
            let msg = res.msg;
            if (msg instanceof Array) {
              msg = msg[0];
            }
            comp = this.$toast({
              content: msg,
              duration: 1500,
            });
          }
        })
        .finally(() => {
          // comp.hidden();
        });
    },
    verifyToken() {
      //免登录
      if (localStorage.getItem("token")) {
        loginVerify().then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.$router.replace("/");
          } else {
            //token不合法
            var comp = this.$toast({
              content: res.msg,
              duration: 1500,
            });
          }
        });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // var comp = this.$toast({
    //   content: "加载中",
    //   type: "loading",
    // });
    // setTimeout(()=>{
    //   comp.hidden()
    // },1000)

    this.verifyToken();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  deactivated() {}, //如果有keep-alive缓存功能,当该页面撤销使这个函数会触发
};
</script>
<style lang='less'>
.login-page {
  // background-color: hotpink;
  padding: 60px 36px 0 36px;
  .logo {
    width: 45px;
  }
  .login-title {
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .login-form {
    margin-top: 60px;
  }
}
</style>