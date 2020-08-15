import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import ElementUI from 'element-ui'
import Toast from './components/toast/index'
import 'normalize.css/normalize.css'
import './public/css/theme/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
