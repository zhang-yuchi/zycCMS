<!--  -->
<template>
  <div class="user-page">
    <div class="user-profile">
      <p class="name">张宇弛</p>
      <p style="font-size:14px">欢迎使用系统</p>
    </div>
    <div class="user-function">
      <func title="添加新模块" path='/user/addModel'>
        <img src="../assets/icon/add.png" alt />
      </func>
      <func title="数据表导入" path='/user/importDb'>
        <img src="../assets/icon/import.png" alt />
      </func>
      <func title="配置项修改" path='/config'>
        <img src="../assets/icon/config.png" alt />
      </func>
      <func title="数据表设置">
        <img src="../assets/icon/table.png" alt />
      </func>
      <func title="用户组设置">
        <img src="../assets/icon/user.png" alt />
      </func>
    </div>
    <div class="col"></div>
    <div class="user-model">
      <model title="意见反馈">
        <img src="../assets/icon/feed.png" alt />
      </model>
      <model title="退出登录" path='/login' @callback='clearToken'>
        <img src="../assets/icon/logout.png" alt />
      </model>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import func from "components/function";
import model from "components/user/model";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { func, model },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    clearToken(){
      localStorage.setItem('token','')
    }
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
.user-page {
  font-size: 18px;
  // padding-top: 120px;
  .user-profile {
    color: white;
    background-color: #4876f1;
    // position: absolute;
    // height: 100px;
    padding: 10px;
    height: 120px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
  }
  p {
    letter-spacing: 1.5px;
  }
  .name {
    font-weight: bold;
  }
  .user-function {
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .col {
    height: 5px;
    background-color: #f1f1f1;
  }
}
</style>