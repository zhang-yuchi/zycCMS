import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from 'views/login.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/login",
    name:"login",
    component:login
  },
  {
    path:"/config",
    name:"config",
    component:()=>import('../views/config')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  //路由守卫鉴权
  const reg = /\/login/
  if(!reg.test(to.path)){//判断是否需要登录
      if (localStorage['token']) {
          next();
      }else{
          next({
              path:"/login",
              query:{
                  // redirect:to.fullPath
              }
          });
      }

  }else{
      next()
  }
});
export default router
