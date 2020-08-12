<!--  -->
<template>
  <div class="login-page">
    <img src="../assets/logo.png" class="logo" alt />
    <div class="login-title">欢迎使用实习生管理系统</div>
    <div class="login-form">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label label-width="0">
          <el-input v-model="formLabelAlign.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label label-width="0">
          <el-input v-model="formLabelAlign.region" placeholder="请输入密码"></el-input>
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

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    userLogin() {
      window.localStorage.setItem("token", 123);
      this.$router.push("/");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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