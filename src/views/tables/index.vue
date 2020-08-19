<!--  -->
<template>
  <div class="table-setting-page">
    <tips title="现有模块">
      <p>注 : 表名前缀带有cms为系统默认数据库,请勿删除</p>
    </tips>
    <div class="table-block" v-for="(item,index) in tableName" :key="item">{{index+1}} {{item}}</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tips from "components/tips";
import { getModels } from "internet/model";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tips },
  data() {
    //这里存放数据
    return {
      tableName: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initData() {
      let comp = this.$toast({
        type: "loading",
        title: "加载中",
      });
      getModels().then((res) => {
        console.log(res);
        this.tableName = res.data;
      }).finally(()=>{
        comp.hidden()
      })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initData()
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
.table-setting-page {
  padding: 60px 36px 0;
  margin-bottom: 80px;
  font-size: 14px;
  .table-block {
    padding: 15px 10px;
    color: #333;
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>