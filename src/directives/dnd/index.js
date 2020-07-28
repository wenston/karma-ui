/**
* @name: 
* @description: 拖拽
* @author: 
* @create: 2020/07/28 15:01:55
* @update: 2020/07/28 15:01:55
*/
import bind from './bind.js'
export default {
  install(Vue, opts) {
    Vue.directive('dnd', bind)
  }
}