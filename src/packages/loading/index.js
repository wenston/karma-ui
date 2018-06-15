import Vue from 'vue'
import LoadingComponent from './Loading.vue'
//自定义指令
import vLoading from 'karma-ui/directives/loading/'
//对象合并
import {
  merge
} from 'karma-ui/util/object.js'

const LoadingConstructor = Vue.extend(LoadingComponent)

LoadingComponent.install = (Vue, opts) => {
  const instance = new LoadingConstructor().$mount()
  document.body.appendChild(instance.$el)
  Vue.loading = Vue.prototype.$loading = (settings = {}) => {
    let opts = {
      content: '努力加载中. . .',
      isFullScreen: false,
    };
    opts = merge({}, opts, settings)
    instance.setContent(opts.content)
      .setSize(opts.isFullScreen)
    //需要显式调用show方法才能显示出来

    return instance
  }
  Vue.directive('loading', vLoading)
}

export default LoadingComponent