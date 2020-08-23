<!--  -->
<template>
  <div class="config-page">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="title">数据库配置</div>
      <el-form-item label="数据库地址" label-width="100px" prop="host">
        <el-input placeholder="请输入当前数据库地址" v-model="ruleForm.host"></el-input>
      </el-form-item>
      <el-form-item label="数据库端口" label-width="100px" prop="dbport">
        <el-input placeholder="请输入当前数据库端口" v-model="ruleForm.dbport"></el-input>
      </el-form-item>
      <el-form-item label="数据库名称" label-width="100px" prop="dbname">
        <el-input placeholder="请区分大小写" v-model="ruleForm.dbname"></el-input>
      </el-form-item>
      <el-form-item label="用户名" label-width="100px" prop="username">
        <el-input placeholder="请输入数据库用户名" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="100px" prop="password">
        <el-input placeholder="若无则跳过" type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <div class="title">身份令牌配置(可选)</div>
      <el-form-item label="超时时间" label-width="100px" prop="expiresIn">
        <el-input placeholder="以秒为单位 默认一个月" v-model="ruleForm.expiresIn"></el-input>
      </el-form-item>
      <el-form-item label="密钥" label-width="100px" prop="secretKey">
        <el-input placeholder="不填将使用默认密钥" type="password" v-model="ruleForm.secretKey"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:20px;margin-bottom:20px;">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button v-if="!fromUser" @click="resetForm('ruleForm')">重置</el-button>
        <el-button v-if="fromUser" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import rule from "../../validator/config";
import { putConfig, getConfig, validateDb } from "internet/config";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      ruleForm: {
        dbname: "",
        dbport: "",
        host: "",
        username: "",
        password: "",
        expiresIn: "",
        secretKey: "",
      },
      rules: rule,
      fromUser: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      let comp;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          comp = this.$toast({
            type: "loading",
            content: "加载中",
          });
          putConfig(this.ruleForm).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      setTimeout(() => {
        validateDb().then((res) => {
          // console.log(res);
          comp.hidden();
          if (res.status == 200) {
            this.$toast({
              duration:2000,
              content:"连接成功!",
              icon:"el-icon-check"
            })
            this.$router.push("/login");
          }else{
            this.$toast({
              duration:2000,
              content:"链接失败,请重试",
              icon:"el-icon-close"
            })
          }
        });
      }, 4000);
    },
    initConfig() {
      let comp = this.$toast({
        content: "加载中",
        type: "loading",
      });
      getConfig()
        .then((res) => {
          const db = res.data.db;
          const security = res.data.security;
          // console.log(res);
          if (db) {
            this.ruleForm.dbname = db.dbName;
            this.ruleForm.host = db.host;
            this.ruleForm.dbport = db.port;
            this.ruleForm.password = db.password;
            this.ruleForm.username = db.user;
          }
        })
        .finally(() => {
          comp.hidden();
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.back(-1);
    },
  },
  beforeRouteEnter: (to, from, next) => {
    // console.log(from);
    let flag = false;
    if (from.path == "/user") {
      flag = true;
    }
    next((vm) => {
      vm.fromUser = flag;
    });
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initConfig();
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
.config-page {
  padding: 36px 36px 30px 36px;
  .title {
    margin-bottom: 18px;
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 18px;
    color: #333;
    border-bottom: 1px solid #dddddd;
  }
}
</style>