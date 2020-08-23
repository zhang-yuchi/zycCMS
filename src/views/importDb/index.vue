<!--  -->
<template>
  <div class="db-add-page">
    <tips title="数据表导入">
      <p>将当前数据库中的表导入为model文件,可部分导入或全部导入</p>
      <p>开发过程中每次新建表或对表进行了修改都需要进行重新导入</p>
      <p>选择<strong>全部导入</strong>会导入当前数据库下所有表,重复表将会覆盖</p>
    </tips>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item label="全部导入" prop="delivery">
        <el-switch v-model="dynamicValidateForm.isAll"></el-switch>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.tables"
        :label="'表' + (index+1)"
        :key="domain.key"
        :prop="'tables.' + index + '.value'"
        label-width='50px'
        v-show="!dynamicValidateForm.isAll"
      >
        <el-input v-model="domain.value" placeholder='请输入表名' :disabled=dynamicValidateForm.isAll style="width:170px"></el-input>
        <el-button @click.prevent="removeDomain(domain)" style="width:80px" type='danger' :disabled=dynamicValidateForm.isAll>删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain" v-show="!dynamicValidateForm.isAll" :disabled=dynamicValidateForm.isAll>新增表名</el-button>
        <!-- <el-button @click="resetForm('dynamicValidateForm')" :disabled=dynamicValidateForm.isAll>重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tips from "components/tips";
import { importDb } from 'internet/config'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tips },
  data() {
    //这里存放数据
    return {
      dynamicValidateForm: {
        isAll: true,
        tables: [
          {
            value: "",
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // console.log(this.dynamicValidateForm);
          importDb(this.dynamicValidateForm).then(res=>{
            // console.log(res);
          })
        } else {
          
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.tables.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.tables.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.tables.push({
        value: "",
        key: Date.now(),
      });
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
.db-add-page {
  padding: 60px 36px 0;
  margin-bottom: 72px;
  .db-tips {
    font-size: 16px;
  }
  .db-title {
    font-size: 20px;
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>