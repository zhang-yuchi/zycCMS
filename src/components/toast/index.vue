<!--  -->
<template>
  <div class="toast-show">
    <div :class="['toast-window']">
      <img
        v-if="type=='loading'"
        src="../../assets/icon/loading.gif"
        width="20px"
        style="margin-right:10px"
        alt
      />
      <i v-else-if="icon" :class="icon"></i>
      {{content}}
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    content: String,
    type: {
      type: String,
    },
    duration: Number,
    showFlag: Boolean,
    icon:String
  },
  data() {
    //这里存放数据
    return {
      isShow: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    show() {
      this.isShow = true;
      if (this.duration) {
        setTimeout(this.hidden, this.duration);
      }
    },
    hidden() {
      this.isShow = false;
      this.remove();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this);
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
.toast-show {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .toast-window {
    font-size: 16px;
    display: inline-block;
    background-color: rgb(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 6px;
    box-shadow: 5px 5px 10px #a4a4a4, -5px -5px 10px #c0c0c0;
    position: absolute;
    left: 50%;
    max-width: 250px;
    color: #f1f1f1;
    letter-spacing: 2px;
    top: 40%;
    transition: 0.3s;
    transform: translate(-50%, -50%);
    display: flex;
  }
}
</style>