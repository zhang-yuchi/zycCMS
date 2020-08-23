<!--  -->
<template>
  <div class="addModel-page">
    <tips title="添加新模块">
      <el-button size="mini" style="position:absolute;right:0;top:0;" type="primary">SQL添加模块</el-button>
      <p>
        <strong>主表</strong>代表查询时的主要数据表,若需要多表联查则需要使用此表外键连接其他表
      </p>
      <p>
        <strong>外键</strong>为外表第一个参数,若要进行多表查询请务必使用正确的外键
      </p>
      <p>字段输入框:前者表示数据库中字段,后者表示当该字段显示在前端时的列名</p>
      <p>输入到字段框的字段将会被显示在模块功能的表格中,其余字段将隐藏</p>
    </tips>
    <el-form :model="this.$data">
      <el-form-item
        :label="'模块名'"
        prop="modelName"
        class="model"
        :rules="{
      required: true, message: '模块名不能为空', trigger: 'blur'
    }"
      >
        <el-input
          v-model="modelName"
          style="width:50%;flex:17;margin-right:20px;"
          placeholder="请输入模块名"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 主表 -->
    <div style="display:flex;align-items:center;margin-bottom:18px;">
      <div class="line">主表</div>
      <el-select v-model="mainTable" @change="changeSelect" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </div>
    <el-form
      :model="mainTableKeys"
      style="border-bottom:1px solid #f1f1f1;"
      v-if="mainTable"
      ref="mainTableKeys"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        v-for="(domain, index) in mainTableKeys.domains"
        :label="'字段' + (index+1)"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        label-width="60px"
      >
        <el-input style="width:35%;" placeholder="字段名" v-model="domain.field"></el-input>
        <span style="margin:0 0px;">-</span>
        <el-input style="width:35%;" placeholder="列名" v-model="domain.name"></el-input>
        <el-button
          type="danger"
          style="margin-left:5px;"
          @click.prevent="removeDomain(domain,mainTableKeys)"
          icon="el-icon-delete"
          circle
        ></el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain(mainTableKeys)" size="small" type="warning">新增字段</el-button>
        <el-button @click="resetForm(mainTableKeys)" size="small">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 外表循环 -->
    <div
      class="extra"
      v-show="mainTable"
      v-for="(table,tableIndex) in extraTables"
      :key="table.key"
    >
      <div style="display:flex;align-items:center;margin-bottom:18px;">
        <div class="line">外表{{tableIndex+1}}</div>
        <el-select v-model="table.extraTable" @change="changeSelect" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </div>
      <div v-show="table.extraTable" style="margin-bottom:18px;">
        <el-radio v-model="table.relation" label="hasOne">一对一</el-radio>
        <el-radio v-model="table.relation" label="hasMany">一对多</el-radio>
        <el-radio v-model="table.relation" label="belongsTo">属于</el-radio>
      </div>
      <el-form
        :model="table.extraTableKeys"
        style="border-bottom:1px solid #f1f1f1;margin-bottom:18px;"
        v-if="table.extraTable"
        :ref="table.extraTable"
        :id="table.extraTable"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          v-for="(domain, index) in table.extraTableKeys.domains"
          :label="index==0?'外键':'字段' + (index)"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          label-width="60px"
        >
          <el-input style="width:35%;" placeholder="字段名" v-model="domain.field"></el-input>
          <span style="margin:0 0px;">-</span>
          <el-input style="width:35%;" placeholder="列名" :disabled="index==0" v-model="domain.name"></el-input>
          <el-button
            type="danger"
            style="margin-left:5px;"
            @click.prevent="removeDomain(domain,table.extraTableKeys)"
            icon="el-icon-delete"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('mainTableKeys')">提交</el-button> -->
          <el-button @click="addDomain(table.extraTableKeys)" size="small" type="warning">新增字段</el-button>
          <el-button @click="resetForm(table.extraTableKeys)" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      style
      v-show="mainTable"
      icon="el-icon-circle-plus-outline"
      type="success"
      size="small"
      @click="insertOneTable"
      :disabled="extraTables.length>=options.length-1"
    >新增表</el-button>
    <div v-if="mainTable">
      <p style="font-size:16px;color:green;">权限设置</p>
      <el-input-number v-model="weight" :min="1" :max="127" size="small" label="请输入该模块权限"></el-input-number>
      <p></p>
      <el-button
        style="margin-left:100px;margin-top:10px"
        size="small"
        @click="submitForm"
        type="primary"
      >添加此模块</el-button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tips from "components/tips";
import { getModels,addModel } from "internet/model";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { tips },
  data() {
    //这里存放数据
    return {
      options: [],
      weight: 1,
      modelName: "",
      mainTable: "",
      mainTableKeys: {
        domains: [
          {
            field: "",
            name: "",
          },
        ],
      },
      extraTables: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initData() {
      getModels().then((res) => {
        // console.log(res);
        let arr = res.data.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
        this.options = arr;
      });
    },
    submitForm() {
      if (this.modelName) {
        // console.log(this.$data);
        addModel(this.$data).then(res=>{
          // console.log(res);
        })
      }
    },
    resetForm(form) {
      let domains = form.domains;
      domains.map((item) => {
        Object.keys(item).map((key) => {
          if (key !== "key") {
            item[key] = "";
          }
        });
      });
    },
    removeDomain(item, table) {
      var index = table.domains.indexOf(item);
      if (index !== -1) {
        table.domains.splice(index, 1);
      }
    },
    addDomain(table) {
      table.domains.push({
        value: "",
        key: Date.now(),
      });
      // console.log(table);
    },
    insertOneTable() {
      this.extraTables.push({
        extraTable: "",
        relation: "hasOne",
        extraTableKeys: {
          domains: [
            {
              field: "",
              name: "",
            },
          ],
        },
        key: new Date().valueOf(),
      });
    },
    changeSelect(newVal) {
      let val = this.options.find((item) => {
        return item.value === newVal;
      });
      // console.log(val);
      val.disabled = true;

      let tableVal = [];
      tableVal.push(this.mainTable);
      this.extraTables.map((item) => {
        tableVal.push(item.extraTable);
      });

      for (let i in this.options) {
        let flag = true; //为true表示可以被表示
        for (let key of tableVal) {
          if (this.options[i].value == key) {
            flag = false;
            this.options[i].disabled = true;
            break;
          }
        }
        if (flag) {
          this.options[i].disabled = false;
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.initData();
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
.addModel-page {
  padding: 60px 36px 0 36px;
  margin-bottom: 80px;
  .line {
    color: #3b5db7;
    font-weight: bold;
    font-size: 16px;
    margin-right: 16px;
  }
  .model {
    .el-form-item__label {
      color: #3b5db7;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>