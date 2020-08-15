import Vue from 'vue'
import toast from './index.vue'
function create(component, props) {
  const vm = new Vue({
    render(createElement) {
      return createElement(component, {
        props
      })
    }
  }).$mount()
  document.body.appendChild(vm.$el)
  const comp = vm.$children[0]
  comp.remove = function(){
    document.body.removeChild(vm.$el)
  }
  return comp
}
class Toast {
  static install(_Vue){
    _Vue.mixin({
      beforeCreate(){
        // console.log(this);
        this.$toast = function(props){
          let comp = create(toast,props)
          comp.show()
          return comp
        }
      }
    })
  }
}
export default Toast