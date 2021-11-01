/**
* @name: 
* @description: 点击外面可以关闭弹窗
* @author: 
* @create: 2020/07/28 14:58:17
* @update: 2020/07/28 14:58:17
*/
import clickoutside from './clickoutside.js'
export default {
  install(Vue, opts) {
    Vue.directive('clickoutside', clickoutside)
  }
}