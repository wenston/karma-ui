import LoadingComponent from "./Loading.vue"
//自定义指令
import vLoading from "karma-ui/directives/loading/"

LoadingComponent.install = (Vue, opts) => {
  const LoadingConstructor = Vue.extend(LoadingComponent)
  const instance = new LoadingConstructor().$mount()
  document.body.appendChild(instance.$el)
  Vue.loading = Vue.prototype.$loading = (settings = {}) => {
    instance.setOptions({...opts,...settings})
    //需要显式调用show方法才能显示出来
    return instance
  }
  Vue.directive("loading", vLoading)
}

export default LoadingComponent
