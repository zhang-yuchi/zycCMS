<template>
  <div class="home">
    <router-view />
    <tabbar></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import tabbar from 'components/tabbar'
export default {
  name: 'Home',
  components: {
    tabbar
  },
  mounted(){
    
  }
}
</script>
