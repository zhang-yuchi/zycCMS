<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { getConfig } from 'internet/config'
export default {
  name: 'Home',
  components: {
    
  },
  mounted(){
    getConfig().then((res)=>{
      // console.log(res);
      if(!res.data.db){
        this.$router.replace('/config')//强制转移 不可逆
        return
      }
    })
  }
}
</script>
<style lang="less">
#app{
  // margin-bottom:40px;
  padding: 60px 36px 0 36px;
}
</style>
